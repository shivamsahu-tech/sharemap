import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerVisFunc, loginVisFunc, popupData, popupVisFunc} from '../../features/visibilitySlice'
import { setMyName, setAccessAndRefreshToken } from '../../features/locationSlice.js'
import { useSocket } from '../../useSocket.js';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button.jsx';

function Header() {

  const dispatch = useDispatch();
  const {leaveRoom} = useSocket()
  const joinCode = useSelector(state => state.locations.joinCode)
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)

  const startedBtn = () => {
    dispatch(registerVisFunc())
  }

  const showPopup = (message, color) => {
    dispatch(popupData({
      message: message,
      color: color
    }))
    setTimeout(() => {
      dispatch(popupVisFunc())
    }, 3000);
    dispatch(popupVisFunc())
  }

  const accessToken = useSelector(state => state.locations.accessToken)
const user  = useSelector(state => state.locations.user)

  const logout = async() => {
    setLoading(true)
    try {

      const obj = {
        accessToken: accessToken,
      }
      
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/logout`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
        },
          body: JSON.stringify(obj)
        });
        
        const data = await response.json();     
        

        if(data.success){
          leaveRoom(joinCode, user)
          navigate("/")
          showPopup(data.message, "green")
          dispatch(setMyName(""))
          dispatch(setAccessAndRefreshToken({
            accessToken: "",
            refreshToken: "",
          }))          
         
        } else {
          showPopup(data.message, "red")
        }
        
    } catch (error) {
      showPopup("something went wrong!", "red")
    }
    setLoading(false)
  }

  


  const loginBtn = async() => {
    if(!user)
    dispatch(loginVisFunc())
    else{
      await logout()
    }
  }
 

  return (
    <div className='header w-full flex items-center justify-between p-4 text-white   '>
      <div className='text-3xl font-bold hover:cursor-pointer'
      onClick={() => {navigate('/')}}
       >
        ShareMap
      </div>
      <div className='button' >


        <button className='text-xk font-semibold hover:font-bold '
        onClick={loginBtn}
        >{
          !isLoading ? (
              <p>{user ? "log out" : "log in"}</p>
          ) : (
              <i class="fa-solid fa-spinner fa-spin"></i>
          )
      }</button>

        <button className={`text-xl rounded-md font-semibold getstarted 
        hover:cursor-pointer ${useSelector(state => state.locations.user) ? "pointer-events-none" : ""} `}
         onClick={startedBtn}
         >{useSelector(state => state.locations.user) || "Get Started"}</button>
      </div>
    </div>
  )
}

export default Header
