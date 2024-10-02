import { useState } from 'react'
import './App.css'
import {Map, Home} from './index'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Guest from './pages/Guest';

function App() {

 const leaveRoomFun = () => {
  console.log("it is working")
 }


  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />}  onLeave={leaveRoomFun} />
        <Route path="/jxcd/:joinCode" element={<Guest />} />
      </Routes>
    </Router>
  )
}

export default App
