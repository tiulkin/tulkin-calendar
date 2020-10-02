import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View } from 'react-native';

import { Provider } from 'react-fetching-hooks';
import { useInitialAsyncStorageData } from '../lib/react-hooks/useInitialAsyncStorageData';
import { ScreenName } from '../screens';
import { OfflineCache } from '../lib/OfflineCache';
import { getReactFetchingHooksClient } from '../lib/react-fetching-hooks/getReactFetchingHooksClient';
import { NavigationFactory } from './NavigationFactory';

import { APP_MAP } from './appMap';
import { APP_MAP_DEFAULT_VERSION } from './constants';

export function useAppComponent() {
    const [AppComponent, setAppComponent] = React.useState<React.ComponentType | null>(null);
    const offlineCache = useInitialAsyncStorageData(OfflineCache.STORAGE_KEY_NAME, OfflineCache.STATE_DEFAULT);

    useEffect(() => {
        if (offlineCache) {
            setAppComponent((prevAppComponent: React.ComponentType | null) =>
                !prevAppComponent ? NavigationFactory(APP_MAP[APP_MAP_DEFAULT_VERSION]) : prevAppComponent,
            );
        }
    }, [offlineCache]);

    return () =>
        AppComponent ? (
            <Provider
                client={getReactFetchingHooksClient({
                    initialSerializableState: offlineCache,
                })}
            >
                <NavigationContainer>
                    <AppComponent />
                </NavigationContainer>
            </Provider>
        ) : (
            <View />
        );
}
