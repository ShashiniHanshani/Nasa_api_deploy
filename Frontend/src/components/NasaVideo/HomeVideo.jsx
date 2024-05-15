import React from 'react'
import { useState } from 'react'
import VideoPreview from "./VideoPreview"
import './index.css';


const HomeVideo = ({ items, collection }) => {
    const [search, setSearch] = useState("");
    const [videos, setVideos] = useState(items, collection);
    return (
        <div className='Home flex items-center justify-center h-screen'>
            <div className="bg-gradient-to-b space-y-4 from-black to-gray-900 w-full text-white justify-center items-center">
                <h1 className='text-white justify-center'>Search Video</h1>
                <input
                    style={{
                        border: '0',
                        width: '40%',
                        height: '100%',
                        padding: '10px 20px',
                        background: 'rgba(255, 255, 255, 0.76)',
                        borderRadius: '3px',
                        transition: 'all 0.4s ease',
                        marginTop: '30px',
                        color: 'rgb(13, 0, 129)'
                    }}
                    id="nasaSearch"
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search for a video"
                />


                <button
                    className="button"
                    // disabled={search === ""}
                    onClick={async () => {
                        const results = await fetch(
                            `https://images-api.nasa.gov/search?q=${search}&page=1&media_type=video`
                        );
                        const vid = await results.json();
                        setVideos(vid.collection.items);
                        console.log({ vid });

                    }}
                >
                    Search
                </button>
                <div>
                    <div>
                        {videos &&
                            videos.map((vid) => (
                                <VideoPreview
                                    key={vid.data[0].title}
                                    videoPreview={vid.links[0].href}
                                    videoPlay={vid.href[0]}
                                    title={vid.data[0].title}
                                    description={vid.data[0].description}
                                    nasaId={vid.data[0].nasa_id}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default HomeVideo