import { lazy } from 'react'

interface AppRoute {
    label: string
    path: string
    LazyComponent: React.FC
    index?: boolean
}

const routes: AppRoute[] = [
    {
        label: 'Overview',
        path: '',
        index: true,
        LazyComponent: lazy(async () => await import('./Overview/Overview.component')),
    },
    {
        label: 'Game',
        path: 'game',
        LazyComponent: lazy(async () => await import('./Game/Game.component')),
    },
]

export default routes
