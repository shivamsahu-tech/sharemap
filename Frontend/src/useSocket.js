// useSocket.js
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { clearMessage, setMessage, updateGroup} from './features/locationSlice.js';
import { decryptData, encryptData } from './Crypto.js';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export function useSocket() {
  const [locationData, setLocationData] = useState({});
  const socketRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    socketRef.current = io(SERVER_URL);

    socketRef.current.on('connect', () => {
      console.log("A User Connected");
    });

    socketRef.current.on("down_location", (encryptedData) => {
      // console.log("we reached here")
      // console.log(`Received Data: `, data);
      // here dispatch to the location
      console.log("received data: ",encryptedData)
      try {
        const data = decryptData(import.meta.env.VITE_SECRET_KEY, encryptedData); // Decrypt the data
        console.log("decrypted data: ", data); // Log decrypted data
        dispatch(updateGroup(data)); // Update the state with the decrypted data
      } catch (error) {
          console.error("Decryption failed:", error); // Handle errors
      }

    });


    socketRef.current.on("down_message", (data) => {
      console.log(data)
      dispatch(setMessage(data))
      setTimeout(() => {
        dispatch(clearMessage(data))
      }, 5000);
    })

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const joinRoom = (roomId, user) => {
    socketRef.current.emit("joinRoom", {
      roomId, 
      user
    });
    console.log("joinRoom function called successfully");
  };

  const leaveRoom = (roomId, user) => {
    socketRef.current.emit("leaveRoom", {
      roomId, 
      user
    });
    console.log("leaveRoom function called successfully");
  };



  return {
    joinRoom,
    leaveRoom,
    socketRef
  };
}
