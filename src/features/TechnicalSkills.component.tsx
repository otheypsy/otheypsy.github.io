import { useFetchJson } from '../hooks/useFetchJson.hook'
import SkillCategory from '../components/SkillCategory/SkillCategory.component'
import Loading from '../components/Loading.component'

interface TechSkillsDataResponse {
    data: {
        name: string
        type: string
        skills: string[]
    }[]
    isLoading: boolean
}

const TechnicalSkills = () => {
    const { data, isLoading } = useFetchJson('/data/techSkills.data.json') as TechSkillsDataResponse
    if (isLoading) return <Loading />
    return data.map((category) => (
        <SkillCategory key={category.name} type={category.type} label={category.name} skills={category.skills} />
    ))
}

export default TechnicalSkills
