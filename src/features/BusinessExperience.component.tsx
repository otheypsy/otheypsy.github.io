import useFetch from '../hooks/useFetchJson.hook'
import Organization from '../components/Organization/Organization.component'

interface Company {
    name: string
    imgUrl: string
    roles: {
        title: string
        start: string
        end: string
    }[];
}

const BusinessExperience = () => {
    const experienceData = useFetch('/data/experience.data.json') as Company[]
    if(!experienceData) return null
    return (
        <>
            <h1 className="my-5">
                <i className="fa-solid fa-briefcase fa-xl pe-4"></i>
                Business Experience
            </h1>
            <div className="row">
                {experienceData.map((company, key) => (
                    <div key={key} className="col-lg-12 col-xl-6 col-xxl-4">
                        <Organization key={key} name={company.name} roles={company.roles} imgUrl={company.imgUrl} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default BusinessExperience
