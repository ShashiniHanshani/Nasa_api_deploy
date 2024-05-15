import React, { useState } from 'react';
import logo from '../assets/nasalogo.png';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import authentication from './Authentication/authentication';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav data-aos="fade-down" className="fixed top-0 right-0 w-full z-50 bg-black/10 backdrop-blur-sm py-4 sm:py-4">
            <div className="container flex justify-between items-center">
                <div className="flex items-center">
                    <img src={logo} alt="logo nasa" style={{ height: '90px', width: 'auto' }} />
                </div>
                <div className="hidden sm:block text-green">
                    <ul className={`flex items-center gap-6 text-xl py-4 text-white sm:py-0 ${isOpen ? 'hidden' : 'block'}`}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/apod">APOD</Link></li>
                        <li><Link to="/homevideo">Nasa Image and Video Library</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </div>
                <div className="sm:hidden">
                    <button className="text-white border-2 border-white px-3 py-1 rounded-md" onClick={toggleMenu}>
                        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>
                <div className="hidden sm:block">
                    <button className="text-white border-2 border-white px-3 py-1 rounded-md">
                        Sign Up
                    </button>
                </div>
            </div>
            <ul className={`flex flex-col items-center gap-4 text-xl py-4 text-white sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                <li><Link to="/apod" onClick={toggleMenu}>APOD</Link></li>
                <li><Link to="/homevideo" onClick={toggleMenu}>Nasa Image and Video Library</Link></li>
                <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;
