import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For expect(...).toBeInTheDocument()
import axios from 'axios'; // Mock Axios requests
import HomeVideo from '../src/components/NasaVideo/HomeVideo';

// Mock Axios get request
jest.mock('axios');

describe('HomeVideo component', () => {
    test('should render video search form and search results', async () => {
        const mockItems = [
            {
                links: [{ href: 'video-preview-url' }],
                href: ['video-play-url'],
                data: [{ title: 'Video Title', description: 'Video Description', nasa_id: 'video-id' }],
            },
        ];
        axios.mockResolvedValueOnce({ data: { collection: { items: mockItems } } });

        const { getByText, getByPlaceholderText, getByRole } = render(<HomeVideo items={mockItems} />);

        // Check if search form and button are rendered
        expect(getByText('Search Video')).toBeInTheDocument();
        expect(getByPlaceholderText('Search for a video')).toBeInTheDocument();
        expect(getByRole('button', { name: 'Search' })).toBeInTheDocument();

        // Simulate search and fetch request
        fireEvent.change(getByPlaceholderText('Search for a video'), { target: { value: 'mars' } });
        fireEvent.click(getByRole('button', { name: 'Search' }));

        // Wait for fetch request to complete
        await waitFor(() => {
            expect(axios).toHaveBeenCalledWith({
                method: 'get',
                url: 'https://images-api.nasa.gov/search?q=mars&page=1&media_type=video',
            });
        });

        // Check if video search results are rendered
        expect(getByText('Video Title')).toBeInTheDocument();
        expect(getByText('Video Description')).toBeInTheDocument();
    });


});
