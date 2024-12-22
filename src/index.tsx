import { createRoot } from 'react-dom/client'
import './index.scss'
import MainApp from './MainApp.component'

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(<MainApp />)
