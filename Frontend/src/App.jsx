import { useState } from "react"
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom"
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"

import APOD from "./components/APOD"
import Home from "./components/Home"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import HomeVideo from "./components/NasaVideo/HomeVideo"
import VideoPreview from "./components/NasaVideo/VideoPreview"
import bgVideo from "./assets/earth-bg.mp4"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(true)

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

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
          <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="/apod" element={<APOD />} />
              <Route path="/homevideo" element={<HomeVideo />} />
              <Route path="/videopreview" element={<VideoPreview />} />

            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App
