import React from 'react'
import { useState, useEffect } from 'react'

const APOD = () => {

    const [photoData, setPhotoData] = useState(null);

    useEffect(() => {
        fetchPhoto();

        async function fetchPhoto() {
            const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=59niuobDnpOXSpeagTrRYj0BYqooh3WRWYrLOpX5`);
            const data = await res.json();
            setPhotoData(data);
            console.log(data);
        }
    }, []);

    if (!photoData) return <div />
    return (
        <div className="bg-gradient-to-b space-y-4 from-black to-gray-900 w-full text-white">
            <div className="h-screen flex justify-center items-center" >
                <img className="h-screen  bg-cover "
                    src={photoData.url}
                    alt={photoData.title}
                />
            </div>

            <div className="space-y-4 px-20 py-20">
                <div className="text-4xl py-10  md:font-bold flex justify-between items-center">
                    <h1 >{photoData.title}</h1>
                    <h1>{photoData.date}</h1>
                </div>
                <p className="text-xl">{photoData.explanation}</p>
            </div>
        </div >
    )
}

export default APOD;