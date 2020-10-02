import { useNavigation } from '@react-navigation/native';
import { parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNetworkInfoState } from '../../components/NetworkInfoProvider';
import { OfflineStorageStateKey, useOfflineStorageState } from '../../components/OfflineStorageProvider';
import { ScreenName } from '../../screens/types';
import { HolidaysQuery } from '../react-fetching-hooks/requests/queries/Holidays';
import { Holiday } from '../react-fetching-hooks/types/Holiday';
import { useQuery } from '../react-fetching-hooks/useQuery';
import { usePrevious } from './usePrevious';

export function useHolidays(isFocused: boolean) {
    const offlineStorageState = useOfflineStorageState();
    const country = offlineStorageState[OfflineStorageStateKey.CURRENT_COUNTRY];
    const language = offlineStorageState[OfflineStorageStateKey.CURRENT_LANGUAGE];
    const isInternetReachable = useNetworkInfoState();
    const navigation = useNavigation();
    const prevIsFocused = usePrevious(isFocused);
    const [filteredData, setFilteredData] = useState<Holiday[]>();
    const { data, loading, error, refetch } = useQuery(HolidaysQuery, {
        requestOverride: {
            queryParams: { country, language },
        },
    });

    useEffect(() => {
        if (!prevIsFocused && isFocused && !loading && !data?.length) {
            refetch();
        }
    }, [data, isFocused, loading, prevIsFocused, refetch]);

    useEffect(() => {
        if (!data?.length && !loading && (error || !isInternetReachable)) {
            navigation.navigate(ScreenName.Error);
        }
    }, [data, loading, error, isInternetReachable, navigation]);

    useEffect(() => {
        setFilteredData(
            data
                ?.filter(
                    (holiday) =>
                        holiday.type.filter((holidayType) =>
                            offlineStorageState[OfflineStorageStateKey.HOLIDAY_TYPE].includes(holidayType),
                        ).length,
                )
                .sort((a, b) => {
                    try {
                        const date1 = parseISO(a.date.iso);
                        const date2 = parseISO(b.date.iso);
                        return date1 < date2 ? -1 : 1;
                    } catch {
                        return 0;
                    }
                }),
        );
    }, [data, offlineStorageState]);

    return { data: filteredData, loading };
}
