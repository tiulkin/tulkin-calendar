import React from 'react';
import { AppMap, NavigationType } from './types';
import { IconFireworks, IconSettings, IconTimer } from './icons';
import { ScreenName } from '../../screens/types';

// Вместо хардкода экранов мы строим карты приложения, что дает возможность
// быстрой реорганизации и a/b тетсирования

export const APP_MAP: AppMap = {
    v1: {
        id: 'root',
        navigationType: NavigationType.STACK,
        children: [
            {
                id: 'tabs',
                navigationType: NavigationType.TABS,
                screenOptions: {
                    title: '',
                    headerTransparent: true,
                },
                navigationOptions: {
                    tabBarOptions: {
                        showLabel: true,
                    },
                },
                children: [
                    {
                        id: ScreenName.Timer,
                        componentName: ScreenName.Timer,
                        screenOptions: {
                            tabBarIcon: IconTimer,
                            tabBarLabel: 'Скоро',
                        },
                    },
                    {
                        id: ScreenName.Holidays,
                        componentName: ScreenName.Holidays,
                        screenOptions: {
                            tabBarIcon: IconFireworks,
                            tabBarLabel: 'Праздники',
                        },
                    },
                    {
                        id: ScreenName.Calendar,
                        componentName: ScreenName.Calendar,
                        screenOptions: {
                            tabBarIcon: IconTimer,
                            tabBarLabel: 'Календарь',
                        },
                    },
                    {
                        id: ScreenName.Settings,
                        componentName: ScreenName.Settings,
                        screenOptions: {
                            tabBarIcon: IconSettings,
                            tabBarLabel: 'Настройки',
                        },
                    },
                ],
            },
            {
                id: ScreenName.HolidayInfo,
                componentName: ScreenName.HolidayInfo,
                screenOptions: {
                    title: 'Информация',
                    headerTitleStyle: {
                        textAlign: 'center',
                    },
                    headerTitleContainerStyle: {
                        left: 50,
                        right: 50,
                    },
                },
            },
            {
                id: ScreenName.Error,
                componentName: ScreenName.Error,
                screenOptions: {
                    title: 'Ошибка',
                    headerTitleStyle: {
                        textAlign: 'center',
                    },
                    headerTitleContainerStyle: {
                        left: 50,
                        right: 50,
                    },
                },
            },
        ],
    },
};
