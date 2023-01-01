import type { FETCH_PRAYERTIMES } from './interfaces';
/**
 * The NextSalahAPI class is a class that handles all the API calls to the NextSalah API
 * @param LocationsType - The return type of locations
 **/
class NextSalahAPI{
    url: string = import.meta.env.VITE_API_URL as string || 'https://nextsalah.com/api/v1/prayertimes/';
    endPoint: string;
    urlObject: URL;

    constructor( endPoint: string ) {
        if (endPoint[0] === '/') endPoint = endPoint.slice(1); // Remove the first slash if it exists
        this.endPoint = endPoint;
        this.urlObject = new URL(this.url + this.endPoint);
    }

    /**
     * Get all the possible locations from the source.
     * @returns A promise that resolves to either an array of locations or an error.
     */
    async getAllLocations(): Promise<any | Error> {
        return await this.sendHttpRequest(this.urlObject.toString() + "/locations", 'GET', null);
    }


    /**
     * Get a single location's prayertimes from the API
     * @param data - Location data to be sent to the API
     * @returns A promise that resolves to a FETCH_PRAYERTIMES object or an Error object.
     */
    async getLocation( data: Record<string,any> ) : Promise<FETCH_PRAYERTIMES | Error>  {
        let saveURL = this.urlObject
        saveURL.search = new URLSearchParams( data ).toString();
        return await this.sendHttpRequest(saveURL.toString(), 'GET', null);
    }
    
    /**
     * It sends an HTTP request to the specified URL, and returns the response as JSON
     * @param {string} url - The URL to send the request to.
     * @param {string} method - The HTTP method to use.
     * @param {any} [body] - The body of the request. This is optional.
     * @returns The response from the server.
     */
    async sendHttpRequest(url: string, method: string, body?: any): Promise<any | Error> {
        const response = await fetch(url, { method,headers: { 'Content-Type': 'application/json' },body });
        if (!response.ok) {  
            if (response.status === 404) {
                const data = await response.json();
                return new Error(data.detail);
            }
            else if ( response.status === 422 ) {

                // Return the error messages from the API
                const data = await response.json();
                const errorMessages = data.detail.map((error: any) => {
                    // uppercase the first letter of the error message
                    return error.msg.charAt(0).toUpperCase() + error.msg.slice(1);
                });
                return new Error(errorMessages.join(', '));

            }
            else  {                
                return new Error('HTTP Error: ' + response.status + ' ' + response.statusText);
            }
        }
        return await response.json();
    }

}


export default NextSalahAPI;