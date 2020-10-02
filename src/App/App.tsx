import 'core-js/features/object/from-entries';
import React from 'react';
import { useAppComponent } from './useAppComponent';
import { AppStateProvider } from '../components/AppStateProvider';

const App: React.FC = () => {
    const AppComponent = useAppComponent();
    return (
        <AppStateProvider>
            <AppComponent />
        </AppStateProvider>
    );
};
export { App };
