import { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';

export function useInitialAsyncStorageData<T>(key: string, defaultValue: T): T | undefined {
    const [currentStorageValue, setCurrentStorageValue] = useState<T | undefined>(undefined);

    useEffect(() => {
        let value = defaultValue;
        AsyncStorage.getItem(key)
            .then((stringValue) => {
                if (stringValue) {
                    try {
                        value = JSON.parse(stringValue);
                    } catch (error) {
                        // ToDo: log error
                    }
                }
            })
            .catch(() => {
                // ToDo: log error
            })
            .finally(() => {
                setCurrentStorageValue(value);
            });
    }, [defaultValue, key]);

    return currentStorageValue;
}
