import * as React from 'react';
import { Route, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { isWeekend, parseISO, fromUnixTime } from 'date-fns';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import { Holiday } from '../../lib/react-fetching-hooks/types';
import { useHolidays } from '../../lib/react-hooks/useHolidays';
import { ScreenName } from '../types';

const Calendar: React.FC<Route> = ({ navigation }) => {
    const isFocused = useIsFocused();
    const { data } = useHolidays(isFocused);
    // eslint-disable-next-line no-empty-pattern
    const holidays = (data || []).reduce<Record<string, Holiday>>((result, item) => {
        // eslint-disable-next-line no-param-reassign
        result[parseISO(item.date.iso).toDateString()] = item;
        return result;
    }, {});

    return (
        <SafeAreaView style={styles.container}>
            {data?.length ? (
                <CalendarList
                    firstDay={1}
                    displayLoadingIndicator
                    pastScrollRange={new Date().getMonth()}
                    futureScrollRange={11 - new Date().getMonth()}
                    dayComponent={({ date: value }) => {
                        const date = fromUnixTime(value.timestamp / 1000);
                        const isHoliday = Object.keys(holidays).includes(date.toDateString());
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    if (isHoliday) {
                                        navigation.navigate({
                                            name: ScreenName.HolidayInfo,
                                            params: { holiday: holidays[date.toDateString()] },
                                        });
                                    }
                                }}
                            >
                                <View>
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            color: isHoliday ? 'green' : isWeekend(date) ? 'red' : 'gray',
                                        }}
                                    >
                                        {value.day}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            ) : (
                <View />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
});

LocaleConfig.locales.ru = {
    monthNames: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль.',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ],
    monthNamesShort: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль.',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ],
    dayNames: ['Воскресене', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayNamesShort: ['Вс.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'],
};

LocaleConfig.defaultLocale = 'ru';

export { Calendar };
