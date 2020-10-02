import { HolidayType } from '../../lib/react-fetching-hooks/types/Holiday';

export enum OfflineStorageStateKey {
    CURRENT_LANGUAGE = 'currentCountry',
    CURRENT_COUNTRY = 'currentLanguage',
    HOLIDAY_TYPE = 'holidayType',
}

export interface State {
    [OfflineStorageStateKey.CURRENT_LANGUAGE]: string;
    [OfflineStorageStateKey.CURRENT_COUNTRY]: string;
    [OfflineStorageStateKey.HOLIDAY_TYPE]: HolidayType[];
}
