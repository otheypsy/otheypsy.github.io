import classNames from './SkillCategory.module.scss'

const iconClassNames = classNames.icon + ' p-5 fa-brands fa-xl'

const SkillIcon = (props: {
    icon: string
}) => {
    return (
        <h2 className="d-inline">
            <i className={iconClassNames + ' fa-' + props.icon}></i>
        </h2>
    )
}

const SkillBadge = (props: {
    label: string
}) => {
    return (
        <div className={'badge mx-4 my-2 px-4 py-2 ' + classNames.badge}>
            <span className="lead">{props.label}</span>
        </div>
    )
}

const SkillCategory = (props: {
    label: string
    type: string
    skills: string[]
}) => {
    return (
        <div className="p-5">
            <div className="row">
                <div className="col-md-12 col-xl-3 col-xxl-2">
                    <div className={'d-flex align-items-center justify-content-center ' + classNames.labelContainer}>
                        <h4>{props.label}</h4>
                    </div>
                </div>
                <div className="col-md-12 col-xl-9 col-xxl-10">
                    {props.skills.map((skill) => {
                        return props.type === 'icons' ? (
                            <SkillIcon key={skill} icon={skill} />
                        ) : (
                            <SkillBadge key={skill} label={skill} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SkillCategory
