import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerVisFunc, loginVisFunc, popupData, popupVisFunc, joinVisFunc} from '../../features/visibilitySlice'
import { setMyName, setAccessAndRefreshToken } from '../../features/locationSlice.js'
import Input from '../Input/Input.jsx'
import Button from '../Button/Button.jsx'
import { useSocket } from '../../useSocket.js'

function Login() {

  const dispatch = useDispatch()
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setLoading] = useState(false)
  const isGuest = useSelector(state => state.locations.isGuest)
  const {leaveRoom} =  useSocket()
  const joinCode = useSelector(state => state.locations.joinCode)
  const user = useSelector(state => state.locations.user)

  const x_clicked = () => {
    dispatch(loginVisFunc())
  }



  const registerClicked = () => {
    dispatch(loginVisFunc())
    dispatch(registerVisFunc())
    setLoading(false)
    // setTitle("Log in")
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

  useEffect(() => {
      
    const lastPage = localStorage.getItem("lastVisitedPage")
    if(lastPage === "map"){
      // console.log("room leaved from map")
      leaveRoom(joinCode, user)
    }
    localStorage.removeItem("lastVisitedPage")
}, [location]);

 

  const submit = async() => {
    setLoading(true)
  //  setTitle("")
    const obj = {
      username: username,
      password: password,
    };
    try {
      
        const response = await fetch( `${import.meta.env.VITE_SERVER_URL}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
      
        const data = await response.json();
        // console.log("data login", data)
        if(data.success){
          if(isGuest) dispatch(joinVisFunc())
          showPopup("Welcome to ShareMap🫡", "green")
          dispatch(setMyName(data.data.user.name))
          dispatch(setAccessAndRefreshToken({
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken
          }))
      
         
        } else {
          showPopup(data.message, "red")
        }
        
    } catch (error) {
      showPopup("something went wrong!🥹", "red")
    }
    setUserName("")
    setPassword("")
    x_clicked()    
    setLoading(false)
  }

  return (

    <div className={` login popup ${useSelector(state => state.visibility.loginVisibility)} `} >  
        <div 
        className=' rounded-md card flex flex-col justify-between bg-[#ced4da] items-center relative' 
        >
             <span className=' text-2xl hover:cursor-pointer absolute right-2' 
             onClick={x_clicked}
             >×</span>

            <div className='text-3xl font-bold mt-5 flex flex-col items-center' >
             <img className='w-16' src="https://res.cloudinary.com/dfl8h4on4/image/upload/v1727085429/share_akcqet.png" alt="" />
            <h1 className='text-base font-thin' >Welcome Again!🤓</h1>
             </div>


             <div 
             className='w-full pt-6 pb-10 px-10' 
             >

                <Input label={"Username"} value={username} type={"text"} method={setUserName} placeholder={"username123"} iconClass={"fa-solid fa-user"} />
                <Input label={"Password"} value={password} type={"password"} method={setPassword} placeholder={"hc4iuybw34"} iconClass={"fa-solid fa-lock"} />
                <Button method={submit} title={"Log in"}  isLoading={isloading} bgc={"bg-[#0276FF]"} />

             </div>

             

                <p
                className=' text-blue-700 text-xs px-1  hover:cursor-pointer hover:font-semibold hover:transition-all absolute right-1 bottom-1'       
                onClick={registerClicked}
                >signup
                </p>
        </div>
    </div> 

  )
}

export default Login
