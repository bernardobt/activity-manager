import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import FormInput from "../layout/FormInput";
import axios from "../../api/axios.js";

import { LOGIN_URL } from "../../constants/apiUrls.js";
// import {
//   EMAIL_REGEX,
//   USER_REGEX,
//   PASSWORD_REGEX,
// } from "../../constants/regex.js";

const LoginForm = () => {
  // dealing wiht auth
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // dealing with alert message
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("success");

  useEffect(() => {
    setShowAlert(true);
  }, [alertMessage]);

  // dealing with username
  const [username, setUser] = useState("");
  //   const [validName, setValidName] = useState(false);
  //   const [userFocus, setUserFocus] = useState(false);

  //   const usernameFieldNote = <>Please enter a user.</>;

  //   useEffect(() => {
  //     const result = USER_REGEX.test(username);
  //     setValidName(result);
  //   }, [username]);

  // dealing with password
  const [password, setPassword] = useState("");
  //   const [validPassword, setValidPassword] = useState(false);
  //   const [passwordFocus, setPasswordFocus] = useState(false);

  //   const passwordFieldNote = <>Not a valid password.</>;

  //   useEffect(() => {
  //     const result = PASSWORD_REGEX.test(password);
  //     setValidPassword(result);
  //   }, [password]);

  //   // dealing with button
  //   const [disableButton, setDisableButton] = useState(true);

  //   useEffect(() => {
  //     validName && validPassword
  //       ? setDisableButton(false)
  //       : setDisableButton(true);
  //   }, [, validName, validPassword]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // console.log("clicked Sign In");
    // console.log("username: ", username);
    // console.log("password: ", password);
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: username, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      console.log("accessToken", accessToken);
      //   const roles = response?.data?.roles;
      setAuth({
        username,
        password,
        // roles,
        accessToken,
      });
      console.log("end");
      // setSuccessLogin(true);

      setAlertVariant("success");
      setAlertMessage(`Logged as ${username}`);

      // clearFields();
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setAlertVariant("danger");
        setAlertMessage("No Server Response");
      } else if (error.response?.status === 400) {
        setAlertVariant("danger");
        setAlertMessage("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setAlertVariant("danger");
        setAlertMessage("Unauthorized");
      } else {
        setAlertVariant("danger");
        setAlertMessage("Login Failed");
      }
    }
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
        <h1>Login</h1>

        <FormInput
          label="Username"
          fieldPlaceholder={"Enter username"}
          type="string"
          //   isValid={validName}
          //   isInvalid={username && !validName}
          isRequired={true}
          controlId="registerUsernameInput"
          //   fieldNote={usernameFieldNote}
          stateToChange={(e) => setUser(e.target.value)}
          autoComplete={"off"}
          //   showNote={userFocus && !validName ? true : false}
          //   onFocus={() => setUserFocus(true)}
          //   onBlur={() => setUserFocus(false)}
          value={username}
        />

        <FormInput
          label="Password"
          fieldPlaceholder={"Enter password"}
          type="password"
          //   isValid={validPassword}
          //   isInvalid={password && !validPassword}
          isRequired={true}
          controlId="registerPasswordInput"
          //   fieldNote={passwordFieldNote}
          stateToChange={(e) => setPassword(e.target.value)}
          autoComplete={"off"}
          //   showNote={passwordFocus && !validPassword ? true : false}
          //   onFocus={() => setPasswordFocus(true)}
          //   onBlur={() => setPasswordFocus(false)}
          value={password}
        />

        <Button
          variant="primary"
          type="submit"
          className="text-capitalize"
          //   disabled={disableButton}
        >
          login
        </Button>

        <Form.Group>
          <Form.Text className="text-muted"></Form.Text>
          {`Don't have an account? `}
          <a>Register</a>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default LoginForm;
