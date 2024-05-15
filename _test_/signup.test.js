import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For expect(...).toBeInTheDocument()
import axios from 'axios'; // Mock Axios requests

import SignUp from './SignUp';

// Mock Axios post request
jest.mock('axios');

describe('SignUp component', () => {
    test('should render sign up form', () => {
        const { getByText, getByPlaceholderText } = render(<SignUp />);

        expect(getByText('Sign Up')).toBeInTheDocument();
        expect(getByPlaceholderText('Username')).toBeInTheDocument();
        expect(getByPlaceholderText('Email Address')).toBeInTheDocument();
        expect(getByPlaceholderText('Password')).toBeInTheDocument();
    });

    test('should submit form with username, email, and password', async () => {
        const { getByPlaceholderText, getByRole } = render(<SignUp />);

        const usernameInput = getByPlaceholderText('Username');
        const emailInput = getByPlaceholderText('Email Address');
        const passwordInput = getByPlaceholderText('Password');
        const signUpButton = getByRole('button', { name: 'Sign Up' });

        // Mock successful response
        axios.post.mockResolvedValueOnce({
            data: {} // Mock successful response data if needed
        });

        // Simulate user input and form submission
        fireEvent.change(usernameInput, { target: { value: 'testUser' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(signUpButton);

        // Ensure the sign up request is made with the correct data
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:8070/NasaUser/add',
                { username: 'testUser', email: 'test@example.com', password: 'password123' }
            );
        });

        // Ensure successful sign up redirects to /login
        expect(window.location.href).toBe('/login');
    });

});
