import { useState, useEffect } from "react";

import axios from "axios";

import TextArea from "../../components/TextArea";
import Input from "../../components/Input";
const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmePassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [checkPassword, setCheckPassword] = useState(true);

  const handleDescriptionChange = (event) =>
    setDescription((x) => event.target.value);

  useEffect(() => {
    if (
      (password === "" && confirmePassword === "") ||
      password !== confirmePassword
    ) {
      setCheckPassword(false);
    } else {
      setCheckPassword(true);
    }
  }, [password, confirmePassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (checkPassword) {
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
        console.log(response);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>s'inscrire</h1>
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
          placeholder="nom d'utilisateur"
        />
        <Input
          type="password"
          setValue={setPassword}
          value={password}
          placeholder="mot de passe"
        />

        <Input
          type="password"
          setValue={setConfirmPassword}
          value={confirmePassword}
          placeholder="confirmer le mot de passe"
        />
        {checkPassword ? <p>mot de passe good</p> : <p>mot de passe bad</p>}

        <TextArea
          onChange={handleDescriptionChange}
          value={description}
          placeholder="description"
        />
        <button type="submit">valider</button>
      </form>
    </div>
  );
};
export default SignUpPage;
