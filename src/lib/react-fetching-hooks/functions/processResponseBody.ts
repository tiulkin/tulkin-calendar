import { ensureSuccessfulResponse, getResponseBody } from './process-response-helpers';

export async function processResponseBody(response: Response): Promise<any> {
    await ensureSuccessfulResponse(response);
    return getResponseBody(response);
}
