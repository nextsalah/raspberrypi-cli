abstract class PrayerTimesHandler<T>  implements IPrayerTimesHandler<T>{
    url: string = import.meta.env.VITE_API_URL as string || 'https://nextsalah.com/api/v1/prayertimes';
    end_point: string;

    constructor( end_point: string ) {
        this.end_point = end_point;
    }

    async locations(): Promise<T> {
        let response = await fetch( this.url + this.end_point + '/locations', 
            {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*' 
                }
            }
        );
        return await response.json();
    }
}

export interface IPrayerTimesHandler<T> {
    url: string;
    end_point: string;
    locations(): Promise<T>;
}

export default PrayerTimesHandler;