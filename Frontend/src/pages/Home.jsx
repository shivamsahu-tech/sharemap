import React, { useEffect } from 'react'
import {Header, Page1, Page2, Page3, Footer, Login, Register, Join, Popup} from "../index.jsx"
import { useLocation } from 'react-router-dom';
import { useSocket } from '../useSocket.js';
import { useSelector } from 'react-redux';


function Home() {

  const location = useLocation();
  const {leaveRoom} = useSocket()
  const joinCode = useSelector(state => state.locations.joinCode)
  const user = useSelector(state => state.locations.user)

  useEffect(() => {
      
      const lastPage = localStorage.getItem("lastVisitedPage")
      if(lastPage === "map"){
        console.log("room leaved from map")
        leaveRoom(joinCode, user)
      }
      localStorage.removeItem("lastVisitedPage")
  }, [location]);


  
  return (
    <> 
        <Join/>
        <Login  />
        <Register />
        <Popup/>
        <div  style={{ position: "sticky", zIndex: 4, top: 0 }} >
        <Header/>
        </div>
        <div className='w-full flex justify-center' >
            <Page1/>
        </div>

        <div className='w-full flex justify-center' >
            <Page2/>
        </div>

        <div className='w-full flex justify-center' >
            <Page3/>
        </div>

        

        <Footer/>
        
    </>
  )
}

export default Home
