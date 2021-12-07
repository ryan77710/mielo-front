import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Header = (props) => {
  const { authToken, handleLogin, handleLogOut, actualCoords, username, setUsername } = props;
  let history = useHistory();
  const [userData, setUserData] = useState(null);
  const [headerLoading, setHeaderLoading] = useState(true);
  const [headerToggle, setHeaderToggle] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event) => setEmail((x) => event.target.value);
  const handlePasswordChange = (event) => setPassword((x) => event.target.value);

  useEffect(() => {
    setHeaderLoading(true);

    const fetchData = async () => {
      if (authToken) {
        const responseUser = await axios.get(`${process.env.REACT_APP_API_URL}user-token/${authToken}`);
        setUserData(responseUser.data);

        setUsername(responseUser.data.user.username);
      } else {
        setUserData(null);
        setUsername(null);
      }
    };
    fetchData();

    setHeaderLoading(false);
  }, [authToken, handleLogin, handleLogOut, setUsername]);

  const onSubmitClick = async (event) => {
    try {
      event.preventDefault();
      const field = {
        email: email,
        password: password,
      };
      const response = await axios.post(`${process.env.REACT_APP_API_URL}user/login`, field);
      if (response.status === 200) {
        handleLogin(response.data.user.token);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <div className="header">
      <header>
        <div onClick={() => history.push("/")} className="logo-container">
          <img src="/mielo3.png" alt="mielo" />
          <img src="/mielo2.png" alt="mielo" />
        </div>
        <div className="button-container">
          <button onClick={() => history.push("/user/my-profile")}>my profile</button>
          <button onClick={() => history.push("/user/messages")}>messages</button>
          <button onClick={() => history.push("/user/arround")}>flux</button>
          <button onClick={() => history.push("/user/arround")}>arround</button>
          <button onClick={() => history.push("/user/friends")}>friends</button>
        </div>
        <div className="profile-container">
          {headerLoading ? (
            <p>head loading</p>
          ) : (
            <div className={`profile-user`}>
              <div className="profile-basic-container">
                <button onClick={() => setHeaderToggle((x) => !x)}>{!headerToggle ? "+" : "-"}</button>
                {username ? <span>{username}</span> : <span>anonymous</span>}
                {userData ? <img src={userData.user.profilePicture.secure_url} alt={userData.user.username} /> : <img src="/anonymous.jpeg" alt="anonymous-user" />}
              </div>
              {headerToggle ? (
                <div className="header-toggle-on">
                  <div className="connection-button">
                    {authToken ? (
                      <button onClick={handleLogOut} className="button-log-out">
                        log out
                      </button>
                    ) : (
                      <div>
                        <form onSubmit={onSubmitClick}>
                          <input onChange={handleEmailChange} type="email" placeholder="email" value={email} />
                          <input onChange={handlePasswordChange} value={password} type="password" placeholder="password" />
                          {errorMessage && <p className="error-message">{errorMessage}</p>}
                          <button type="submit" className="button-log-in">
                            log in
                          </button>
                        </form>

                        <p>or</p>
                        <button onClick={() => history.push("user/sign-up")} className="button-sign-up">
                          Sign up
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <p>langue</p>
                    <p>uploader</p>
                    <p>notification</p>
                    <p>mes modérateurs</p>
                    <p>comentaires</p>
                    <p></p>
                    <p></p>
                    <p>a propos</p>
                    <p>faire un don</p>
                    <p>nous contacter</p>
                    <p>latitude : {actualCoords.latitude || "null"}</p>
                    <p>longitude : {actualCoords.longitude || "null"}</p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </header>
    </div>
  );
};
export default Header;
