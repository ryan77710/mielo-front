import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";
import uid2 from "uid2";

import LinkCaroussel from "./Components/LinkCaroussel";
import Picture from "./Components/Picture";

const ProfilePage = (props) => {
  const { authToken } = props;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [linkToogle, setLinkToogle] = useState(false);
  const [seriesToogle, setSeriesToogle] = useState(false);
  const [moviesToogle, setMoviesToogle] = useState(false);
  const [musicsToogle, setMusicsToogle] = useState(false);
  const [mangasToogle, setMangasToogle] = useState(false);
  const [picturesToogle, setPicturesToogle] = useState(false);
  const [addLinkPicture, setAddLinkPicture] = useState("/picture-missing.jpg");
  const [addLinkRef, setAddLinkRef] = useState("");
  const [addLinkType, setAddLinkType] = useState("link");
  const [addLinkMessage, setAddLinkMessage] = useState("message");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}user-profile/${authToken}`);
      setData(response.data.user);
      console.log(response.data.user);
      setIsLoading(false);
    };
    fetchData();
  }, [authToken]);
  const handleAddlinkClick = async () => {
    if (addLinkPicture === "/picture-missing.jpg" || (addLinkType === "link" && !addLinkRef)) {
      alert("missing filed");
    } //
    else {
      const sendData = {
        link: {
          linkType: addLinkType,
          ref: addLinkRef,
          message: addLinkMessage,
          logo: addLinkPicture,
          id: uid2(12),
        },
      };
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}link/add-link`, sendData, { headers: { Authorization: `Bearer ${authToken}` } });
        if (response) {
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  const handleAddPictureClick = async (event) => {
    const formData = new FormData();
    formData.append(`picture`, event.target.files[0]);
    try {
      if (event.target.files[0]) {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}user/add-picture`, formData, { headers: { Authorization: `Bearer ${authToken}` } });
        if (response) {
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
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
                  <img src={data.profilePicture.secure_url} alt="user-profile" /> <p>{data.username}</p>
                </div>
                <p className="description">{data.description}</p>
                <div className="user-info-2">
                  <p>rate:16/20</p>
                  <img src={data.profilePicture.secure_url} alt="pic-day" />
                </div>
                <div className="user-basic-button">
                  <button>update your profile</button>
                </div>
              </div>
              <div className="about-container">
                <div className="links">
                  <div>
                    <h2>personal links </h2> <button onClick={() => setLinkToogle((x) => !x)}>{linkToogle ? "-" : "+"}</button>
                  </div>
                  {linkToogle ? (
                    <div className="link-update-container">
                      <input type="text" onChange={(event) => setAddLinkRef(event.target.value)} value={addLinkRef} placeholder="https link" />

                      <div className="about-link-update">
                        <textarea onChange={(event) => setAddLinkMessage(event.target.value)} value={addLinkMessage} name="messageLink" id="messageLink">
                          message
                        </textarea>

                        <select onChange={(event) => setAddLinkType(event.target.value)} id="select-type">
                          <option value="link">Link</option>
                          <option value="message">Message</option>
                        </select>
                      </div>
                      <div className="link-update-picture">
                        <img src={addLinkPicture} alt="link" />
                        <button className="select-picture">select logo</button>

                        <LinkCaroussel setAddLinkPicture={setAddLinkPicture} />
                      </div>
                      <button onClick={handleAddlinkClick} className="add-link">
                        New link
                      </button>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="links-container">
                    {data.about.link.map((link) => {
                      return (
                        <div key={link.id} className="link">
                          <a target="_blank" rel="noreferrer" href={link.ref}>
                            <img src={link.logo} alt="link" />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="series">
                  <div>
                    <h2>top series</h2>
                    <button onClick={() => setSeriesToogle((x) => !x)}>{seriesToogle ? "-" : "+"}</button>
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
                    <button onClick={() => setMoviesToogle((x) => !x)}>{moviesToogle ? "-" : "+"}</button>
                  </div>
                </div>
                <div className="musics">
                  <div>
                    <h2>top musics</h2>
                    <button onClick={() => setMusicsToogle((x) => !x)}>{musicsToogle ? "-" : "+"}</button>
                  </div>
                </div>
                <div className="mangas">
                  <div>
                    <h2>top manga</h2>
                    <button onClick={() => setMangasToogle((x) => !x)}>{mangasToogle ? "-" : "+"}</button>
                  </div>
                </div>
              </div>
              <div>posts</div>
              <div className="pictures-section">
                <div onClick={() => setPicturesToogle((x) => !x)} className="picture-title">
                  <h2>pictures</h2>
                  <button>{picturesToogle ? "-" : "+"}</button>
                </div>
                {picturesToogle ? (
                  <div className="picture-toogle-on">
                    <label htmlFor="input-picture" className="add-picture">
                      add picture
                      <input hidden id="input-picture" name="input-picture" type="file" onChange={handleAddPictureClick} />
                    </label>

                    <div className="pictures-container">
                      {data.pictures.map((picture) => {
                        console.log(picture);
                        return <Picture key={picture.public_id} authToken={authToken} url={picture.secure_url} assetId={picture.asset_id} publicId={picture.public_id} />;
                      })}
                    </div>
                  </div>
                ) : (
                  ""
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
export default ProfilePage;
