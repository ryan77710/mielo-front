import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

const ProfilePage = (props) => {
  const { authToken } = props;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}user-profile/${authToken}`);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [authToken]);
  return (
    <div>
      {authToken ? (
        <div className="my-profile-page">
          <h1>my profile</h1>
          {isLoading ? (
            <div>is loading</div>
          ) : (
            <div className="user-container">
              <div className="user-basic">
                <div className="user-info-1">
                  <img src={data.user.profilePicture.secure_url} alt="user-profile" /> <p>username</p>
                </div>
                <p className="description">{data.user.description}</p>
                <div className="user-info-2">
                  <p>rate:16/20</p>
                  <img src={data.user.profilePicture.secure_url} alt="pic-day" />
                </div>
                <div className="user-basic-button">
                  <button>update your profile</button>
                </div>
              </div>
              <div className="about-container">
                <div className="links">
                  <div>
                    <h2>personal links</h2> <button>+</button>
                  </div>

                  <div className="links-container">
                    <div className="link">
                      <img src={"/link-picture/you-tube.jpeg"} alt="link" />
                    </div>
                    <div className="link">
                      <img src={"/link-picture/facebook.png"} alt="link" />
                    </div>
                    <div className="link">
                      <img src={"/link-picture/instagram.jpg"} alt="link" />
                    </div>
                    <div className="link">
                      <img src={"/link-picture/linkedin.png"} alt="link" />
                    </div>
                    <div className="link">
                      <img src={"/link-picture/snap.png"} alt="link" />
                    </div>
                    <div className="link">
                      <img src={"/link-picture/tiktok.png"} alt="link" />
                    </div>
                    <div className="link">
                      <img src={"/link-picture/twitch.png"} alt="link" />
                    </div>
                    <div className="link">
                      <img src={"/link-picture/twitter.png"} alt="link" />
                    </div>
                    <div className="link">
                      <img src={"/link-picture/whatsapp.jpg"} alt="link" />
                    </div>
                  </div>
                </div>
                <div className="series">
                  <div>
                    <h2>top series</h2>
                    <button>+</button>
                  </div>
                  <div className="series-container">
                    <div className="serie">
                      <span>1</span> <h3>title</h3>
                    </div>
                  </div>
                </div>
                <div className="movies">
                  <div>
                    <h2>top movies</h2>
                    <button>+</button>
                  </div>
                </div>
                <div className="musics">
                  <div>
                    <h2>top musics</h2>
                    <button>+</button>
                  </div>
                </div>
                <div className="mangas">
                  <div>
                    <h2>top manga</h2>
                    <button>+</button>
                  </div>
                </div>
              </div>
              <div>posts</div>
            </div>
          )}
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};
export default ProfilePage;
