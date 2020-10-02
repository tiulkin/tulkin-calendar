import React from 'react';
import { NetworkInfoProvider } from '../NetworkInfoProvider';
import { OfflineStorageProvider } from '../OfflineStorageProvider';

interface Props {
    children: React.ReactNode;
}

const AppStateProvider = ({ children }: Props) => {
    return (
        <NetworkInfoProvider>
            <OfflineStorageProvider>{children}</OfflineStorageProvider>
        </NetworkInfoProvider>
    );
};

export { AppStateProvider };
