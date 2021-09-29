import { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
// import { io } from "socket.io-client";

import Marker from "../../components/Marker";
import { SpinnerDotted } from "spinners-react";

const HomePage = (props) => {
  // let socket = io(process.env.REACT_APP_API_URL);
  const { authToken, actualCoords } = props;

  const [mapLoading, setMapLoading] = useState(true);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (actualCoords.latitude && actualCoords.longitude) {
      const fetchData = async () => {
        const responseLocation = await axios.post(
          `${process.env.REACT_APP_API_URL}location/around?latitude=${actualCoords.latitude}&longitude=${actualCoords.longitude}`
        );
        setMarkers(responseLocation.data.data);
      };
      fetchData();
      setMapLoading((x) => false);
    } else {
      setMapLoading((x) => true);
    }
  }, [actualCoords, authToken]);

  return (
    <div className="home-page">
      <h1>Home</h1>
      <div>
        <div className="map-container">
          {mapLoading ? (
            <SpinnerDotted color="orange" enabled={true} />
          ) : (
            <div className="map">
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_GOGGLE_KEY,
                }}
                center={{
                  lat: actualCoords.latitude,
                  lng: actualCoords.longitude,
                }}
                defaultZoom={18}
                options={{ gestureHandling: "none", disableDefaultUI: true }}
              >
                {/* <Marker
                  text="my"
                  latitude={coords.latitude}
                  longitude={coords.longitude}
                /> */}

                {markers.map((marker, index) => {
                  return (
                    <Marker
                      key={index}
                      text={marker.email}
                      latitude={marker.location[1]}
                      longitude={marker.location[0]}
                    />
                  );
                })}
              </GoogleMapReact>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
