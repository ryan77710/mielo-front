import { Redirect } from "react-router-dom";

const MessagesPage = (props) => {
  const { authToken } = props;
  return (
    <div>
      {authToken ? (
        <div className="messages-page">
          <h1>messages</h1>
          <div>
            mes conversations
            <br />
            message reçu
            <br />
            communauté
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};
export default MessagesPage;
