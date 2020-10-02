import React from 'react';
import { Timer } from './Timer';
import { Holidays } from './Holidays';
import { HolidayInfo } from './HolidayInfo';
import { Calendar } from './Calendar';
import { Error } from './Error';
import { Settings } from './Settings';
import { ScreenName } from './types';

const screens: Record<ScreenName, React.FC> = {
    Timer,
    Holidays,
    HolidayInfo,
    Calendar,
    Error,
    Settings,
};

export { screens };
