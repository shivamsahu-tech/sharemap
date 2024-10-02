import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useSocket } from "./useSocket.js"





export const useGeolocation = () => {

    const {socketRef} = useSocket();

    useEffect(() => {

        
        const name = useSelector(state => state.locations.user) || "unknown"

        if(navigator.geolocation){

            const watchId = navigator.geolocation.watchPosition((livePosition) => {

                const locationData = {
                    name: name,
                    lat: livePosition.coords.latitude,
                    long: livePosition.coords.longitude,
                    isActive: true,
                }

                console.log(locationData)

                socketRef.current.emit("up_location", locationData)

            },
            (error) => {

                const locationData = {
                    name: name,
                    lat: -1,
                    long: -1,
                    isActive: false,
                }
                console.error("error on location sharing : ", error)
                socketRef.current.emit("up_location", locationData)
            },
            {
                enableHighAccuracy: true
            }
        )

        return () => {
            navigator.geolocation.clearWatch(watchId)
        }
    }

    }, [])

}