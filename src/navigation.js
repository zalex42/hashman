import React from 'react';
import DashboardIcon from 'react-icons/lib/fa/dashboard';
import GlobeIcon from 'react-icons/lib/fa/globe';
import EventsIcon from 'react-icons/lib/io/android-alert';
import IncomeIcon from 'react-icons/lib/io/cash';
import CharIcon from 'react-icons/lib/fa/bar-chart';
import DownloadIcon from 'react-icons/lib/fa/download';
import CogIcon from 'react-icons/lib/fa/cog';

type Item = {
    icon: React.Component,
    label: string,
    to: 'string'
};

const navigation: Array<Item> = [
    {
        to: '/dashboard',
        icon: DashboardIcon,
        label: 'Контрольная панель'
    },
    {
        to: '/rigs',
        icon: GlobeIcon,
        label: 'Устройства'
    },
    {
        to: '/report',
        icon: CharIcon,
        label: 'Отчёт'
    },
    {
        to: '/income',
        icon: IncomeIcon,
        label: 'Прибыль'
    },
    {
        to: '/events',
        icon: EventsIcon,
        label: 'История событий'
    },
    {
        to: '/settings',
        icon: CogIcon,
        label: 'Настройки'
    },
    {
        to: '/download',
        icon: DownloadIcon,
        label: 'Загрузки'
    },
];

export default navigation