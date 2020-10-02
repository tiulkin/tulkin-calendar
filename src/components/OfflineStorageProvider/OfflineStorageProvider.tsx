import React from 'react';
import { View } from 'react-native';
import { config } from '../../../config';

import { useInitialAsyncStorageData } from '../../lib/react-hooks/useInitialAsyncStorageData';
import { Action, OfflineStorageActionType } from './Action.d';
import { rootReducer } from './rootReducer';
import { OfflineStorageStateKey, State } from './State';
import { APP_OFFLINE_DATA_KEY } from '../../App/constants';

interface Props {
    children: React.ReactNode;
}
const INITIAL_STATE: State = {
    [OfflineStorageStateKey.CURRENT_COUNTRY]: config.defaultCountry,
    [OfflineStorageStateKey.CURRENT_LANGUAGE]: config.defaultLanguage,
    [OfflineStorageStateKey.HOLIDAY_TYPE]: config.defaultHolidayTypes,
};

const INITIAL_STATE_COPY: State = { ...INITIAL_STATE };

const StateContext = React.createContext<State>(INITIAL_STATE);
const DispatchContext = React.createContext<React.Dispatch<Action>>(() => {});

const OfflineStorageProvider = ({ children }: Props) => {
    const [state, dispatch] = React.useReducer(rootReducer, INITIAL_STATE);
    const offlineAppData = useInitialAsyncStorageData(APP_OFFLINE_DATA_KEY, INITIAL_STATE_COPY);

    React.useEffect(() => {
        if (offlineAppData) {
            if (offlineAppData[OfflineStorageStateKey.CURRENT_LANGUAGE]) {
                dispatch({
                    type: OfflineStorageActionType.SET_CURRENT_LANGUAGE,
                    value: offlineAppData[OfflineStorageStateKey.CURRENT_LANGUAGE],
                });
            }
            if (offlineAppData[OfflineStorageStateKey.CURRENT_COUNTRY]) {
                dispatch({
                    type: OfflineStorageActionType.SET_CURRENT_COUNTRY,
                    value: offlineAppData[OfflineStorageStateKey.CURRENT_COUNTRY],
                });
            }
        }
    }, [offlineAppData]);

    // Ждём загрузки данных из хранилища, и только потом рендерим приложение
    if (offlineAppData === INITIAL_STATE) {
        return <View />;
    }

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
        </StateContext.Provider>
    );
};

const useOfflineStorageState = () => React.useContext(StateContext);
const useOfflineStorageDispatch = () => React.useContext(DispatchContext);

export { OfflineStorageProvider, useOfflineStorageState, useOfflineStorageDispatch };
