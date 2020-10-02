import { Client, GeneralRequestData, getUrlDefault } from 'react-fetching-hooks';
import { SerializableCacheState } from 'react-fetching-hooks/dist/core/cache/Cache';
import { deserializeError, serializeError } from 'serialize-error';
import { OfflineCache } from '../../OfflineCache';
import { getIdNormalizedUrl } from '../functions/getIdNormalizedUrl';
import { getRequestInit } from '../functions/getRequestInit';
import { processResponseBody } from '../functions/processResponseBody';
import { mergeDeepNonUndefined } from '../functions/mergeDeepNonUndefined';

import { config } from '../../../../config';

let client: Client | null = null;

interface Options {
    fetch?: typeof fetch;
    generalRequestData?: Partial<GeneralRequestData>;
    initialSerializableState?: SerializableCacheState;
}

function getReactFetchingHooksClient(opts?: Options): Client {
    if (client) {
        return client;
    }

    client = getNewClient(opts);

    return client;
}

function getNewClient({ fetch, generalRequestData, initialSerializableState }: Options = {}) {
    const offlineCache = new OfflineCache({
        serializeError,
        deserializeError,
        enableDevTools: true,
        initialSerializableState,
    });

    return new Client({
        fetch,
        cache: offlineCache,
        generalRequestData: {
            root: config.apiUrl,
            // Тут регулируется политика запросов. cache-first - данные всегда берутся из кэша
            //
            // Без механизма обновления мы вообще никошда не узнаем, что что-то изменилось
            //
            fetchPolicy: 'cache-first',
            // fetchPolicy: 'cache-and-network',
            disableSsr: false,
            disableInitialRenderDataRefetchOptimization: true,
            getId: getIdNormalizedUrl,
            getUrl: getUrlDefault,
            processResponse: processResponseBody,
            merge: mergeDeepNonUndefined,
            getRequestInit,
            ...generalRequestData,
        },
    });
}

export { getReactFetchingHooksClient };
