import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { joinVisFunc, popupData, popupVisFunc } from '../../features/visibilitySlice'
import { useNavigate } from 'react-router-dom'
import { setMyName } from '../../features/locationSlice'
import Popup from '../Popup/Popup'
import Button from '../Button/Button'
import { useSocket } from '../../useSocket'

function Join() {

  const dispatch = useDispatch()
   const {leaveRoom} =  useSocket()

  const x_clicked = () => {
    dispatch(joinVisFunc())
  }

  const navigate = useNavigate();

  const joinMapBtn = () => {
    // setMyName
    dispatch(joinVisFunc())
    navigate("/map")
    
  }

  

  const joincode =  useSelector(state => state.locations.joinCode)
  const joinurl = useSelector(state => state.locations.joinURL)
  const user = useSelector(state => state.locations.user)

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
  
    const copyCodeBtn = () => {
      navigator.clipboard.writeText(joincode)
      showPopup("Copied to Clipboard", "blue")
    }

    const copyUrlBtn = () => {
      navigator.clipboard.writeText(joinurl)
      showPopup("Copied to Clipboard", "blue")
    }

    useEffect(() => {
      
      const lastPage = localStorage.getItem("lastVisitedPage")
      if(lastPage === "map"){
        // console.log("room leaved from map")
        leaveRoom(joincode, user)
      }
      localStorage.removeItem("lastVisitedPage")
  }, [location]);

  return (
    <>
    <Popup/>
    <div className={` join popup ${useSelector(state => state.visibility.joinVisibility)}`}  >  
      <div 
          className=' rounded-md card flex flex-col justify-between bg-[#ced4da] items-center relative' 
          >
              <span className=' text-2xl hover:cursor-pointer absolute right-2' 
              onClick={x_clicked}
              >×</span>

            <div className='text-3xl font-bold mt-5 flex flex-col items-center' >
             <img className='w-16' src="https://res.cloudinary.com/dfl8h4on4/image/upload/v1727085429/share_akcqet.png" alt="" />
            <h1 className='text-base font-thin' >share it with friends.🙂</h1>
             </div>


              <div 
              className='w-full pt-6 pb-10 px-10' 
              >

                <div className=' bg-white px-3 py-2 rounded-2xl mt-4 text-[#394958] flex flex-col justify-center items-start border-2 ' >
                      <h2 
                      className='text-xl font-semibold' 
                      >Join URL</h2>
                      <div className='w-full flex ' >
                          <input 
                          type="text"
                          value={joinurl}
                          disabled
                          className='flex-1 w-[80%] border-b-2 border-black focus:outline-none bg-transparent mr-1 px-2  text-[#282c30] ' 
                          spellCheck={false}
                          />
                          <i class="fa-solid fa-copy text-xl hover:cursor-pointer"
                          onClick={copyUrlBtn}
                          ></i>
                      </div>
                </div>


                <div className=' bg-white px-3 py-2 rounded-2xl mt-4 text-[#394958] flex flex-col justify-center items-start border-2 ' >
                      <h2 
                      className='text-xl font-semibold' 
                      >Join Code</h2>
                      <div className='w-full flex ' >
                          <input 
                          type="text"
                          value={joincode}
                          disabled
                          className='flex-1 w-[80%] border-b-2 border-black focus:outline-none bg-transparent mr-1 px-2  text-[#282c30] ' 
                          spellCheck={false}
                          />
                          <i class="fa-solid fa-copy text-xl hover:cursor-pointer"
                          onClick={copyCodeBtn}
                          ></i>
                      </div>
                </div>

                <Button method={joinMapBtn} title={"Join Map"} bgc={"bg-[#0276FF]"} />



              </div>

              

                
        {/* <div 
        className=' rounded-md card flex flex-col justify-between bg-slate-500 items-center' 
        >
             <span className='x text-xl hover:cursor-pointer'
             onClick={x_clicked}
              >×</span>

             <h1 className='text-2xl font-bold mt-2' >Join Credentials</h1>

             <div 
             className='w-full p-8 input ' 
             >
                <div>
                    <h2 
                    className='text-xl font-semibold py-2 -mx-2' 
                    >Group URL:</h2>
                    <input 
                    disabled
                    value={joinurl}
                    className='-ml-3 p-1.5 px-2 bg-white text-blue-800 border-l-2 border-t-2 border-b-2 border-black focus:outline-none rounded-s-md w-auto '
                    type="text" 
                    />

                    <button 
                    className='p-1.5 px-3 text-white rounded-e-md border-t-2 border-r-2 border-b-2 mb-2 border-black'
                    onClick={copyUrlBtn}
                    >copy</button>
                </div>

                <div>
                    <h2 
                    className='text-xl font-semibold py-2 -mx-2' 
                    >Group Code:</h2>
                    <input 
                    disabled
                    value={joincode}
                    className='-ml-3 p-1.5 px-2 border-l-2 border-t-2 border-b-2 text-blue-800 bg-white border-black focus:outline-none rounded-s-md w-auto '
                    type="text" 
                    />

                    <button 
                    className='p-1.5 px-3 text-white rounded-e-md border-t-2 border-r-2 border-b-2 border-black'
                    onClick={copyCodeBtn}
                    >copy</button>
                </div>
                

             </div>

            <button
            className=' text-white text-xl font-semibold p-1 px-8 rounded-md btn-login mb-4'
            onClick={joinMapBtn}
            >Join Map</button>
                */}
        </div> 
    </div> 

    </>
  )
}

export default Join
