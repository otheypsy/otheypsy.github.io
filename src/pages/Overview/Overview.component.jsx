import classNames from './Overview.module.scss'
import BusinessExperience from '../../features/BusinessExperience.component.jsx'
import Education from '../../features/Education.component.jsx'
import TechnicalSkills from '../../features/TechnicalSkills.component.jsx'
import Projects from '../../features/Projects.component.jsx'

const Overview = () => {
    return (
        <>
            <div className="p-4">
                <BusinessExperience />
            </div>
            <div className={classNames.separator} />
            <div className="p-4">
                <Education />
            </div>
            <div className={classNames.separator} />
            <div className="p-4">
                <TechnicalSkills />
            </div>
            {/*
            <div className={classNames.separator} />
            <div className="p-4">
                <Projects />
            </div>
            */}
        </>
    )
}

export default Overview
