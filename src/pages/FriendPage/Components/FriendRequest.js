import axios from "axios";

const FriendRequest = (props) => {
  const { authToken, username, requestId, picture } = props;

  const handleAcceptRequestClick = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}friend/friend-accept/${requestId}`, null, { headers: { Authorization: `Bearer ${authToken}` } });
      if (response) {
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleRefuseRequestClick = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}friend/friend-refuse/${requestId}`, null, { headers: { Authorization: `Bearer ${authToken}` } });
      if (response) {
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="friend-request">
      <img src={picture} alt={username} />
      <p title={username}>{username}</p>
      <button className="friend-request-post">posts</button>
      <button className="friend-request-picture">pictures</button>
      <button onClick={handleAcceptRequestClick} className="friend-request-message">
        add
      </button>
      <button onClick={handleRefuseRequestClick} className="friend-request-delete">
        refuse
      </button>
    </div>
  );
};
export default FriendRequest;
