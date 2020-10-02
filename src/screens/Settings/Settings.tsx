import * as React from 'react';
import { Button, Route, SafeAreaView, StyleSheet, View } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { ClientContext } from 'react-fetching-hooks';
import { config } from '../../../config';
import {
    OfflineStorageActionType,
    useOfflineStorageDispatch,
    useOfflineStorageState,
    OfflineStorageStateKey,
} from '../../components/OfflineStorageProvider';
import { HolidayType } from '../../lib/react-fetching-hooks/types/Holiday';

const items = [
    {
        id: HolidayType.National,
    },
    {
        id: HolidayType.Muslim,
    },
    {
        id: HolidayType.Observance,
    },
    {
        id: HolidayType.Orthodox,
    },
    {
        id: HolidayType.Season,
    },
];
const Settings: React.FC<Route> = () => {
    const client = React.useContext(ClientContext);
    const state = useOfflineStorageState();
    const offlineStateDispatcher = useOfflineStorageDispatch();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.button}>
                <Button
                    onPress={() => {
                        client?.purge();
                        offlineStateDispatcher({
                            type: OfflineStorageActionType.SET_CURRENT_HOLIDAY_TYPES,
                            value: config.defaultHolidayTypes,
                        });
                        alert('Кэш очищен. Для получения данных будет сделан новый запрос на сервер');
                    }}
                    title="Очистить кэш"
                />
            </View>
            <MultiSelect
                items={items}
                uniqueKey="id"
                selectedItems={state[OfflineStorageStateKey.HOLIDAY_TYPE]}
                onSelectedItemsChange={(selectedItems: HolidayType[]) => {
                    client?.purge();
                    offlineStateDispatcher({
                        type: OfflineStorageActionType.SET_CURRENT_HOLIDAY_TYPES,
                        value: selectedItems,
                    });
                }}
                selectText=" Типы праздников"
                searchInputPlaceholderText="Выбор типа праздника"
                displayKey="id"
                submitButtonColor="green"
                submitButtonText="Готово"
                styleSelectorContainer={{ paddingRight: 20, paddingLeft: 20 }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    message: {
        backgroundColor: 'white',
        padding: 5,
        alignItems: 'center',
        borderRadius: 6,
    },
    text: { textAlign: 'center', marginTop: 10 },
    button: { marginBottom: 20 },
});

export { Settings };
