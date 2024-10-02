import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.min.js';
import { useSelector } from 'react-redux';


const png = "https://res.cloudinary.com/dfl8h4on4/image/upload/v1727010083/location_2_bxhejq.png"

const createCustomMarker = (name, msg) => {
       return L.divIcon({
      className: 'custom-marker', // You can add custom CSS for styling
      html: ` 
      <div class="w-[6vh] h-[6vh] relative " >
           <div class=" flex flex-col justify-center items-center absolute bottom-[200%]  transform translate-x-[-50%]" >
                <div class=" bg-yellow-50 font-semibold px-1 h-auto text-center rounded-b-xl  leading-0 text-red-500" >${msg}</div> 
                <div class="  px-2 border-neutral-700 bg-yellow-100 rounded-md font-bold text-md">${name}</div>
           </div>     
            <div>
              <img style='width:6vh; '  class=' absolute  bottom-[100%] right-[48%] ' src=${png} alt="Location Icon" />
            </div>
        </div>
      `,
      iconSize: [100, 50], 
      iconAnchor: [0,0],
    });
  };
  



const MapEvents = ({ mapRef }) => {
    const map = useMap();
    useEffect(() => {
        mapRef.current = map; 
    }, [map, mapRef]);
    return null;
};

function MapComponent({ mapLayer, mapRef }) {
    const mapTilerKey = "A7ggsa5XFdC8i2v2pyJz";
    const group = useSelector(state => state.locations.group);
   const user = useSelector(state =>  state.locations.user)

    
    const messages = useSelector(state => state.locations.messages)
    return (
        <>
        {/* <Popup/> */}
        <MapContainer
        
            center={[26, 82]}
            zoom={8}
            style={{ height: "100%", width: "100%"}}
            whenReady={(mapInstance) => {mapRef.current = mapInstance; }}
        >
            <TileLayer
                url={`${mapLayer}?key=${mapTilerKey}`}
            />

            {
                Object.keys(group).map(key => {
                    const { lat, long, name, isActive } = group[key];
                    
                    const msg = messages[name] || ""
                    
                    return user!=name ? (
                        <Marker
                            key={key}
                            position={[lat, long]}
                            icon={createCustomMarker(name, msg)}
                        >
                        </Marker>
                    ) : (
                        <Marker
                            key={key}
                            position={[lat, long]}
                            icon={createCustomMarker("you", msg)}
                        >
                        </Marker>
                    )
                })
            }

        <MapEvents mapRef={mapRef} /> 
        </MapContainer>

        </>
    );
}

export default MapComponent;
