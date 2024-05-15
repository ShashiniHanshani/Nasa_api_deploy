import React from 'react';
import { render, waitFor } from '@testing-library/react';
import APOD from './APOD';


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        title: 'Test Title',
        date: '2022-04-25',
        url: 'https://example.com/image.jpg',
        explanation: 'Test explanation text.',
      }),
  })
);

describe('APOD component', () => {
  it('renders without crashing', () => {
    render(<APOD />);
  });

  it('fetches data from the NASA API and displays it correctly', async () => {
    const { getByText, getByAltText } = render(<APOD />);
    
 
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    // Check that the fetched data is displayed correctly
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('2022-04-25')).toBeInTheDocument();
    expect(getByAltText('Test Title')).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(getByText('Test explanation text.')).toBeInTheDocument();
  });

  
});
