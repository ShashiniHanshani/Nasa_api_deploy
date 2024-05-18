import React from 'react'
import { useState } from 'react'
import VideoPreview from "./VideoPreview"
import './index.css';


const HomeVideo = ({ items, collection }) => {
    const [search, setSearch] = useState("");
    const [videos, setVideos] = useState(items, collection);
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <div className='Home flex items-center justify-center h-screen'>
            <div className="bg-gradient-to-b space-y-4  to-gray-900 w-full text-white justify-center items-center">
                <h1 className='text-white justify-center text-3xl '>Search Video</h1>
                <h3 className='justify-center text-2xl' style={{
                    color: '#facc15'
                }} >Look for captivating films on planets and galaxies.</h3>
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

                <div className="grid-container">
                    {videos && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                            {
                                videos.map((vid, index) => (
                                    <VideoPreview
                                        key={vid.data[0].nasa_id}
                                        videoPreview={vid.links[0].href}
                                        videoPlay={vid.href[0]}
                                        title={vid.data[0].title}
                                        description={vid.data[0].description}
                                        nasaId={vid.data[0].nasa_id}
                                        index={index}
                                        onClick={() => setSelectedVideo(vid)}

                                    />
                                ))
                            }
                        </div>
                    )}
                </div>

                {selectedVideo && (
                    <div className="video-player">
                        <ReactPlayer
                            url={selectedVideo.href}
                            width="80%"
                            height="80%"
                            controls
                            playing
                        />
                        <h2>{selectedVideo.data[0].title}</h2>
                        <p>{selectedVideo.data[0].description}</p>
                    </div>
                )}
            </div>
        </div >
    );
}

export default HomeVideo