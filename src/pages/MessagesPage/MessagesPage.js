import { Redirect } from "react-router-dom";

import UserMessage from "./Components/UserMessage";

const MessagesPage = (props) => {
  const { authToken } = props;
  return (
    <div>
      {authToken ? (
        <div className="messages-page">
          <h1>messages</h1>
          <div className="type-messages-container">
            <div className="type-message">
              <h2>my messages</h2>
              <div className="message-container">
                <UserMessage />
                <UserMessage />
                <UserMessage />
              </div>
            </div>
            <div className="type-message">
              <h2>messages received</h2>
              <div className="message-container">
                <UserMessage />
                <UserMessage />
                <UserMessage />
              </div>
            </div>
            <div className="type-message">
              <h2>community</h2>
              <div className="message-container">
                <UserMessage />
                <UserMessage />
                <UserMessage />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};
export default MessagesPage;
