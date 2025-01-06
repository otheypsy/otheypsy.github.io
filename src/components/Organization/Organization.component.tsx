import classNames from './Organization.module.scss'

const logoClassNames = classNames.logo + ' img-fluid me-3'

interface OrganizationProps {
    imgUrl?: string
    name: string
    roles: {
        title: string
        start: string
        end: string
    }[]
}

const Organization = (props: OrganizationProps) => {
    return (
        <div className="p-4">
            <h4>
                {props.imgUrl && <img alt="" className={logoClassNames} src={props.imgUrl} />}
                {props.name}
            </h4>
            <div className={classNames.roles + ' my-4 mx-2 ms-4'}>
                {props.roles.map((role, key) => {
                    return (
                        <div key={key}>
                            <div className="px-4 py-2">
                                <div className={classNames.tag} />
                                <label className="lead">{role.title}</label>
                                <br />
                                <i className={classNames.dates}>
                                    {role.start} to {role.end}
                                </i>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Organization
