import personalData from '../data/personal.data.json'
import experienceData from '../data/experience.data.json'
import educationData from '../data/education.data.json'
import techSkillsData from '../data/techSkills.data.json'

const getPersonalData = () => personalData

const getTechSkillsData = () => techSkillsData

const getExperienceData = () => experienceData

const getEducationData = () => educationData

export { getPersonalData, getTechSkillsData, getExperienceData, getEducationData }
