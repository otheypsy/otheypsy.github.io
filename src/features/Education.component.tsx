import { useFetchJson } from '../hooks/useFetchJson.hook'
import Organization from '../components/Organization/Organization.component'
import Loading from '../components/Loading.component'

interface EducationDataResponse {
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

const Education = () => {
    const { data, isLoading } = useFetchJson('/data/education.data.json') as EducationDataResponse
    if (isLoading) return <Loading />
    return (
        <div className="row">
            {data.map((school, key) => (
                <div key={key} className="col-lg-12 col-xl-6 col-xxl-4">
                    <Organization key={key} name={school.name} roles={school.roles} imgUrl={school.imgUrl} />
                </div>
            ))}
        </div>
    )
}

export default Education
