import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import axios from "axios";
// import { io } from "socket.io-client";

import Marker from "../../components/Marker";

const HomePage = (props) => {
  let history = useHistory();

  // let socket = io(process.env.REACT_APP_API_URL);
  const { authToken, handleLogin, handleLogOut, coords } = props;

  const [mapLoading, setMapLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      const fetchData = async () => {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}location/around?latitude=${coords.latitude}&longitude=${coords.longitude}`
        );
        setMarkers(response.data.data);
        console.log(response.data.data);
      };
      fetchData();
      setMapLoading((x) => false);
    } else {
      setMapLoading((x) => true);
    }
  }, [coords, authToken]);

  const handleEmailChange = (event) => setEmail((x) => event.target.value);
  const handlePasswordChange = (event) =>
    setPassword((x) => event.target.value);

  const onSubmitClick = async (event) => {
    try {
      event.preventDefault();
      const field = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}user/login`,
        field
      );
      if (response.status === 200) {
        handleLogin(response.data.data.token);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="home-page">
      <h1>accueil</h1>
      <p>
        {coords.longitude} {coords.latitude}
      </p>
      <div>
        <div className="map-container">
          {mapLoading ? (
            <p>map loading</p>
          ) : (
            <div className="map">
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_GOGGLE_KEY,
                }}
                center={{
                  lat: coords.latitude,
                  lng: coords.longitude,
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
        {authToken ? (
          <button onClick={handleLogOut}>Se déconnecter</button>
        ) : (
          <form onSubmit={onSubmitClick} className="connect">
            <p>
              se connecter/{" "}
              <span onClick={() => history.push("user/sign-up")}>
                s'inscrire
              </span>
            </p>
            <input
              onChange={handleEmailChange}
              type="email"
              placeholder="email"
              value={email}
            />
            <input
              onChange={handlePasswordChange}
              value={password}
              type="password"
              placeholder="password"
            />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button type="submit">validé</button>
          </form>
        )}
      </div>
    </div>
  );
};
export default HomePage;
