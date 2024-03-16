import { getExperienceData } from '../services/data.service.js'

const projects = getExperienceData()

const Projects = () => {
    return (
        <>
            <h1 className="my-5">
                <i className="fa-solid fa-folder fa-xl pe-4"></i>
                Projects
            </h1>
        </>
    )
}

export default Projects
