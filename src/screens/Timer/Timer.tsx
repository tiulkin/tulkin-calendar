import { useIsFocused } from '@react-navigation/native';
import { format, formatDuration, Interval, intervalToDuration, parseISO } from 'date-fns';
import locale from 'date-fns/locale/ru';
import { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Animated, Easing, Route, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useHolidays } from '../../lib/react-hooks/useHolidays';
import { ScreenName } from '../types';

const Timer: React.FC<Route> = ({ navigation }) => {
    const animatedValue = useRef(new Animated.Value(0));
    const transform = useRef(
        animatedValue.current.interpolate({
            inputRange: [0, 1, 2, 3, 4, 5],
            outputRange: ['0deg', '0deg', '0deg', '0deg', '0deg', '180deg'],
        }),
    );
    const [newTime, setNewTime] = useState<Date>(new Date());
    const isFocused = useIsFocused();
    const { data, loading } = useHolidays(isFocused);
    const holidays = data || [];
    const nextHoliday = holidays.reduceRight<{ date: { iso: string }; name?: string }>(
        (closest, holiday) => {
            try {
                const date = parseISO(holiday.date.iso);

                return date < parseISO(closest.date.iso) ? closest : holiday;
            } catch {
                return closest;
            }
        },
        { date: { iso: new Date().toISOString() } },
    );
    useEffect(() => {
        let needRestart = true;
        const animate = () => {
            if (needRestart) {
                animatedValue.current.setValue(0);
                Animated.timing(animatedValue.current, {
                    toValue: 6,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }).start(() => {
                    animate();
                    setNewTime(new Date());
                });
            }
        };
        animate();
        return () => {
            needRestart = false;
        };
    }, []);
    const interval: Interval = {
        start: parseISO(nextHoliday.date.iso),
        end: newTime,
    };

    const Skeleton = (
        <View style={styles.next}>
            <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item flexDirection="row" alignItems="flex-start" margin={6}>
                    <SkeletonPlaceholder.Item flex={1}>
                        <SkeletonPlaceholder.Item alignSelf="stretch" height={16} borderRadius={2} />
                        <SkeletonPlaceholder.Item
                            alignSelf="center"
                            marginTop={8}
                            width={100}
                            height={10}
                            borderRadius={2}
                        />
                        <SkeletonPlaceholder.Item
                            width={150}
                            alignSelf="center"
                            marginTop={8}
                            height={16}
                            borderRadius={2}
                        />
                        <SkeletonPlaceholder.Item
                            alignSelf="center"
                            marginTop={8}
                            width={100}
                            height={10}
                            borderRadius={2}
                        />
                        <SkeletonPlaceholder.Item alignSelf="stretch" marginTop={8} height={20} borderRadius={2} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </View>
    );
    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                Skeleton
            ) : data?.length ? (
                <TouchableOpacity
                    style={styles.next}
                    onPress={() =>
                        navigation.navigate({
                            name: ScreenName.HolidayInfo,
                            params: { holiday: nextHoliday },
                        })
                    }
                >
                    <Text style={styles.title}>{`Ближайший праздник (${nextHoliday.name})`}</Text>
                    <Text>Наступит:</Text>
                    <Text style={styles.title}>
                        {format(parseISO(nextHoliday.date.iso), 'dd MMMM', {
                            locale,
                        })}
                    </Text>
                    <Text>Через:</Text>
                    <Animated.View style={{ transform: [{ rotate: transform.current }] }}>
                        <Text style={styles.distance}>{formatDuration(intervalToDuration(interval), { locale })}</Text>
                    </Animated.View>
                </TouchableOpacity>
            ) : (
                <View />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    next: {
        backgroundColor: 'white',
        margin: 20,
        padding: 5,
        alignItems: 'center',
        borderRadius: 6,
    },
    title: {
        fontSize: 20,
    },
    distance: {
        width: 230,
        fontSize: 20,
        textAlign: 'center',
    },
});

export { Timer };
