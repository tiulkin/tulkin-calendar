import { PartialRequestData, ResponseError } from 'react-fetching-hooks';
import { SharedData, Holiday } from '../../types';
import { config } from '../../../../../config';

export const HolidaysQuery: PartialRequestData<
    SharedData,
    Holiday[],
    ResponseError<Error>,
    { apiVersion: number },
    // eslint-disable-next-line camelcase
    { api_key: string; country: string; language: string; year: number }
> = {
    path: 'v:apiVersion/holidays',
    pathParams: { apiVersion: config.apiVersion },
    queryParams: {
        api_key: config.apiKey,
        country: config.defaultCountry,
        language: config.defaultLanguage,
        year: new Date().getFullYear(),
    },
    toCache(sharedData, responseData: { response: { holidays: Holiday[] } }) {
        return {
            ...sharedData,
            holidays: responseData?.response?.holidays,
        };
    },
    fromCache(cache) {
        try {
            return cache.holidays;
        } catch {
            return [];
        }
    },
};
