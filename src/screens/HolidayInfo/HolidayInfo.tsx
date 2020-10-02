import * as React from 'react';
import { StyleSheet, View, Text, Route, SafeAreaView } from 'react-native';
import { parseISO, format } from 'date-fns';
import WebView from 'react-native-webview';

const HolidayInfo: React.FC<Route> = ({ route }) => {
    const { holiday } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.date}>{format(parseISO(holiday.date.iso), 'dd.MM.yyyy')}</Text>
                <Text style={styles.name}>{holiday.name}</Text>
                <Text style={styles.description}>{holiday.description}</Text>
            </View>

            <WebView
                style={styles.web}
                source={{
                    uri: `https://yandex.ru/search/?text="${holiday.name}"+${format(
                        parseISO(holiday.date.iso),
                        'dd.MM.yyyy',
                    )}`,
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    info: { backgroundColor: 'white', padding: 12, borderRadius: 6 },
    web: { marginTop: 10 },
    date: { fontSize: 16 },
    name: { fontSize: 16, color: 'gray' },
    description: {
        width: '100%',
        fontSize: 14,
        color: 'green',
        fontStyle: 'italic',
    },
});

export { HolidayInfo };
