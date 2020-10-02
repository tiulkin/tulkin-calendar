import { AsyncStorage } from 'react-native';
import { Action, OfflineStorageActionType } from './Action.d';
import { OfflineStorageStateKey, State } from './State';
import { APP_OFFLINE_DATA_KEY } from '../../App/constants';

export function rootReducer(state: State, action: Action): State {
    switch (action.type) {
        case OfflineStorageActionType.SET_CURRENT_LANGUAGE: {
            if (action.value) {
                AsyncStorage.mergeItem(
                    APP_OFFLINE_DATA_KEY,
                    JSON.stringify({
                        [OfflineStorageStateKey.CURRENT_LANGUAGE]: action.value,
                    }),
                );
            }

            return {
                ...state,
                [OfflineStorageStateKey.CURRENT_LANGUAGE]: action.value,
            };
        }
        case OfflineStorageActionType.SET_CURRENT_COUNTRY: {
            if (action.value) {
                AsyncStorage.mergeItem(
                    APP_OFFLINE_DATA_KEY,
                    JSON.stringify({
                        [OfflineStorageStateKey.CURRENT_COUNTRY]: action.value,
                    }),
                );
            }

            return {
                ...state,
                [OfflineStorageStateKey.CURRENT_COUNTRY]: action.value,
            };
        }
        case OfflineStorageActionType.SET_CURRENT_HOLIDAY_TYPES: {
            if (action.value) {
                AsyncStorage.mergeItem(
                    APP_OFFLINE_DATA_KEY,
                    JSON.stringify({
                        [OfflineStorageStateKey.HOLIDAY_TYPE]: action.value,
                    }),
                );
            }

            return {
                ...state,
                [OfflineStorageStateKey.HOLIDAY_TYPE]: action.value,
            };
        }

        default:
            return state;
    }
}
