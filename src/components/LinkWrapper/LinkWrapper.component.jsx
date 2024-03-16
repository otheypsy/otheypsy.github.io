import { useMatch, useResolvedPath } from 'react-router-dom'
import classNames from './LinkWrapper.module.scss'

const LinkWrapper = (props) => {
    const resolved = useResolvedPath(props.path)
    const match = useMatch({ path: resolved.pathname, end: false, caseSensitive: false })
    const finalClassName = classNames.link + ' ' + (!match ? '' : classNames.active)

    const onClick = () => props.onClick(props.path)

    return (
        <li className="nav-item">
            <h1 onClick={onClick}>
                <span className={finalClassName}>{props.label}</span>
            </h1>
        </li>
    )
}

export default LinkWrapper
