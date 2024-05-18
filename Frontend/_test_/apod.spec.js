// _test_/apod.spec.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import mockAxios from '../__mocks__/axios';
import APOD from '../src/components/APOD';

// Mock the API response
mockAxios.onGet('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY').reply(200, {
  url: 'https://example.com/image.jpg',
  title: 'Test Title',
  date: '2024-05-18',
  explanation: 'Test explanation.',
});

test('renders correctly and fetches data', async () => {
  await act(async () => {
    render(<APOD />);
  });

  const imgElement = screen.getByRole('img');
  expect(imgElement).toHaveAttribute('src', 'https://example.com/image.jpg');
  expect(screen.getByText('Test Title')).toBeInTheDocument();
  expect(screen.getByText('2024-05-18')).toBeInTheDocument();
  expect(screen.getByText('Test explanation.')).toBeInTheDocument();
});
