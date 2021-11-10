import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import FriendRequest from "./Components/FriendRequest";
import Friend from "./Components/Friend";

import axios from "axios";

const FriendPage = (props) => {
  const { authToken } = props;
  const [invitationSelected, setInvitationSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [friendSearch, setFriendSearch] = useState("");
  const [friendsData, setFriends] = useState({});
  const [requestsData, setRequests] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const friendResponse = await axios.post(`${process.env.REACT_APP_API_URL}friend/all-friend`, null, { headers: { Authorization: `Bearer ${authToken}` } });
        const requestResponse = await axios.post(`${process.env.REACT_APP_API_URL}friend/all-request-received`, null, { headers: { Authorization: `Bearer ${authToken}` } });
        setFriends(friendResponse.data);
        setRequests(requestResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [authToken]);

  const handleFriendSearchChange = (event) => {
    setFriendSearch(event.target.value);
  };
  return (
    <div>
      {authToken ? (
        <div className="friend-page">
          {isLoading ? (
            "nop"
          ) : (
            <div>
              <h1>
                <span onClick={() => setInvitationSelected(false)} className={!invitationSelected ? "title-selected" : ""}>
                  friends({friendsData.numberOfFriends})
                </span>
                <img src="/mielo1.png" alt="mielo" />
                <span onClick={() => setInvitationSelected(true)} className={invitationSelected ? "title-selected" : ""}>
                  invitations({requestsData.request.length})
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
                      <label htmlFor="gender">Gender:</label>
                      <select name="gender" id="gender">
                        <option value="other">Other</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
                {invitationSelected ? (
                  <div className="friend-request-container">
                    {requestsData.request.map((request) => {
                      return (
                        <FriendRequest
                          authToken={authToken}
                          picture={request.sender.profilePicture.secure_url}
                          requestId={request._id}
                          key={request._id}
                          username={request.sender.username}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="friend-container">
                    {friendsData.friends.map((friend, index) => {
                      return <Friend key={friend._id} authToken={authToken} userId={friend._id} username={friend.username} picture={friend.profilePicture.secure_url} />;
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};
export default FriendPage;
