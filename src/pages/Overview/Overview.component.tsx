import classNames from './Overview.module.scss'
import BusinessExperience from '../../features/BusinessExperience.component'
import Education from '../../features/Education.component'
import TechnicalSkills from '../../features/TechnicalSkills.component'
// import Projects from '../../features/Projects.component'

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
            TODO: Complete projects section 
            <div className={classNames.separator} />
            <div className="p-4">
                <Projects />
            </div>
            */}
        </>
    )
}

export default Overview
