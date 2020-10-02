import { AsyncStorage } from 'react-native';
import { SerializableCacheState } from 'react-fetching-hooks/dist/core/cache/Cache';
import { Cache } from 'react-fetching-hooks';
import { SharedData } from '../react-fetching-hooks/types';

interface CacheOptions {
    serializeError(error: Error): any;
    deserializeError(errorObject: any): Error;
    initialSerializableState?: SerializableCacheState;
    enableDevTools?: boolean;
    enableDataDuplication?: boolean;
}

export class OfflineCache extends Cache {
    static readonly STATE_DEFAULT: SerializableCacheState<SharedData> = {
        requestStates: {},
        sharedData: {
            holidays: [],
        },
    };

    static readonly STORAGE_KEY_NAME = 'react-fetching-hooks-cache';

    constructor(cacheOptions: CacheOptions) {
        super(cacheOptions);
        this.subscribe(this.saveToCache);
    }

    saveToCache = () => {
        try {
            const cacheState = this.getSerializableState();

            const serializedCacheState: string = JSON.stringify(cacheState);
            AsyncStorage.setItem(OfflineCache.STORAGE_KEY_NAME, serializedCacheState);
        } catch (error) {
            // ToDo: log error
        }
    };
}
