import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { joinVisFunc, popupData, popupVisFunc, registerVisFunc} from '../../features/visibilitySlice'
import { useSocket } from '../../useSocket.js';
import { setJoinCodeURL } from '../../features/locationSlice.js';

function Page2() {

    const dispatch = useDispatch()
    const {joinRoom} = useSocket()

    const user = useSelector(state => state.locations.user)

    const [joinCode, setJoinCode] = useState("")

    function generateStringWithSH() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const shPosition = Math.floor(Math.random() * 9); // Position to insert "sh"
        
        let randomString = '';
        for (let i = 0; i < 10; i++) {
            randomString += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    
        // Insert "sh" at a random position in the 10-character string
        const finalString = randomString.slice(0, shPosition) + 'sh' + randomString.slice(shPosition);
        
        return finalString;
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

      const isGuest = useSelector(state => state.locations.isGuest)

    const createGroupBtn = () => {
        if(isGuest){
            showPopup("it will create new group", "blue")
        }
        if(!user){
            // go on sign in page
            dispatch(registerVisFunc())
        }
        else {
            let code = generateStringWithSH()
            const url =  `${import.meta.env.VITE_FRONTEND_URL}/jxcd/${code}`
            joinRoom(code)
            dispatch(setJoinCodeURL({
                joinCode: code,
                joinURL: url
            }))
            dispatch(joinVisFunc())
        }
    }

    const joinGroupBtn = () => {
        if(!user){
            // go on sign in page
            dispatch(registerVisFunc())
        } 
        else {
            if(!(joinCode.includes("sh") && joinCode.length == 12 )){
                showPopup("Invalid Join Code!", "red")
                return
            }
            dispatch(setJoinCodeURL({
                joinCode: joinCode,
                joinURL: `${import.meta.env.VITE_FRONTEND_URL}/jxcd/${joinCode}`
            }))
            dispatch(joinVisFunc())
        }
    }

  return (
    <div className='w-10/12 rounded-md   mt-6 flex justify-between page2' >
      
        <div className='h-full w-5/12 bg-slate-300 p-16 py-32' >
            <h1 
            className='text-5xl font-bold'
            >Create Group:</h1>
            
            <button 
            className=' mt-7 btn-click text-xl text-white font-semibold p-1.5 px-3 rounded-md' 
            onClick={createGroupBtn}
            >Click Here!</button>

            <p 
            className=' mt-12 text-justify' 
            >
                <strong>Start Your Journey Together! </strong><br />
               First step to sharing your adventures and staying connected with friends and family.  Simply tap on the “Create Group” button to instantly generate a unique join code and URL. This code and URL are your keys to inviting others.</p>

            <p 
            className='mt-10' 
            >
                Share these with your friends and family so they can join your group and start adventuring on the same map. </p>
        </div>

        <div className='h-full w-5/12 bg-slate-300 p-20 py-32' >
            <h1 
            className='text-5xl font-bold' 
            >Join Group:</h1>

            <div 
            className=' mt-5 text-xl p-1.5 px-3 rounded-md flex' 
            >
                <input 
                className='-ml-3 p-1.5 px-2 border-l-2 border-t-2 border-b-2 border-black focus:outline-none rounded-s-md '
                type="text" 
                placeholder='Enter join code here'
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                />

                <button 
                className='p-1.5 px-3 text-white rounded-e-md border-t-2 border-r-2 border-b-2 border-black'
                onClick={joinGroupBtn}
                >Join</button>
            </div>
            <p 
            className=' mt-10 text-justify' 
            >
                <strong>Join the Adventure!</strong> <br />
                Joining a group on ShareMap is easy and seamless. Simply paste your join code into the provided field, and a card will be generated containing both the URL and the join code. This card is your gateway to inviting others.
            </p>

            <p 
            className='mt-10' 
            >
                Share this card with your friends and family so they can join your group and start adventuring together on the same map.</p>
        </div>

    </div>
  )
}

export default Page2
