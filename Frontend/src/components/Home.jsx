import React from 'react'
import bgVideo from "../assets/earth-bg.mp4"
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true); // If token is present, user is logged in
        }
    }, []);

    const [text] = useTypewriter({
        words: ['Every day, NASA ', " reveals a mesmerizing glimpse of the cosmos"],
        loop: {},
    })
    return (
        <div className="">
            <div className="h-screen relative">
                <video
                    autoPlay
                    loop
                    muted
                    className="fixed right-0 top-0 h-screen w-full object-cover z-[-1]"
                >
                    <source src={bgVideo} type="video/mp4" />
                </video>
                <div>
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center px-60">
                        <h1 style={{
                            fontSize: '3rem',
                            fontFamily: 'Lora, serif',
                            fontOpticalSizing: 'auto',
                            fontWeight: 600,
                            fontStyle: 'normal',
                            color: '#facc15'
                        }}>
                            Did You Know ?
                        </h1>
                    </div>

                    <div className="absolute top-20 left-0 w-full h-full flex justify-center items-center px-60">
                        <h4 style={{
                            fontSize: '2rem',
                            fontFamily: 'Lora, serif',
                            fontOpticalSizing: 'auto',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            color: 'white'
                        }}>
                            <span className="text-3xl sm:text-4xl text-white">{text}</span>
                            <Cursor />
                        </h4>
                    </div>

                    <div className="absolute top-60 left-0 w-full h-full flex justify-center items-center px-60">
                        <Link to={isLoggedIn ? "/apod" : "/signup"} className="group  border-2 border-white  text-white font-bold py-2 px-4 rounded inline-flex items-center cursor-pointer">
                            Explore More
                        </Link>
                    </div>
                </div>



            </div>
        </div >
    )
}

export default Home