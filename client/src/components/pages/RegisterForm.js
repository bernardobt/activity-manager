import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import FormInput from "../layout/FormInput";
import axios from "../../api/axios.js";

import {
  EMAIL_REGEX,
  USER_REGEX,
  PASSWORD_REGEX,
} from "../../constants/regex.js";

import { REGISTER_URL } from "../../constants/apiUrls.js";

const RegisterForm = () => {
  // dealing with alert message
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("success");

  useEffect(() => {
    setShowAlert(true);
  }, [alertMessage]);

  // dealing with email
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const emailFieldNote = <>Not a valid email.</>;

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  // dealing with username
  const [username, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const userNameFieldNote = (
    <>
      4 to 24 characters. {<br />}
      Must begin with a letter. {<br />}
      Letters, numbers, underscores, hyphens allowed.
    </>
  );

  useEffect(() => {
    const result = USER_REGEX.test(username);
    setValidName(result);
  }, [username]);

  // dealing with password
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [passwordFocus, setPasswordFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const passwordFieldNote = (
    <>
      8 to 24 characters. {<br />}
      Must include uppercase and lowercase, letters, number and special
      character. {<br />}
      Allowed special characters: ! @ # $ %
    </>
  );
  const confirmPasswordFieldNote = <>Must match Password</>;

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    // const match = password === matchPassword;
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  // dealing with button
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    validEmail && validName && validPassword && validMatch
      ? setDisableButton(false)
      : setDisableButton(true);
  }, [validEmail, validName, validPassword, validMatch]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked Sign In");
    console.log("user: ", username);
    console.log("password: ", password);

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("response", JSON.stringify(response));
      console.log("response.data", response.data);
      console.log("response.accessToken", response.accessToken);
      setAlertVariant("success");
      setAlertMessage(`Successfully registered ${username}`);
      setShowAlert(true);
    } catch (error) {
      if (!error?.response) {
        setAlertVariant("danger");
        setAlertMessage("No Server Response");
      } else if (error.response?.status === 409) {
        setAlertVariant("danger");
        setAlertMessage("Email or Username taken.");
      } else {
        setAlertVariant("danger");
        setAlertMessage("Registration Failed");
      }
    }
  };

  // clear form fields
  const clearFields = () => {
    setEmail("");
    setUser("");
    setPassword("");
    setMatchPassword("");
  };

  return (
    <Container>
      {showAlert && alertMessage && (
        <Alert
          variant={alertVariant}
          className="mt-3"
          onClose={() => {
            setAlertMessage("");
            setShowAlert(false);
          }}
          dismissible
        >
          <Alert.Heading>{alertMessage}</Alert.Heading>
        </Alert>
      )}

      <Form className="mt-5" onSubmit={handleOnSubmit}>
        <h1>Register</h1>

        <FormInput
          label="Email"
          fieldPlaceholder={"Enter e-mail adress"}
          type="email"
          isValid={validEmail}
          isInvalid={email && !validEmail}
          isRequired={true}
          controlId="registerEmailInput"
          fieldNote={emailFieldNote}
          stateToChange={(e) => setEmail(e.target.value)}
          autoComplete={"off"}
          showNote={emailFocus && !validEmail ? true : false}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          value={email}
        />

        <FormInput
          label="Username"
          fieldPlaceholder={"Enter username"}
          type="string"
          isValid={validName}
          isInvalid={username && !validName}
          isRequired={true}
          controlId="registerUsernameInput"
          fieldNote={userNameFieldNote}
          stateToChange={(e) => setUser(e.target.value)}
          autoComplete={"off"}
          showNote={userFocus && !validName ? true : false}
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          value={username}
        />

        <FormInput
          label="Password"
          fieldPlaceholder={"Enter password"}
          type="password"
          isValid={validPassword}
          isInvalid={password && !validPassword}
          isRequired={true}
          controlId="registerPasswordInput"
          fieldNote={passwordFieldNote}
          stateToChange={(e) => setPassword(e.target.value)}
          autoComplete={"off"}
          showNote={passwordFocus && !validPassword ? true : false}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          value={password}
        />
        <FormInput
          label="Confirm Password"
          fieldPlaceholder={"Comfirm your password"}
          type="password"
          isValid={validMatch && password}
          isInvalid={matchPassword && !validMatch}
          isRequired={true}
          controlId="registerConfirmPasswordInput"
          fieldNote={confirmPasswordFieldNote}
          stateToChange={(e) => setMatchPassword(e.target.value)}
          autoComplete={"off"}
          showNote={matchFocus && !validMatch ? true : false}
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          value={matchPassword}
        />

        <Button
          variant="primary"
          type="submit"
          className="text-capitalize"
          disabled={disableButton}
        >
          register
        </Button>

        <Form.Group>
          <Form.Text className="text-muted"></Form.Text>
          {`Already have an account? `}
          <a>Login</a>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default RegisterForm;
