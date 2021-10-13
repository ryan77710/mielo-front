import { Redirect } from "react-router-dom";
const ArroundPage = (props) => {
  const { authToken } = props;
  return (
    <div>
      {authToken ? (
        <div className="arround-page">
          <h1>arround</h1>
          <div>
            filtre + boutton recherche <br />
            people find
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};
export default ArroundPage;
