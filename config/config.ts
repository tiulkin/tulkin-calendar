/**
 * Тут может быть логика получения конфига из process.env или другого места,
 * На текущий момент это не требуется
 */

import { HolidayType } from '../src/lib/react-fetching-hooks/types/Holiday';

export enum LogLevel {
    DEBUG = 'debug',
    TRACE = 'trace',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
}

interface Config {
    logLevel: LogLevel;
    apiUrl: string;
    apiVersion: number;
    apiKey: string;
    defaultLanguage: string;
    defaultCountry: string;
    defaultHolidayTypes: HolidayType[];
}

export const config: Config = {
    logLevel: LogLevel.DEBUG,
    apiUrl: 'https://calendarific.com/api/',
    apiVersion: 2,
    apiKey: '8f9992d16f8878088b8ec78b3a50eb687e536075',
    defaultLanguage: 'ru',
    defaultCountry: 'RU',
    defaultHolidayTypes: [HolidayType.National],
};
