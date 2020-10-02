import { RequestData } from 'react-fetching-hooks';

export function getRequestInit(request: RequestData): RequestInit {
    if (shouldStringifyBodyAsJson(request)) {
        const { body, headers, ...restRequest } = request;

        const newHeaders = headers || {};
        newHeaders['Content-Type'] = 'application/json';

        return { ...restRequest, body: JSON.stringify(body), headers: newHeaders };
    }

    return request;
}

function shouldStringifyBodyAsJson(request: RequestData) {
    return request.body !== undefined;
}
