import React, { useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

interface Props {
    children: React.ReactNode;
}

const NetworkInfoContext = React.createContext<boolean | null | undefined>(undefined);

const NetworkInfoProvider = ({ children }: Props) => {
    const [isInternetReachable, setIsInternetReachable] = useState<boolean | null | undefined>(undefined);

    React.useEffect(() => {
        let isCleared = false;
        let unsubscribe = () => {};

        NetInfo.fetch().then((state) => {
            setIsInternetReachable(state.isConnected && state.isInternetReachable);
            if (!isCleared) {
                unsubscribe = NetInfo.addEventListener((newState) => {
                    const isConnected = newState.isConnected && newState.isInternetReachable;
                    setIsInternetReachable(isConnected);
                });
            }
        });

        return () => {
            isCleared = true;
            unsubscribe();
        };
    }, []);

    return <NetworkInfoContext.Provider value={isInternetReachable}>{children}</NetworkInfoContext.Provider>;
};

const useNetworkInfoState = () => React.useContext(NetworkInfoContext);

export { NetworkInfoProvider, useNetworkInfoState };
