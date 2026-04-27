'use client';

import { useSyncExternalStore } from 'react';

interface Props {
    options?: Intl.NumberFormatOptions;
    value: number;
}

const subscribe = (callback: () => void) => {
    window.addEventListener('languagechange', callback);
    return () => window.removeEventListener('languagechange', callback);
};

const getSnapshot = () =>
    JSON.stringify({
        locale: navigator.languages.indexOf('fi') !== -1 ? 'fi-FI' : undefined,
    });

const getServerSnapshot = () =>
    JSON.stringify({
        locale: 'fi-FI',
    });

const FormattedNumber = ({ options, value }: Props) => {
    const { locale } = JSON.parse(useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot));
    const currencyFormatter = new Intl.NumberFormat(locale, options);

    return currencyFormatter.format(value);
};

export default FormattedNumber;
