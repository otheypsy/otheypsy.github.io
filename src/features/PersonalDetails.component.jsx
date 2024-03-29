import { getPersonalData } from '../services/data.service.js'

const personalData = getPersonalData()

const PersonalDetails = () => {
    return (
        <>
            <div className="text-center">
                <img
                    alt={personalData.name}
                    className="img-fluid mx-auto d-block py-5 rounded-circle"
                    src="/img/profile.png"
                />
                <h1 className="display-5">{personalData.name}</h1>
                <br />
                <label className="lead">
                    {personalData.work.role}
                    <br />
                    {personalData.work.company}
                    <br />
                    {personalData.location}
                </label>
            </div>

            <div className="d-flex justify-content-evenly py-5">
                {personalData.socials.map((social) => {
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
