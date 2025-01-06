import { useFetchJson } from '../hooks/useFetchJson.hook'
import Organization from '../components/Organization/Organization.component'

interface ExperienceDataResponse {
    data: {
        name: string
        imgUrl: string
        roles: {
            title: string
            start: string
            end: string
        }[]
    }[]
    isLoading: boolean
}

const BusinessExperience = () => {
    const { data, isLoading } = useFetchJson('/data/experience.data.json') as ExperienceDataResponse
    if (isLoading) return null
    return (
        <div className="row">
            {data.map((company, key) => (
                <div key={key} className="col-lg-12 col-xl-6 col-xxl-4">
                    <Organization key={key} name={company.name} roles={company.roles} imgUrl={company.imgUrl} />
                </div>
            ))}
        </div>
    )
}

export default BusinessExperience
