import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { FlatList, Route, SafeAreaView, StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useHolidays } from '../../lib/react-hooks/useHolidays';
import { HolidayItem } from './HolidayItem';

const Holidays: React.FC<Route> = () => {
    const isFocused = useIsFocused();
    const { data, loading } = useHolidays(isFocused);

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                Array.from(Array(5), (item) => (
                    <View style={styles.skeleton} key={item}>
                        <SkeletonPlaceholder>
                            <SkeletonPlaceholder.Item padding={10}>
                                <SkeletonPlaceholder.Item width={120} height={22} borderRadius={2} />
                                <SkeletonPlaceholder.Item width={190} marginTop={8} height={18} borderRadius={2} />
                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder>
                    </View>
                ))
            ) : data?.length ? (
                <FlatList
                    style={styles.list}
                    keyExtractor={(item) => item.date.iso}
                    renderItem={({ item }) => <HolidayItem holiday={item} />}
                    data={data}
                />
            ) : (
                <View />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { height: '100%', paddingTop: 6, paddingBottom: 0 },
    skeleton: { margin: 6, backgroundColor: 'white' },
    list: {
        flex: 1,
        paddingRight: 6,
        paddingLeft: 6,
        width: '100%',
    },
});

export { Holidays };
