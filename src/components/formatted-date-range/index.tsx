'use client';

import { useSyncExternalStore } from 'react';

interface Props {
    startDate: Date;
    endDate: Date;
    options?: Intl.DateTimeFormatOptions;
}

const subscribe = (callback: () => void) => {
    window.addEventListener('languagechange', callback);
    return () => window.removeEventListener('languagechange', callback);
};

const getSnapshot = () =>
    JSON.stringify({
        locale: navigator.languages.indexOf('fi') !== -1 ? 'fi-FI' : undefined,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

const getServerSnapshot = () =>
    JSON.stringify({
        locale: 'fi-FI',
        timeZone: 'Europe/Helsinki',
    });

const FormattedDateRange = ({
    startDate,
    endDate,
    options = {
        month: 'numeric',
        year: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    },
}: Props) => {
    const { locale, timeZone } = JSON.parse(useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot));
    const hasTime = options.hour !== undefined || options.minute !== undefined || options.second !== undefined;
    const dateRangeFormatter = new Intl.DateTimeFormat(locale, {
        ...(hasTime && timeZone !== 'Europe/Helsinki' && { timeZoneName: 'short' }),
        ...options,
    });

    return dateRangeFormatter.formatRange(startDate, endDate);
};

export default FormattedDateRange;
