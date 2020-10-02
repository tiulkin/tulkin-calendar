export { Holiday } from './Holiday';

export interface KnownHeaders {
    'Last-Modified': string | null;
}

export interface ResponseWithHeaders<T> {
    body: T;
    headers: KnownHeaders;
}

export interface SharedData {
    holidays: Holiday[];
}
