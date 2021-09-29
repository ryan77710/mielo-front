import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { useDebounce } from "use-debounce";

import checkLength from "../../utils/regex/checkLength";
import checkNumber from "../../utils/regex/checkNumber";
import checkCapitalLetter from "../../utils/regex/checkCapitalLetter";
import checkSpecialCharacter from "../../utils/regex/checkSpecialCharacter";

import TextArea from "../../components/TextArea";
import Input from "../../components/Input";

const SignUpPage = (props) => {
  const { handleLogin } = props;
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [usernameDebouced] = useDebounce(username, 1500);
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [checkUsernameLength, setCheckUsernameLength] = useState(true);
  const [password, setPassword] = useState("");
  const [checkPasswordLength, setCheckPasswordLength] = useState(false);
  const [checkSpécialCharacter, setCheckSpécialCharacter] = useState(false);
  const [checkContainNumber, setCheckContainNumber] = useState(false);
  const [checkPassCapitalLetter, setCheckPassCapitalLetter] = useState(false);
  const [confirmePassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [checkPassword, setCheckPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [signupPermission, setSignupPermission] = useState(false);

  const handleDescriptionChange = (event) =>
    setDescription((x) => event.target.value);

  useEffect(() => {
    checkLength(7, password, setCheckPasswordLength);
    checkNumber(password, setCheckContainNumber);
    checkCapitalLetter(password, setCheckPassCapitalLetter);
    checkSpecialCharacter(password, setCheckSpécialCharacter);

    if (password === "" || password !== confirmePassword) {
      setCheckPassword(false);
    } else {
      setCheckPassword(true);
    }
  }, [password, confirmePassword]);

  useEffect(() => {
    const checkUsername = async () => {
      if (usernameDebouced.length >= 6) {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}user/check-username/${
            usernameDebouced || "x"
          }`
        );

        if (response.data.message === "username not available") {
          setUsernameAvailable(true);
        } else if (response.data.message === "username available") {
          setUsernameAvailable(false);
        }
        setCheckUsernameLength(false);
      } else {
        setCheckUsernameLength(true);
      }
    };

    checkUsername();
  }, [usernameDebouced]);

  useEffect(() => {
    //condition to check for create an account
    if (
      !usernameAvailable &&
      !checkUsernameLength &&
      checkPassword &&
      checkPasswordLength &&
      checkSpécialCharacter &&
      checkContainNumber &&
      checkPassCapitalLetter &&
      description
    ) {
      setSignupPermission(true);
    } else {
      setSignupPermission(false);
    }
  }, [
    usernameAvailable,
    checkUsernameLength,
    checkPassword,
    checkPasswordLength,
    checkSpécialCharacter,
    checkContainNumber,
    checkPassCapitalLetter,
    description,
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (signupPermission) {
        const field = {
          email: email,
          username: username,
          password: password,
          description: description,
        };
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}user/sign-up`,
          field
        );

        const token = response.data.data.token;
        handleLogin(token);
        history.push("/");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="signup-page">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          setValue={setEmail}
          value={email}
          placeholder="email"
        />
        <Input
          type="text"
          setValue={setUsername}
          value={username}
          placeholder="username"
        />

        <div className="username-details">
          {usernameAvailable && (
            <span className="message-error">
              {usernameDebouced} not available
            </span>
          )}
          {checkUsernameLength && (
            <span className="message-error">
              the username must have more than 6 characters
            </span>
          )}
        </div>

        <Input
          type="password"
          setValue={setPassword}
          value={password}
          placeholder="password"
        />

        <div className="password-details">
          <span
            className={checkPasswordLength ? "message-good" : "message-error"}
          >
            must have more than 7 characters
          </span>
          <span
            className={checkSpécialCharacter ? "message-good" : "message-error"}
          >
            must have a spécial character
          </span>
          <span
            className={checkContainNumber ? "message-good" : "message-error"}
          >
            must have a number
          </span>
          <span
            className={
              checkPassCapitalLetter ? "message-good" : "message-error"
            }
          >
            must have a capital letter
          </span>
        </div>

        <Input
          type="password"
          setValue={setConfirmPassword}
          value={confirmePassword}
          placeholder="confirm password"
        />
        {checkPassword ? (
          <p className="message-good">password good</p>
        ) : (
          <p className="message-error">password bad</p>
        )}

        <TextArea
          onChange={handleDescriptionChange}
          value={description}
          placeholder="description"
        />
        {errorMessage && <p className="message-error">{errorMessage}</p>}
        <button type="submit">Validate</button>
      </form>
    </div>
  );
};
export default SignUpPage;
