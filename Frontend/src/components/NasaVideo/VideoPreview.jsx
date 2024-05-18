import React from 'react';
import { useState } from 'react';
import './index.css';
import Modal from 'react-bootstrap/Modal';
import ReactPlayer from 'react-player';

const VideoPreview = ({ videoPreview, videoPlay, title, description, vid }) => {
    const [show, setShow] = useState(false);
    const videoPrueba = "https://images-assets.nasa.gov/video/GSFC_20110617_LRO_m10794_Eclipse_Librating_Moon/GSFC_20110617_LRO_m10794_Eclipse_Librating_Moon~orig.mp4"

    return (
        <main className="grid">
            <div className="responsive" >
                <div className="galleryVideo">
                    <img alt="image2" src={videoPreview} className="Img_Grid" onClick={() => setShow(true)} />
                    <div className="desc">{title}</div>
                    <div>{vid}</div>
                </div>
            </div>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-110w"
                aria-labelledby="example-custom-modal-styling-title"
                className="Modal"
            >
                <ReactPlayer
                    url={videoPlay}
                    width='60%'
                    height='60%'
                    controls
                    playing
                />
                <div className="container-Modal">
                    <h1 className="Title_Modal">{title}</h1>
                    <p className="description_Modal">{description}</p>
                </div>
            </Modal>
        </main>
    )
}

export default VideoPreview

