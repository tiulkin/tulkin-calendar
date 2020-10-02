export interface Country {
    id: string;
    name: string;
}

export enum HolidayType {
    Observance = 'Observance',
    Season = 'Season',
    Muslim = 'Muslim',
    Orthodox = 'Orthodox',
    National = 'National holiday',
}

export interface Holiday {
    name: string;
    description: string;
    country: Country;
    date: {
        iso: string;
        datetime: {
            year: number;
            month: number;
            day: number;
        };
    };
    type: HolidayType[];
    locations: string | string[];
    states: string | string[];
}
