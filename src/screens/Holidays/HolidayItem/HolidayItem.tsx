import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { parseISO, format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import locale from 'date-fns/locale/ru';
import { Holiday } from '../../../lib/react-fetching-hooks/types';
import { ScreenName } from '../../types';

interface Props {
    holiday: Holiday;
}

const HolidayItem: React.FC<Props> = ({ holiday }) => {
    const date = parseISO(holiday.date.iso);
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() =>
                navigation.navigate({
                    name: ScreenName.HolidayInfo,
                    params: { holiday },
                })
            }
        >
            <Text style={styles.date}>{format(date, 'dd MMMM', { locale })}</Text>
            <Text style={styles.name}>{holiday.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: 'white', margin: 5, padding: 5, borderRadius: 6 },
    date: { fontSize: 20 },
    name: { fontSize: 16, color: 'gray' },
});

export { HolidayItem };
