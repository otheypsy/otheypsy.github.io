import { getTechSkillsData } from '../services/data.service.js'
import SkillCategory from '../components/SkillCategory/SkillCategory.component.jsx'

const techSkillsData = getTechSkillsData()

const TechnicalSkills = () => {
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
