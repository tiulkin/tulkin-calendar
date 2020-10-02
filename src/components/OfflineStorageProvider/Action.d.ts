import { HolidayType } from '../../lib/react-fetching-hooks/types/Holiday';

export type Action = SetCurrentCountry | SetCurrentLanguage | SetCurrentHolidayTypes;

export enum OfflineStorageActionType {
    SET_CURRENT_COUNTRY = 'SET_CURRENT_COUNTRY',
    SET_CURRENT_LANGUAGE = 'SET_CURRENT_LANGUAGE',
    SET_CURRENT_HOLIDAY_TYPES = 'SET_CURRENT_HOLIDAY_TYPES',
}

export interface SetCurrentCountry {
    type: OfflineStorageActionType.SET_CURRENT_COUNTRY;
    value: string;
}

export interface SetCurrentLanguage {
    type: OfflineStorageActionType.SET_CURRENT_LANGUAGE;
    value: string;
}

export interface SetCurrentHolidayTypes {
    type: OfflineStorageActionType.SET_CURRENT_HOLIDAY_TYPES;
    value: HolidayType[];
}
