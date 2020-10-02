declare module 'react-native-view-toast' {
    import React from 'react';
    import { View, ViewStyle } from 'react-native';

    export interface ToastParams {
        duration?: number;
        visible?: boolean;
        position?: number;
        animation?: boolean;
        shadow?: boolean;
        backgroundColor?: string;
        shadowColor?: string;
        textColor?: string;
        delay?: number;
        hideOnPress?: boolean;
        containerStyle?: ViewStyle;
        textStyle?: TextStyle;
        view?: React.FC<View>;
        onShow?(): void;

        onShown?(): void;

        onHide?(): void;

        onHidden?(): void;
    }
    // eslint-disable-next-line import/no-default-export
    export default class Toast extends React.ComponentClass<ToastParams> {
        static positions = {
            TOP: 20,
            BOTTOM: -80,
            CENTER: 1,
        };

        static show(message: string, options: ToastParams): Toast;

        static hide(toast: Toast): void;
    }
}
