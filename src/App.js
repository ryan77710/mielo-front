import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { io } from "socket.io-client";

import HomePage from "./pages/HomePage/HomePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ArroundPage from "./pages/ArroundPage/ArroundPage";
import FriendPage from "./pages/FriendPage/FriendPage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import Header from "./components/Header";

import "./App.css";

function App() {
  let socket = io(process.env.REACT_APP_API_URL, {
    reconnectionDelayMax: 10000,
  });

  let token;
  const [actualCoords, setActualCoors] = useState({
    latitude: null,
    longitude: null,
  });
  const [authToken, setAuthToken] = useState(Cookies.get("userToken", token) || null);
  const [username, setUsername] = useState(null);

  const handleLogin = (token) => {
    Cookies.set("userToken", token, { expires: 7 });
    setAuthToken(token);
  };
  const handleLogOut = () => {
    Cookies.remove("userToken");
    setAuthToken(null);
    setActualCoors({ latitude: null, longitude: null });
    socket.emit("deconnection", { authToken: authToken });
  };

  useEffect(() => {
    let watchId;
    const geo_options = {
      enableHighAccuracy: true,
      maximumAge: 5000,
      timeout: 27000,
    };
    const getDist = (actualCoords, newCoords) => {
      const pointX = actualCoords.longitude - newCoords.longitude;
      const pointY = actualCoords.latitude - newCoords.latitude;
      const dist = Math.sqrt(Math.pow(pointX, 2) + Math.pow(pointY, 2));
      console.log("la distance est =====>", dist);
      return dist;
    };
    // const checkDist = (dist, minDist) => {};
    const getPos = async () => {
      watchId = await navigator.geolocation.watchPosition(
        (position) => {
          console.log(position);
          if (!actualCoords.latitude && !actualCoords.longitude) {
            console.log("existe pas");
            setActualCoors({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          } //
          else {
            console.log("existe");
            if (position.coords.latitude !== actualCoords.latitude || position.coords.longitude !== actualCoords.longitude) {
              console.log("différent");
              const distance = getDist(actualCoords, position.coords);
              console.log(distance);
            } //
            else {
              console.log("pareil");
            }
          }
        },
        (err) => console.log(err),
        geo_options
      );
    };
    getPos();

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [authToken, actualCoords.latitude, actualCoords.longitude, actualCoords]);
  useEffect(() => {
    if (authToken) {
      socket.emit("login", { authToken: authToken });
    }
  }, [socket, authToken]);
  useEffect(() => {
    if (actualCoords.latitude && actualCoords.longitude && authToken) {
      socket.emit("userPos", { authToken: authToken, coords: actualCoords });
    }
    return () => {
      // socket.disconnect(0);
    };
  }, [actualCoords, socket, authToken]);

  return (
    <div className="App">
      <Router>
        <Header setUsername={setUsername} username={username} actualCoords={actualCoords} authToken={authToken} handleLogin={handleLogin} handleLogOut={handleLogOut} />
        <Switch>
          <Route exact path="/user/sign-up">
            <SignUpPage handleLogin={handleLogin} />
          </Route>
          <Route exact path="/user/login">
            <LoginPage></LoginPage>
          </Route>
          <Route exact path="/user/arround">
            <ArroundPage authToken={authToken} />
          </Route>
          <Route exact path="/user/friends">
            <FriendPage authToken={authToken} />
          </Route>
          <Route exact path="/user/messages">
            <MessagesPage authToken={authToken} />
          </Route>
          <Route exact path="/user/my-profile">
            <ProfilePage authToken={authToken} />
          </Route>
          <Route exact path="/">
            <HomePage username={username} authToken={authToken} actualCoords={actualCoords} />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
