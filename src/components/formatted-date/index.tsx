'use client';

import { useSyncExternalStore } from 'react';

interface Props {
    date: Date;
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

const FormattedDate = ({
    date,
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

    return date.toLocaleString(locale, {
        ...(hasTime && timeZone !== 'Europe/Helsinki' && { timeZoneName: 'short' }),
        ...options,
    });
};

export default FormattedDate;
