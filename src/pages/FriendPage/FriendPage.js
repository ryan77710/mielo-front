import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const FriendPage = (props) => {
  const { authToken } = props;
  const [invitationSelected, setInvitationSelected] = useState(false);
  const [friendSearch, setFriendSearch] = useState("");

  const handleFriendSearchChange = (event) => {
    setFriendSearch(event.target.value);
  };
  return (
    <div>
      {authToken ? (
        <div className="friend-page">
          <h1>
            <span onClick={() => setInvitationSelected(false)} className={!invitationSelected ? "title-selected" : ""}>
              friends(2)
            </span>
            <img src="/mielo1.png" alt="mielo" />
            <span onClick={() => setInvitationSelected(true)} className={invitationSelected ? "title-selected" : ""}>
              invitations(1)
            </span>
          </h1>
          <div>
            <div className="filter">
              <div>
                <div className="search">
                  <p>Name :</p>
                  <input type="text" onChange={handleFriendSearchChange} value={friendSearch} />
                </div>
                <div className="select-gender">
                  <label for="gender">Gender:</label>
                  <select name="gender" id="gender">
                    <option value="">-- choose a gender--</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            {invitationSelected ? (
              <div className="friend-request-container">
                <div className="friend-request">
                  <img src="/anonymous.jpeg" alt="username" />
                  <p title="username">username</p>
                  <button className="friend-request-post">posts</button>
                  <button className="friend-request-picture">pictures</button>
                  <button className="friend-request-message">add</button>
                  <button className="friend-request-delete">refuse</button>
                </div>
              </div>
            ) : (
              <div className="friend-container">
                <div className="friend">
                  <img src="/anonymous.jpeg" alt="username" /> <p title="username">username</p>
                  <button className="friend-post">posts</button>
                  <button className="friend-picture">pictures</button>
                  <button className="friend-message">messages</button>
                  <button className="friend-delete">X</button>
                </div>
                <div className="friend">
                  <img src="/anonymous.jpeg" alt="username" /> <p title="username">username</p>
                  <button className="friend-post">posts</button>
                  <button className="friend-picture">pictures</button>
                  <button className="friend-message">messages</button>
                  <button className="friend-delete">X</button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};
export default FriendPage;
