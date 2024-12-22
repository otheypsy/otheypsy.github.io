import useFetch from '../hooks/useFetchJson.hook'
import Organization from '../components/Organization/Organization.component'

const Education = () => {
    const educationData = useFetch('/data/education.data.json')
    if(!educationData) return null
    return (
        <>
            <h1 className="my-5">
                <i className="fa-solid fa-graduation-cap fa-xl pe-4"></i>
                Education
            </h1>
            <div className="row">
                {educationData.map((company, key) => (
                    <div key={key} className="col-lg-12 col-xl-6 col-xxl-4">
                        <Organization key={key} {...company} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default Education
