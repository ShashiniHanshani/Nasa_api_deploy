import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For expect(...).toBeInTheDocument()
import axios from 'axios'; // Mock Axios requests

import Login from './Login';

// Mock Axios post request
jest.mock('axios');

describe('Login component', () => {
    test('should render login form', () => {
        const { getByText, getByPlaceholderText } = render(<Login />);

        expect(getByText('Login')).toBeInTheDocument();
        expect(getByPlaceholderText('Email Address')).toBeInTheDocument();
        expect(getByPlaceholderText('Password')).toBeInTheDocument();
    });

    test('should submit form with email and password', async () => {
        const { getByPlaceholderText, getByRole } = render(<Login />);

        const emailInput = getByPlaceholderText('Email Address');
        const passwordInput = getByPlaceholderText('Password');
        const loginButton = getByRole('button', { name: 'Login' });

        // Mock successful response
        axios.post.mockResolvedValueOnce({
            data: { accessToken: 'mockAccessToken' }
        });

        // Simulate user input and form submission
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(loginButton);

        // Ensure the login request is made with the correct data
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:8070/nasauser/login',
                { email: 'test@example.com', password: 'password123' }
            );
        });

        // Ensure successful login redirects to /apod
        expect(window.location.href).toBe('/apod');
    });

    test('should display error message for invalid credentials', async () => {
        const { getByPlaceholderText, getByRole, findByText } = render(<Login />);

        const emailInput = getByPlaceholderText('Email Address');
        const passwordInput = getByPlaceholderText('Password');
        const loginButton = getByRole('button', { name: 'Login' });

        // Mock error response
        axios.post.mockRejectedValueOnce({
            response: { status: 401, data: 'Email and the password mismatch' }
        });

        // Simulate user input and form submission
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(loginButton);

        // Ensure error message is displayed
        const errorMessage = await findByText('Email and password do not match');
        expect(errorMessage).toBeInTheDocument();
    });
});
