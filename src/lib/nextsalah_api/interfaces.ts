
export type SingleOptionLocation = string[];

interface VaktijaEUData {
    "name": string,
    "slug": string,
    "country": {    
        "id": number,
        "title": string,
        "short_code": string
    }
}

export interface VaktijaEULocations {
    "data": VaktijaEUData[]
}


export interface ISingleOptionProps extends ISourceInfo {
    select_label: string;
    selected_key: string;
    option_by_index: boolean;
}

export interface ISourceInfo {
    source_name: string;
    source_logo_src: string;
    source_link: string;
    end_point: string;
}

export interface IFormHandlerProps  {
    fetchFinished: boolean;
    error: string;
    alert_message: string;
    handleData: <T>( locations: T ) => any;
}

export interface IFormData  extends ISourceInfo, IFormHandlerProps {}

export interface PRAYERTIMES {
    date: string;
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
}


export interface FETCH_PRAYERTIMES {
    success: boolean;
    prayertimes: PRAYERTIMES[];
}