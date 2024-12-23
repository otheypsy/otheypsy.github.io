import useFetch from '../hooks/useFetchJson.hook'
import SkillCategory from '../components/SkillCategory/SkillCategory.component'

interface TechSkillsData {
    name: string
    type: string
    skills: string[]
}

const TechnicalSkills = () => {
    const techSkillsData = useFetch('/data/techSkills.data.json') as TechSkillsData[]
    if(!techSkillsData) return null
    return (
        <>
            <h1 className="my-5">
                <i className="fa-solid fa-wrench fa-xl pe-4"></i>
                Technical Skills
            </h1>
            {techSkillsData.map((category) => (
                <SkillCategory
                    key={category.name}
                    type={category.type}
                    label={category.name}
                    skills={category.skills}
                />
            ))}
        </>
    )
}

export default TechnicalSkills
