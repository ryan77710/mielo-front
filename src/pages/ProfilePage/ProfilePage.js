import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";
import uid2 from "uid2";

import LinkCaroussel from "./Components/LinkCaroussel";
import Picture from "./Components/Picture";
import Top from "./Components/top/Top";

const ProfilePage = (props) => {
  const { authToken } = props;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [linkToogle, setLinkToogle] = useState(false);
  const [series, setSeries] = useState([]);

  const [movies, setMovies] = useState([]);
  const [musics, setMusics] = useState([]);
  const [mangas, setMangas] = useState([]);
  const [books, setBooks] = useState([]);

  const [picturesToogle, setPicturesToogle] = useState(false);
  const [postsToogle, setPostsToogle] = useState(false);

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
  const handleChangeProfilePictureClick = async (event) => {
    const formData = new FormData();
    formData.append(`picture`, event.target.files[0]);
    if (event.target.files[0]) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}user/picture-profile-change`, formData, { headers: { Authorization: `Bearer ${authToken}` } });
        if (response) {
        }
      } catch (error) {
        console.log(error.message);
      }
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
                  <label htmlFor="profile-picture">
                    <img src={data.profilePicture.secure_url} alt="user-profile" />
                  </label>
                  <p>{data.username}</p>
                  <p>friend: 3333</p>
                  <input id="profile-picture" type="file" hidden onChange={handleChangeProfilePictureClick} />
                </div>
                <p className="description">{data.description}</p>
                <div className="user-info-2">
                  <p>rate:16/20</p>
                  {data.picture_day ? <img src={data.profilePicture.secure_url} alt="pic-day" /> : <img src={"/picture-missing.jpg"} alt="pic-day" />}
                  <p>follower: 5555</p>
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
                <Top title="series" data={series} setData={setSeries}></Top>
                <Top title="movies" data={movies} setData={setMovies}></Top>
                <Top title="musics" data={musics} setData={setMusics}></Top>
                <Top title="mangas" data={mangas} setData={setMangas}></Top>
                <Top title="books" data={books} setData={setBooks}></Top>
              </div>
              {/* <div>posts</div> */}
              <div className="pictures-section">
                <div onClick={() => setPicturesToogle((x) => !x)} className="picture-title">
                  <h2>my pictures</h2>
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
                        return <Picture key={picture.public_id} authToken={authToken} url={picture.secure_url} assetId={picture.asset_id} publicId={picture.public_id} />;
                      })}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="post-section">
                <div onClick={() => setPostsToogle((x) => !x)} className="post-title">
                  <h2>my posts</h2>
                  <button>{postsToogle ? "-" : "+"}</button>
                </div>
                {postsToogle ? (
                  <div className="post-toogle-on">
                    <div className="filter">
                      <label htmlFor="">
                        order :{" "}
                        <select onChange={(event) => setAddLinkType(event.target.value)} id="select-type">
                          <option value="more-recent">more recent</option>
                          <option value="less-recent">less recent</option>
                        </select>
                      </label>

                      <label htmlFor="">
                        type :{" "}
                        <select onChange={(event) => setAddLinkType(event.target.value)} id="select-type">
                          <option value="all">all</option>
                          <option value="text">text</option>
                          <option value="picture">picture</option>
                        </select>
                      </label>

                      <label htmlFor="">
                        filter by more :{" "}
                        <select onChange={(event) => setAddLinkType(event.target.value)} id="select-type">
                          <option value="null">null</option>
                          <option value="vue">vue</option>
                          <option value="like">like</option>
                        </select>
                      </label>
                    </div>
                    <div className="posts-container">post :)</div>
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
