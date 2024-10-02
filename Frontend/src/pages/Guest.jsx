import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerVisFunc } from '../features/visibilitySlice'
import { useParams } from 'react-router-dom'
import {Header, Page1, Page2, Page3, Footer, Login, Register, Join, Popup} from "../index.jsx"
import { setGuest, setJoinCodeURL } from '../features/locationSlice'


function Guest() {

    const {joinCode} = useParams()
    // if(!(joinCode.includes("sh") && joinCode.length == 12 ))
    console.log(joinCode)
    const dispatch = useDispatch()
    const user = useSelector(state => state.locations.user)


   useEffect(() => {
    if(!user)    dispatch(registerVisFunc())
       dispatch(setGuest())
       dispatch(setJoinCodeURL({
        joinCode: joinCode, 
        joinURL :`${import.meta.env.VITE_FRONTEND_URL}/jxcd/${joinCode}` }))
   },[dispatch])



  return (

    true || (joinCode.includes("sh") && joinCode.length == 12 ) ? (<> 
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
        
    </> )  : (
        <div className='text-3xl font-bold text-center  mt-[25%] ' >
            Invalid URL
        </div>
    )
  )
}

export default Guest
