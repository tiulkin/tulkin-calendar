import * as React from 'react';

import { BottomTabBarOptions, BottomTabBarProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import {
    StackCardInterpolatedStyle,
    StackCardInterpolationProps,
    StackCardStyleInterpolator,
    StackHeaderInterpolatedStyle,
    StackHeaderInterpolationProps,
    StackHeaderLeftButtonProps,
    StackHeaderProps,
    StackHeaderStyleInterpolator,
    StackHeaderTitleProps,
} from '@react-navigation/stack';

// There is no normal export for this. https://github.com/react-navigation/react-navigation/issues/7882
import { StackNavigationConfig } from '@react-navigation/stack/lib/typescript/src/types';

import { ScreenName } from '../../screens/types';

export enum NavigationType {
    STACK = 'stack',
    TABS = 'bottomTabs',
    WEBVIEW = 'webview',
}

export interface WebviewNavigationOptions {
    Icon: React.FC;
    title: string;
    description: string;
    uri: string;
    name: string;
}

export interface NavigationHeader {
    backTitle?: string;
    title?: React.FC | string;
    left?: React.FC;
    right?: React.FC;
}

interface TabNavigationOptions {
    navigationOptions?: BottomTabNavigationOptions;
    tabBarProps?: BottomTabBarProps;
    tabBarOptions?: BottomTabBarOptions;
}

interface StackNavigationOptions {
    navigationOptions?: StackNavigationOptions;
    headerProps?: StackHeaderProps;
    headerLeftButtonProps?: StackHeaderLeftButtonProps;
    headerTitleProps?: StackHeaderTitleProps;
    headerInterpolatedStyle?: StackHeaderInterpolatedStyle;
    headerInterpolationProps?: StackHeaderInterpolationProps;
    headerStyleInterpolator?: StackHeaderStyleInterpolator;
    cardInterpolatedStyle?: StackCardInterpolatedStyle;
    cardInterpolationProps?: StackCardInterpolationProps;
    cardStyleInterpolator?: StackCardStyleInterpolator;
}

export interface AppScreen {
    id: string;
    navigationType?: NavigationType;
    navigationOptions?:
        | TabNavigationOptions
        | StackNavigationOptions
        | StackNavigationConfig
        | WebviewNavigationOptions;
    screenOptions?: object;
    componentName?: ScreenName;
    children?: AppScreen[];
    header?: NavigationHeader;
}

export type AppMap = Record<string, AppScreen>;
