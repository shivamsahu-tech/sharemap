import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import io from "socket.io-client";
import { useSocket } from './useSocket.js';

function Test() {
 

  const [joincode, setJoinCode] = useState();
  const [name, setName] = useState()
  const [key, setKey] = useState();
  const [value, setValue] = useState();
  const [locationData, setLocationData] = useState({"key": "value"});

  const {socketRef, joinRoom} = useSocket()
  
  const joinGroup = () => {
    joinRoom(joincode)
    console.log('joinGroup Method runs successfully')
  }


  const addlocationData = () => {
    // first make a bundle

    const obj = {
      name: name,
      lat: key,
      long: value,
      isActive: true
    }

    const payload = {
      locationData: obj,
      roomId: joincode
    }

    socketRef.current.emit("up_location", payload)

    console.log("addlocationData method runs successfully")



  }


  
  return (
    <>
      <div
      className=' w-full h-full flex justify-center items-center'
       >


      <input type="text"
      value={joincode}
      onChange={(e) => (setJoinCode(e.target.value))}
      className=' border-2 border-black'
       />
      <button
      className=' bg-blue-500 p-1 m-2'
      onClick={joinGroup}
      >joinRoom</button>

      <br />

      <input type="text"
      value={name}
      onChange={(e) => (setName(e.target.value))}
      className=' border-2 border-black'
       />
      <input type="text"
      value={key}
      onChange={(e) => (setKey(e.target.value))}
      className=' border-2 border-black'
       />
       <input type="text"
      value={value}
      onChange={(e) => (setValue(e.target.value))}
      className=' border-2 border-black'
       />
       
      <button
      className=' bg-blue-500 p-1 m-2'
      onClick={addlocationData}
      >add values</button>

      </div>

      <div
      className='m-32'
      >
             <ul>
      {
        Object.entries(useSelector(state => state.locations.group)).map(([key, value]) => (
          <li key={key}>
            {key} : 
            {
              value.isActive ? (
                <div>
                  {
                    Object.entries(value).map(([k, v]) => (
                    (
                        <span key={k}>{k} : {v}, </span>
                      )
                    ))
                  }
                </div>
              ) : (
                <span>Inactive</span>
              )
            }
          </li>
        ))
      }
    </ul>
      </div>
    </>
  );
}

export default Test;
