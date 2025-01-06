import { render, screen, waitFor } from '@testing-library/react'
import { vi, describe, beforeAll, afterAll, it, expect } from 'vitest'
import PersonalDetails from '../../../src/features/PersonalDetails.component'
import personalData from '../../../public/data/personal.data.json'
import { mockFetch } from '../mocks/fetch.mock'

describe('PersonalDetails Component', () => {
    beforeAll(() => {
        globalThis.fetch = vi.fn(mockFetch)
    })

    afterAll(() => {
        vi.clearAllMocks()
    })

    it('should render the component', () => {
        render(<PersonalDetails />)
    })

    it('should render the loading component', () => {
        render(<PersonalDetails />)
        const loadingElement = screen.getByTestId('loading-element')
        expect(loadingElement).toBeInTheDocument()
    })

    it('should display the correct name', async () => {
        render(<PersonalDetails />)
        await waitFor(() => {
            screen.getByText(personalData.name)
            const nameElement = screen.getByText(personalData.name)
            expect(nameElement).toBeInTheDocument()
        })
    })

    it('should display the correct work role', async () => {
        render(<PersonalDetails />)
        await waitFor(() => {
            const regex = new RegExp(String.raw`${personalData.work.role}`)
            const roleElement = screen.getByText(regex)
            expect(roleElement).toBeInTheDocument()
        })
    })

    it('should display the correct company', async () => {
        render(<PersonalDetails />)
        await waitFor(() => {
            const regex = new RegExp(String.raw`${personalData.work.company}`)
            const companyElement = screen.getByText(regex)
            expect(companyElement).toBeInTheDocument()
        })
    })

    it('should display the correct work location', async () => {
        render(<PersonalDetails />)
        await waitFor(() => {
            const regex = new RegExp(String.raw`${personalData.location}`)
            const locationElement = screen.getByText(regex)
            expect(locationElement).toBeInTheDocument()
        })
    })
})
