import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8070/NasaUser/add', formData);
            console.log(response.data);
            // If signup successful, no need to do anything, as user will be redirected to login page by Link
            window.location.href = '/login';
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data === 'NasaUser already registered!') {
                setError('The user account exists');
            } else {
                console.error('Error signing up:', error);
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative">
                <h1 className="text-3xl font-bold text-center text-white">Sign Up</h1>
                <form onSubmit={handleSubmit} >
                    <div className='relative my-4 text-white '>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 
                focus:outline-none focus:ring-0 focus:text-white focus-border-blue-600 peer'  />
                        <label htmlFor='absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] text-white
                peer-focus:left-0 peer:focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus: -translate-y-6 '>User Name</label>
                    </div>
                    <div className='relative my-4 text-white '>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 
                focus:outline-none focus:ring-0 focus:text-white focus-border-blue-600 peer' />
                        <label htmlFor='absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] text-white
                peer-focus:left-0 peer:focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus: -translate-y-6 '>Email Address</label>
                    </div>
                    <div className='relative my-4 text-white'>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 
                focus:outline-none focus:ring-0 focus:text-white focus-border-blue-600 peer' />
                        <label htmlFor='absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] 
                peer-focus:left-0 peer:focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus: -translate-y-6'>Password</label>
                    </div>
                    <button type="submit" className='w-full mb-4 text-[18px] border-2 border-white text-white roundedbg-blue-500 py-2 hover:bg-gray-600 transition-colors duratiob-300'>Sign Up</button>
                </form>

                <p className="text-white mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp