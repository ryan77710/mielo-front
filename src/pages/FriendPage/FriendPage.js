import { Redirect } from "react-router-dom";

const FriendPage = (props) => {
  const { authToken } = props;
  return (
    <div>
      {authToken ? (
        <div className="friend-page">
          <h1>friends</h1>
          <div>friends list</div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};
export default FriendPage;
