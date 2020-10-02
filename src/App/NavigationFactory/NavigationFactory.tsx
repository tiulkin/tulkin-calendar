import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppScreen, NavigationType } from '../appMap';
import { screens } from '../../screens';

function NavigationFactory(screenData: AppScreen): React.ComponentType {
    const { navigationType, navigationOptions, children, componentName } = screenData;

    if (navigationType === NavigationType.TABS && children) {
        const Tabs = createBottomTabNavigator();

        return () => (
            <Tabs.Navigator {...navigationOptions}>
                {children.map((childScreenData) => {
                    return (
                        <Tabs.Screen
                            options={childScreenData.screenOptions}
                            key={childScreenData.id}
                            name={childScreenData.id}
                            component={NavigationFactory(childScreenData)}
                        />
                    );
                })}
            </Tabs.Navigator>
        );
    }
    if (navigationType === NavigationType.STACK && children) {
        const Stack = createStackNavigator();
        return () => (
            <Stack.Navigator {...navigationOptions}>
                {children.map((childScreenData) => (
                    <Stack.Screen
                        options={childScreenData.screenOptions}
                        key={childScreenData.id}
                        name={childScreenData.id}
                        component={NavigationFactory(childScreenData)}
                    />
                ))}
            </Stack.Navigator>
        );
    }
    if (componentName && screens[componentName]) {
        return screens[componentName] || <></>;
    }
    return () => <></>;
}

export { NavigationFactory };
