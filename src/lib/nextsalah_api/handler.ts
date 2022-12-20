import type { FETCH_PRAYERTIMES } from './interfaces';
/**
 * The NextSalahAPI class is a class that handles all the API calls to the NextSalah API
 * @param LocationsType - The return type of locations
 **/
class NextSalahAPI<LocationsType>{
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
    async getAllLocations(): Promise<LocationsType | Error> {
        return await this.sendHttpRequest(this.urlObject.toString() + "/locations", 'GET', null);
    }

    /**
     * > Saves the prayertime data to the database.
     * @param data - Location data to be sent to the API
     * @returns The response from the API call <FetchPrayerTimes | Error>
     */
    async saveLocation( data: Record<string,string> ) : Promise<FETCH_PRAYERTIMES | Error>  {
        const response = await this.getLocation( data );
        if (response instanceof Error) return response;
        
        const saveToDatabase = await this.sendHttpRequest("/api/prayertimes", 'POST', JSON.stringify(response));
        if (saveToDatabase instanceof Error) return saveToDatabase;

        return response;
    }

    /**
     * Get a single location's prayertimes from the API
     * @param data - Location data to be sent to the API
     * @returns A promise that resolves to a FETCH_PRAYERTIMES object or an Error object.
     */
    async getLocation( data: Record<string,string> ) : Promise<FETCH_PRAYERTIMES | Error>  {
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
            return new Error(`HTTP request failed with status code ${response.status}`);
        }
        return await response.json();
    }

}


export default NextSalahAPI;