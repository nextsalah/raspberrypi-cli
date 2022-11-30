
export type SingleOptionLocation = string[];

export interface ISingleOptionProps extends IOptionProps {
    select_label: string;
    selected_key: string;
    option_by_index: boolean;
}

export interface IOptionProps {
    source_name: string;
    source_logo_src: string;
    source_link: string;
    end_point: string;
}

export interface IFormHandlerProps  {
    fetchFinished: boolean;
    error: string;
    alert_message: string;
    handleData: () => Promise<boolean>;
}

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