import { lazy } from 'react'

const routes = [
    {
        label: 'Overview',
        path: '',
        index: true,
        LazyComponent: lazy(() => import('./Overview/Overview.component')),
    },
    {
        label: 'Game',
        path: 'game',
        LazyComponent: lazy(() => import('./Game/Game.component')),
    },
]

export default routes
