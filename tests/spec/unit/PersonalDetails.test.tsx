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

    it('should render the component', async () => {
        render(<PersonalDetails />)
        const regex = new RegExp(String.raw`${personalData.name}`)
        await screen.findByText(regex)
    })

    it('should render the loading component', async () => {
        render(<PersonalDetails />)
        const loadingElement = await screen.findByTestId('loading-element')
        expect(loadingElement.getAttribute('data-testid')).toBe('loading-element')
    })

    it('should display the correct name', async () => {
        render(<PersonalDetails />)
        const regex = new RegExp(String.raw`${personalData.name}`)
        const nameElement = await screen.findByText(regex)
        expect(nameElement).toBeInTheDocument()
    })

    it('should display the correct work role', async () => {
        render(<PersonalDetails />)
        const regex = new RegExp(String.raw`${personalData.work.role}`)
        const roleElement = await screen.findByText(regex)
        expect(roleElement).toBeInTheDocument()
    })

    it('should display the correct company', async () => {
        render(<PersonalDetails />)
        const regex = new RegExp(String.raw`${personalData.work.company}`)
        const companyElement = await screen.findByText(regex)
        expect(companyElement).toBeInTheDocument()
    })

    it('should display the correct work location', async () => {
        render(<PersonalDetails />)
        const regex = new RegExp(String.raw`${personalData.location}`)
        const locationElement = await screen.findByText(regex)
        expect(locationElement).toBeInTheDocument()
    })
})
