import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { io } from "socket.io-client";

import HomePage from "./pages/HomePage/HomePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Header from "./components/Header";

import "./App.css";

function App() {
  let socket = io(process.env.REACT_APP_API_URL, {
    reconnectionDelayMax: 10000,
  });

  let token;
  const [coords, setCoors] = useState({ latitude: null, longitude: null });
  const [authToken, setAuthToken] = useState(
    Cookies.get("userToken", token) || null
  );
  const handleLogin = (token) => {
    Cookies.set("userToken", token, { expires: 7 });
    setAuthToken(token);
  };
  const handleLogOut = () => {
    Cookies.remove("userToken");
    setAuthToken(null);
    setCoors({ latitude: null, longitude: null });
    socket.emit("deconnection", { authToken: authToken });
  };
  useEffect(() => {
    let watchId;
    if (authToken) {
      const geo_options = {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 27000,
      };
      const getPos = async () => {
        watchId = await navigator.geolocation.watchPosition(
          (position) => {
            if (
              position.coords.latitude === coords.latitude &&
              position.coords.longitude === coords.longitude
            ) {
            } else {
              setCoors({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            }
          },
          (err) => console.log(err),
          geo_options
        );
      };
      getPos();
    }

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [authToken, coords.latitude, coords.longitude]);
  useEffect(() => {
    socket.emit("login", { authToken: authToken });
  }, [socket, authToken]);
  useEffect(() => {
    if (coords.latitude && coords.longitude && authToken) {
      socket.emit("userPos", { authToken: authToken, coords: coords });
    }
    return () => {
      // socket.disconnect(0);
    };
  }, [coords, socket, authToken]);
  useEffect(() => {
    if (authToken) {
      // socket.emit("login", authToken);
      // socket.on("newUser", () => {});
    }
    return () => {
      // socket.disconnect(0);
    };
  }, [authToken, socket]);
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/user/sign-up">
            <SignUpPage />
          </Route>
          <Route exact path="/user/login">
            <LoginPage></LoginPage>
          </Route>
          <Route exact path="/">
            <HomePage
              authToken={authToken}
              handleLogOut={handleLogOut}
              handleLogin={handleLogin}
              coords={coords}
            />
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
