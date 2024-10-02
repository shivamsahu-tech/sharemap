import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerVisFunc, loginVisFunc, popupData, popupVisFunc, joinVisFunc} from '../../features/visibilitySlice'
import { setMyName, setAccessAndRefreshToken, setGuest } from '../../features/locationSlice.js'
import Input from '../Input/Input.jsx'
import Button from '../Button/Button.jsx'
import { useSocket } from '../../useSocket.js'

function Register() {

  const dispatch = useDispatch()
  const joinCode = useSelector(state => state.locations.joinCode)
  const user = useSelector(state => state.locations.user)
  const {leaveRoom} =  useSocket()

  useEffect(() => {
      
    const lastPage = localStorage.getItem("lastVisitedPage")
    if(lastPage === "map"){
      // console.log("room leaved from map")
      leaveRoom(joinCode, user)
    }
    localStorage.removeItem("lastVisitedPage")
}, [location]);



  useEffect(() => {
      
    const lastPage = localStorage.getItem("lastVisitedPage")
    if(lastPage === "map"){
      // console.log("room leaved from map")
      leaveRoom(joinCode, user)
    }
    localStorage.removeItem("lastVisitedPage")
}, [location]);  

  const x_clicked = () => {
    dispatch(registerVisFunc())
  }

  const loginClicked = () => {
    dispatch(loginVisFunc())
    dispatch(registerVisFunc())
    // setBtnText("Sign in")
    setLoading(false)
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

  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setLoading] = useState(false)
  const isGuest = useSelector(state => state.locations.isGuest)

  

  const submit = async() => {
    //  setBtnText("Loading...")
     setLoading(true)
     if(name == "you"){
      showPopup("This name is not allowed", "red")
      setUserName("")
      setPassword("")
      setName("")
      x_clicked();
      // setBtnText("Sign in").
      setLoading(false)
      return
     }
    const obj = {
      username: username,
      name: name,
      password: password,
    };
    
    try {

        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        
        const data = await response.json();
       
        if(data.success){

          showPopup("Welcome to ShareMap🫡", "green")
          if(isGuest) dispatch(joinVisFunc())


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
    setName("")
    x_clicked();
    // setBtnText("Sign in")
    setLoading(false)
  }

  
  return (
    <div className={`register popup ${useSelector(state => state.visibility.registerVisibility)}`} > 


    <div 
        className=' rounded-md card flex flex-col justify-between bg-[#ced4da] items-center relative' 
        >
             <span className=' text-2xl hover:cursor-pointer absolute right-2' 
             onClick={x_clicked}
             >×</span>

             <div className='text-3xl font-bold mt-5 flex flex-col items-center' >
             <img className='w-16' src="https://res.cloudinary.com/dfl8h4on4/image/upload/v1727085429/share_akcqet.png" alt="" />
            <h1 className='text-base font-thin' >nice to meet you dear! 🙂</h1>
             </div>


             <div 
             className='w-full pt-8 pb-10 px-12' 
             >
              {/* <i class=""></i> */}

                <Input label={"Name"} value={name} type={"text"} method={setName} placeholder={"xyz"} iconClass={"fa-regular fa-address-card"} />
                <Input label={"Username"} value={username} type={"text"} method={setUserName} placeholder={"username123"} iconClass={"fa-solid fa-user"} />
                <Input label={"Password"} value={password} type={"password"} method={setPassword} placeholder={"hc4iuybw34"} iconClass={"fa-solid fa-lock"} />
                <Button method={submit} title={"Sign in"} isLoading={isloading} bgc={"bg-[#0276FF]"} />

             </div>

            
                <p
                className=' text-blue-700 text-xs px-1  hover:cursor-pointer hover:font-semibold hover:transition-all absolute right-1 bottom-1'       
                onClick={loginClicked}
                >login
                </p>
        </div>





  
    </div> 
  )
}

export default Register
