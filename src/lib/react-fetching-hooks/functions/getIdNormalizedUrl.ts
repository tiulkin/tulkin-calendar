import { RequestData } from 'react-fetching-hooks';
import { config } from '../../../../config';

export function getIdNormalizedUrl(request: RequestData): string {
    const url = request.getUrl(request);

    return url.startsWith(config.apiUrl) ? url.replace(config.apiUrl, '') : url;
}
