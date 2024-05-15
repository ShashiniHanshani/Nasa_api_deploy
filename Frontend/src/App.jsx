import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Footer from "./components/Footer"
import Main from "./components/Main"
import Side_bar from "./components/Side_bar"
import NavBar from "./components/NavBar"

import APOD from "./components/APOD"
import Home from "./components/Home"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import HomeVideo from "./components/NasaVideo/HomeVideo"
import VideoPreview from "./components/NasaVideo/VideoPreview"
import bgVideo from "./assets/earth-bg.mp4"

function App() {
  const [showModal, setShowModal] = useState(true)
  return (

    <div className="h-screen relative">
      <video
        autoPlay
        loop
        muted
        className="fixed right-0 top-0 h-screen w-full object-cover z-[-1]"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <BrowserRouter>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/apod" element={<APOD />} />
            <Route path="/homevideo" element={<HomeVideo />} />
            {/* <Route path="/videopreview" element={<VideoPreview />} /> */}
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>

  )
}

export default App
