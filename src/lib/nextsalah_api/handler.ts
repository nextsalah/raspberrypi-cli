import type { FETCH_PRAYERTIMES } from './interfaces';
/**
 * The NextSalahAPI class is a class that handles all the API calls to the NextSalah API
 * @param LocationsType - The return type of locations
 **/
class NextSalahAPI<LocationsType>{
    url: string = import.meta.env.VITE_API_URL as string || 'https://nextsalah.com/api/v1/prayertimes';
    end_point: string;
    url_object: URL;

    constructor( end_point: string ) {
        this.end_point = end_point;
        this.url_object = new URL(this.url + this.end_point);
    }

    async get_all_locations(): Promise<LocationsType | Error> {
        const response = await fetch( this.url_object.href + '/locations' );
        if (response.status === 200) {
            return await response.json();
        }

        return new Error('Fetching locations failed');
    }

    async save_location( data: Record<string,string> ) : Promise<FETCH_PRAYERTIMES | Error>  {
        let save_url = this.url_object
        save_url.search = new URLSearchParams( data ).toString();
        const response = await fetch(save_url);
        
        const response2 = await fetch("/api/prayertimes", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.status === 200) {
            return await response.json();
        }
        return new Error('Saving data failed');
    }

    async get_location( data: Record<string,string> ) : Promise<FETCH_PRAYERTIMES | Error>  {
        let save_url = this.url_object
        save_url.search = new URLSearchParams( data ).toString();
        const response = await fetch(save_url);
        if (response.status === 200) {
            return await response.json();
        }

        return new Error('Saving data failed');
    }

}


export default NextSalahAPI;