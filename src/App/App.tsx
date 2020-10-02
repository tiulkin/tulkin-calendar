import 'core-js/features/object/from-entries';
import { YellowBox } from 'react-native';
import React from 'react';
import { useAppComponent } from './useAppComponent';
import { AppStateProvider } from '../components/AppStateProvider';

console.disableYellowBox = true;

const App: React.FC = () => {
    const AppComponent = useAppComponent();
    return (
        <AppStateProvider>
            <AppComponent />
        </AppStateProvider>
    );
};
export { App };
