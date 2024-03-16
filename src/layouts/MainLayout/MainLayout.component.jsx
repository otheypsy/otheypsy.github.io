import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import classNames from './MainLayout.module.scss'
import PersonalDetails from '../../features/PersonalDetails.component.jsx'
import LinkWrapper from '../../components/LinkWrapper/LinkWrapper.component.jsx'

const MainLayout = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const onHomeRedirect = () => navigate('/')
    const onGameRedirect = () => navigate('/game')

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12 col-xl-3 col-xxl-2 text-center">
                    <PersonalDetails />
                    {location.pathname === '/' ? (
                        <button onClick={onGameRedirect} className="btn btn-outline-success m-2 fw-bold">
                            <b>Let&apos;s Play a Game</b>
                        </button>
                    ) : (
                        <button onClick={onHomeRedirect} className="btn btn-outline-success m-2 fw-bold">
                            Return Home
                        </button>
                    )}
                </div>
                <div className="col-lg-12 col-xl-9 col-xxl-10 py-2">
                    <div className={classNames.content + ' px-5'}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainLayout
