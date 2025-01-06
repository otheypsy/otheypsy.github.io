import classNames from './Overview.module.scss'
import BusinessExperience from '../../features/BusinessExperience.component'
import Education from '../../features/Education.component'
import TechnicalSkills from '../../features/TechnicalSkills.component'
// import Projects from '../../features/Projects.component'

const Overview = () => {
    return (
        <>
            <div className="p-4">
                <h1 className="my-5">
                    <i className="fa-solid fa-briefcase pe-4"></i>
                    Business Experience
                </h1>
                <BusinessExperience />
            </div>
            <div className={classNames.separator} />
            <div className="p-4">
                <h1 className="my-5">
                    <i className="fa-solid fa-graduation-cap pe-4"></i>
                    Education
                </h1>
                <Education />
            </div>
            <div className={classNames.separator} />
            <div className="p-4">
                <h1 className="my-5">
                    <i className="fa-solid fa-wrench pe-4"></i>
                    Technical Skills
                </h1>
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
