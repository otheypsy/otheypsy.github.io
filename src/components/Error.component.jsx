import { useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError()
    console.error(error)

    return (
        <div className="d-flex justify-content-center m-5">
            <div className="text-center">
                <h1 className="display-4 pb-4">Oops!</h1>
                <p className="lead">Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
                <a className="btn btn-outline-secondary" href="/">
                    Return to Homepage
                </a>
            </div>
        </div>
    )
}

export default Error
