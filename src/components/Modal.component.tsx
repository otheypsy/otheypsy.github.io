import { Modal as BootstrapModal } from 'bootstrap'
import { useState, useRef, lazy, useImperativeHandle } from 'react'
import BusinessExperience from '../features/BusinessExperience.component'
import Education from '../features/Education.component'
import TechnicalSkills from '../features/TechnicalSkills.component'
import Projects from '../features/Projects.component'
import PersonalDetails from '../features/PersonalDetails.component'

const sections = {
    personal: {
        label: 'Personal',
        component: PersonalDetails
    },
    business_experience: {
        label: 'Business Experience',
        component: BusinessExperience
    },
    technical_skills: {
        label: 'Technical Skills',
        component: TechnicalSkills
    },
    education: {
        label: 'Education',
        component: Education
    }
}

const Modal = ({ref}) => {
    const modal = useRef(null)
    const [section, setSection] = useState('personal')

    useImperativeHandle(ref, () => {
        return {
            openModal: (section: string) => {
                setSection(section)
                const modalInstance = BootstrapModal.getOrCreateInstance(modal.current)
                modalInstance.show()
            }
        };
    }, []);

    const renderSection = () => {
        const Component = sections[section].component
        return <Component />
    }

    return (
        <div className="modal fade" id="gameModal" tabIndex={-1} ref={modal}>
            <div className="modal-dialog modal-xl modal-fullscreen-xxl-down modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-body">
                        {renderSection()}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
