import { Modal as BootstrapModal } from 'bootstrap'
import { useState, useRef, useImperativeHandle } from 'react'
import PersonalDetails from '../features/PersonalDetails.component'
import BusinessExperience from '../features/BusinessExperience.component'
import TechnicalSkills from '../features/TechnicalSkills.component'
import Education from '../features/Education.component'
import Projects from '../features/Projects.component'

type SectionKey = 'personal' | 'business_experience' | 'technical_skills' | 'education' | 'projects';

const sections: Record<SectionKey, { label: string, component: React.ComponentType }> = {
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
    },
    projects: {
        label: 'Projects',
        component: Projects
    }
}

interface ModalHandler {
    openModal: (section: string) => void
}

const Modal = ({ref}: {ref: React.RefObject<ModalHandler | null>}) => {
    const modal = useRef(null)
    const [section, setSection] = useState<SectionKey>('personal')

    useImperativeHandle(ref, () => {
        return {
            openModal: (section: string) => {
                setSection(section as SectionKey)
                if (modal.current) {
                    const modalInstance = BootstrapModal.getOrCreateInstance(modal.current)
                    modalInstance.show()
                }
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

export { Modal }
export type { ModalHandler }
