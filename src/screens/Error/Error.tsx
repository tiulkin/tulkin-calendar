import * as React from 'react';
import { Button, Route, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNetworkInfoState } from '../../components/NetworkInfoProvider';

const Error: React.FC<Route> = ({ navigation }) => {
    const isInternetReachable = useNetworkInfoState();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.message}>
                <Text style={styles.text}>Ошибка получения данных</Text>
                {isInternetReachable === false && <Text style={styles.text}>Отсутствует интернет-соединение</Text>}
                <View style={styles.button}>
                    <Button onPress={() => navigation.goBack()} title="Попробовать еще раз" />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    message: {
        backgroundColor: 'white',
        margin: 20,
        padding: 5,
        alignItems: 'center',
        borderRadius: 6,
    },
    text: { textAlign: 'center', marginTop: 10 },
    button: { margin: 20 },
});

export { Error };
