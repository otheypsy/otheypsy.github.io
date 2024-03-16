import { getExperienceData } from '../services/data.service.js'
import Organization from '../components/Organization/Organization.component.jsx'

const experienceData = getExperienceData()

const BusinessExperience = () => {
    return (
        <>
            <h1 className="my-5">
                <i className="fa-solid fa-briefcase fa-xl pe-4"></i>
                Business Experience
            </h1>
            <div className="row">
                {experienceData.map((company, key) => (
                    <div key={key} className="col-lg-12 col-xl-6 col-xxl-4">
                        <Organization {...company} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default BusinessExperience
