import { Redirect } from "react-router-dom";

const ProfilePage = (props) => {
  const { authToken } = props;
  return (
    <div>
      {authToken ? (
        <div className="my-profile-page">
          <h1>my profile</h1>
          <div>
            photo + username + description + button mettre a jour le profile
            <br />
            photo du jour + note
            <br />
            photos
            <br />
            posts
            <br />
            about
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};
export default ProfilePage;
