import React, { useState, useEffect, useRef } from 'react'
import {Header, MapComponent, Popup} from '../index'
import { useDispatch, useSelector } from 'react-redux'
import locationSlice, {removeUser, resetGroup, setMyLoc, setMyName} from '../features/locationSlice'
import { useSocket } from "../useSocket.js"
import { popupData, popupVisFunc } from '../features/visibilitySlice.js'
import { useNavigate } from 'react-router-dom'
import { encryptData } from '../Crypto.js'


function Map() {

    const [map, setMap] = useState("satelite")
    const [mapLayer, setMapLayer] = useState("https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg")
    const [popupShown, setPopupShown] = useState(true)
    const [joinFlag, setJoinFlag] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector(state => state.locations.user)
    const [msg, setMsg] = useState("")
    const joinURL = useSelector(state => state.locations.joinURL)
    

    const changeLayer = (event) => {
        setMap(event.target.value)
        event.target.value == "satelite" ? setMapLayer("https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg") : setMapLayer("https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png")
        
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
   
    // placed geolocation here
    const {socketRef, joinRoom, leaveRoom} = useSocket();
    const name = useSelector(state => state.locations.user)
    const joinCode = useSelector(state => state.locations.joinCode)



    

    const sendMsg = () => {
        const obj = {
            name: user,
            message: msg,
        }
        // console.log(obj)

        socketRef.current.emit("up_message", {
            roomId: joinCode,
            data: obj,
        });
        showPopup("message sent", "blue")
        setMsg("")
    }

    const leaveRoomBtn = () => {
        leaveRoom(joinCode, name)
        dispatch(resetGroup())
        navigate("/")
    }

    const copyCodeBtn = () => {
        showPopup("Copied To Clipboard", "blue")
        navigator.clipboard.writeText(joinCode)
    }

    const copyURLBtn = () => {
        showPopup("Copied To Clipboard", "blue")
        navigator.clipboard.writeText(joinURL)
    }

    useEffect(() => {
        window.addEventListener("beforeunload", alertUser);
        return () => {
          window.removeEventListener("beforeunload", alertUser);
        };
    }, []);
      
    const alertUser = (e) => {
          leaveRoom(joinCode, name)
          dispatch(resetGroup())
    };

    

    // joining the room
    useEffect(() => {
        localStorage.setItem("lastVisitedPage", "map")
        if (joinCode && joinFlag) {
          joinRoom(joinCode, name);
          setJoinFlag(false)
        }
        // 
      }, [joinCode, joinRoom]);


      useEffect(() => {
        const handleUserJoin = (user) => {
            showPopup(`${user} join the room`, "blue");
        };
    
        const handleUserLeave = (user) => {
            showPopup(`${user} left the room`, "blue");
            console.log("user room leaved")
            dispatch(removeUser(user))
        };
    
        socketRef.current.on("userJoin", handleUserJoin);
        socketRef.current.on("userLeave", handleUserLeave);
    
        // Cleanup event listeners on component unmount
        return () => {
            socketRef.current.off("userJoin", handleUserJoin);
            socketRef.current.off("userLeave", handleUserLeave);
        };
    }, [socketRef, useSocket]);
    

    
    useEffect(() => {
        if (user) {
            if (!navigator.geolocation) {
                console.error('Geolocation is not supported by this browser.');
                return;
            }
    
            if (popupShown) {
                showPopup("Wait A while...", "blue");
                setPopupShown(false);
            }
    
            const successCallback = (livePosition) => {

                const locationData = {
                            name: name,
                            lat: livePosition.coords.latitude,
                            long: livePosition.coords.longitude,
                            isActive: true,
                        };

                dispatch(setMyLoc({
                    lat: livePosition.coords.latitude,
                    long: livePosition.coords.longitude,
                }));
    
                const payload = {
                    locationData: encryptData(import.meta.env.VITE_SECRET_KEY, locationData),
                    roomId: joinCode
                };
 
                // console.log(payload)
                socketRef.current.emit('up_location', payload);
            };
    
            const errorCallback = (error) => {
                const locationData = {
                    name: name,
                    lat: -1,
                    long: -1,
                    isActive: false,
                };
                console.error('Error on location sharing:', error);
                socketRef.current.emit('up_location', locationData);
            };
    
            // Start watching the position
            const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, {
                enableHighAccuracy: true
            });
    
            return () => {
                // Stop watching the position
                navigator.geolocation.clearWatch(watchId);
            };
        } else {
            showPopup("Login First", "red");
        }
    }, [dispatch, name, socketRef, joinCode]);
    


    const mapRef = useRef();


    const username = useSelector(state => state.locations.user)
    const locationObj = useSelector(state => state.locations.group)[username]

    const flyOnMap = () => {
        if(!user){
            showPopup("Login First", "red")
            return
        }
        if(mapRef.current){
            mapRef.current.flyTo([locationObj.lat, locationObj.long], 18)
        }
    }


    

  return (

    <>
    <Popup/>
    <div className='lex-col justif-start map-maze' >
        
       

        <Header />

        <div className=' w-11/12 border-2 m-auto mt-5 rounded-md map  relative z-0 h-[70%]'>

             <select
             className='select-map border-2 border-black rounded-md '
             value={map}
             onChange={changeLayer}
              >
                <option value="satelite">Satelite Map</option>
                <option value="openstreet">Open Street Map</option>
             </select>

             <div
             className='my-loc hover:cursor-pointer'
             onClick={flyOnMap}
             > 
             <img src="https://res.cloudinary.com/dfl8h4on4/image/upload/v1723547535/target_daphlx.png" alt="" />
             </div>


             <MapComponent mapLayer={mapLayer}  mapRef={mapRef}/>

             

        </div>
    
        <div className=' w-11/12 m-auto mt-5 map-btn flex-wrap flex' >
           <div className='mb-2' >
           <button 
            onClick={leaveRoomBtn}
            className='p-2 px-3 text-white rounded-md'
            >
                <i class="fa-solid fa-right-from-bracket"></i> Leave
            </button>
            <button
            onClick={copyCodeBtn}
            className='p-2 px-3 ml-3 text-white rounded-md bg-[#305BCA]'
            >
                <i class="fa-solid fa-copy"></i> Code
            </button>
            <button
            onClick={copyURLBtn} 
            className='p-2 px-3 mx-3 text-white rounded-md bg-[#305BCA] '
            >
                <i class="fa-solid fa-copy"></i> URL
            </button>
           </div>


           <div className=' bg-slate-300 border-2 border-white text-[#282c30] rounded-md flex items-center gap-2 py-2 px-5 mb-2' >
                <input type="text"
                className='bg-transparent border-b-2 border-[#282c30] px-2 outline-none '
                spellCheck="false"
                placeholder='send message'
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                 />
                <i class="fa-solid fa-paper-plane text-md hover:cursor-pointer"
                onClick={sendMsg}
                ></i>
            </div>
        </div>

    </div>


    </>
  )
}

export default Map
