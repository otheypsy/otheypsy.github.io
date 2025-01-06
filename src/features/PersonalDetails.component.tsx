import { useFetchJson } from '../hooks/useFetchJson.hook'
import Loading from '../components/Loading.component'

interface PersonalDataResponse {
    data: {
        imgUrl: string
        name: string
        work: {
            role: string
            company: string
        }
        location: string
        socials: {
            name: string
            url: string
            iconCss: string
        }[]
    }
    isLoading: boolean
}

const PersonalDetails = () => {
    const { data, isLoading } = useFetchJson('/data/personal.data.json') as PersonalDataResponse
    if (isLoading) return <Loading />
    return (
        <>
            <div className="text-center pt-5">
                <img alt={data.name} className="img-fluid mx-auto d-block py-5 rounded-circle" src={data.imgUrl} />
                <h1 className="display-5">{data.name}</h1>
                <br />
                <label className="lead">
                    {data.work.role}
                    <br />
                    {data.work.company}
                    <br />
                    {data.location}
                </label>
            </div>

            <div className="d-flex justify-content-evenly py-5">
                {data.socials.map((social) => {
                    return (
                        <a
                            key={social.name}
                            aria-label={social.name}
                            href={social.url}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="d-block"
                        >
                            <i className={'fa-2xl ' + social.iconCss} aria-hidden="true" />
                        </a>
                    )
                })}
            </div>
        </>
    )
}

export default PersonalDetails
