import axios from "axios";
const Friend = (props) => {
  const { username, picture, authToken, userId } = props;

  const handleDeleteFriendClick = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}friend/friend-delete/${userId}`, null, { headers: { Authorization: `Bearer ${authToken}` } });
      if (response) {
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="friend">
      <img src={picture} alt={username} /> <p title={username}>{username}</p>
      <button className="friend-post">posts</button>
      <button className="friend-picture">pictures</button>
      <button className="friend-message">messages</button>
      <button onClick={handleDeleteFriendClick} className="friend-delete">
        X
      </button>
    </div>
  );
};
export default Friend;
