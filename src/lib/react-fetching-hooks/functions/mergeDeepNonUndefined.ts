import { merge } from 'lodash-es';

export function mergeDeepNonUndefined<T, U>(requestData: T, partialRequestData: U): T & U {
    return merge({}, requestData, partialRequestData);
}
