import { ResponseError } from 'react-fetching-hooks';
import { KnownHeaders } from '../types';

export async function ensureSuccessfulResponse(response: Response): Promise<void> {
    if (!response.ok) {
        throw new ResponseError(await getResponseBody(response), 'Response was not successful');
    }
}

export async function getResponseBody(response: Response): Promise<any> {
    const bodyText = await response.text();

    return bodyText !== '' ? JSON.parse(bodyText) : null;
}

export function getKnownResponseHeaders(response: Response): KnownHeaders {
    return {
        'Last-Modified': response.headers.get('Last-Modified'),
    };
}
