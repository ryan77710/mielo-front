import { Redirect } from "react-router-dom";
import { useState } from "react";
const ArroundPage = (props) => {
  const { authToken } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [filterDetail, setFilterDetail] = useState(true);
  const [showFilterDetailButton, setShowFilterDetailButton] = useState(false);
  return (
    <div>
      {authToken ? (
        <div className="arround-page">
          {isLoading ? (
            "isloading"
          ) : (
            <div>
              <h1>arround</h1>
              <div>
                <div className="filter">
                  <div className="filter-basic-option">
                    <input type="text" placeholder="name" />
                    <select name="search-detail" id="search-detail">
                      <option value="user">user</option>
                      <option value="picture">picture</option>
                      <option value="post">post</option>
                    </select>
                    <select name="max-distance" id="max-distance">
                      <option value="none">max distance none</option>
                      <option value="100m"> max distance 100m</option>
                      <option value="300m">max distance 300m</option>
                      <option value="500m"> max distance 500m</option>
                      <option value="700m"> max distance 700m</option>
                      <option value="1km"> max distance 1km</option>
                    </select>
                    <button>search</button>
                  </div>
                  {showFilterDetailButton ? (
                    <div className="filter-detail-container">
                      <button onClick={() => setFilterDetail((x) => !x)}>more filter</button>
                      {filterDetail ? (
                        <div className="filter-detail">
                          <select name="max-distance" id="max-distance">
                            <option value="male">male</option>
                            <option value="female">female</option>
                          </select>
                          <p>avatar,limit,date,like,vue</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="search-container">
                  <div className="user-container"></div>
                  <div className="post-container"></div>
                  <div className="picture-container">
                    <div>
                      <img src="/anonymous.jpeg" alt="an" />
                      <div> like,nombre comment, user picture</div>
                    </div>
                  </div>
                </div>
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
export default ArroundPage;
