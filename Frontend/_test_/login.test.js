import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Login from '../src/components/Login';

jest.mock('axios');

describe('Login Component', () => {
    it('should handle form submission successfully', async () => {
        const mockResponse = { data: { accessToken: 'mockAccessToken' } };
        axios.post.mockResolvedValue(mockResponse);

        const { getByPlaceholderText, getByText } = render(<Login />);

        fireEvent.change(getByPlaceholderText('Email Address'), { target: { value: 'test@example.com' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(getByText('Login'));

        await waitFor(() => {
            expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', 'mockAccessToken');
            expect(window.location.href).toBe('/apod');
        });
    });

    it('should handle form submission failure', async () => {
        const errorMessage = 'Email and password do not match';
        const mockErrorResponse = { response: { status: 401, data: errorMessage } };
        axios.post.mockRejectedValue(mockErrorResponse);

        const { getByPlaceholderText, getByText } = render(<Login />);

        fireEvent.change(getByPlaceholderText('Email Address'), { target: { value: 'test@example.com' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(getByText('Login'));

        await waitFor(() => {
            expect(getByText(errorMessage)).toBeInTheDocument();
        });
    });
});
