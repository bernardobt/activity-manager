import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Register from "./Register";
import SignIn from "./SignIn";
import axios from "../../api/axios.js";
import { USERS_URL, LOGIN_URL } from "../../constants/apiUrls.js";

const AuthForm = () => {
  // Auth context
  const { setAuth } = useContext(AuthContext);

  // Alert Message
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(true);

  // Register Successfull
  const [successRegister, setSuccessRegister] = useState(false);
  // Login Successfull
  const [successLogin, setSuccessLogin] = useState(false);

  //  State to choose which form to display
  const [isRegistered, setIsRegistered] = useState(true);

  // States for email field
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  // States for user field
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);

  // States for user password
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  // States for user matching password
  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  // Switch between register and login forms
  const formTitle = isRegistered ? "Sign In" : "Register";
  const formSubmitButtonText = isRegistered ? "Sign In" : "Register";
  const formBody = isRegistered ? (
    <SignIn
      user={user}
      setUser={setUser}
      password={password}
      setPassword={setPassword}
      setAlertMessage={setAlertMessage}
    />
  ) : (
    <Register
      email={email}
      setEmail={setEmail}
      validEmail={validEmail}
      setValidEmail={setValidEmail}
      user={user}
      setUser={setUser}
      validName={validName}
      setValidName={setValidName}
      password={password}
      setPassword={setPassword}
      validPassword={validPassword}
      setValidPassword={setValidPassword}
      matchPassword={matchPassword}
      setMatchPassword={setMatchPassword}
      validMatch={validMatch}
      setValidMatch={setValidMatch}
    />
  );

  const clearFields = () => {
    setEmail("");
    setUser("");
    setPassword("");
    setMatchPassword("");
  };
  const switchForm = () => {
    setIsRegistered((prevIsSignedIn) => !prevIsSignedIn);
    clearFields();
  };

  const handleOnRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        USERS_URL,
        JSON.stringify({
          username: user,
          password,
          email,
        }),
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );
      setSuccessRegister(true);
      setAlertMessage("Successfully registered!");
      clearFields();
      switchForm();
    } catch (error) {
      setSuccessRegister(false);
      if (!error?.response) {
        setAlertMessage("No Server Response");
      } else if (error.response?.status === 409) {
        setAlertMessage("Email or Username taken.");
      } else {
        setAlertMessage("Registration Failed");
      }
    }
  };

  const handleOnSignIn = async (e) => {
    e.preventDefault();
    // console.log("clicked Sign In");
    // console.log("user: ", user);
    // console.log("password: ", password);
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user: user, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("data: ", JSON.stringify(response?.data));
      // console.log("data: ", JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({
        user,
        password,
        roles,
        accessToken,
      });
      clearFields();
      setSuccessLogin(true);
      console.log("logged in?: ", successLogin);
    } catch (error) {
      if (!error?.response) {
        setAlertMessage("No Server Response");
      } else if (error.response?.status === 400) {
        setAlertMessage("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setAlertMessage("Unauthorized");
      } else {
        setAlertMessage("Login Failed");
      }
    }
  };

  const disableRegisterButton =
    email && validName && validPassword && validMatch ? false : true;

  const disableSignInButton = user && password ? false : true;

  useEffect(() => {
    alertMessage ? setShowAlert(true) : setShowAlert(false);
  }, [alertMessage]);

  useEffect(() => {
    setAlertMessage("");
  }, [user, password]);

  return (
    <Container>
      {showAlert && alertMessage && (
        <Alert
          variant={successRegister ? "success" : "danger"}
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

      <Form className="mt-5">
        <h1>{formTitle}</h1>
        {formBody}

        <Button
          variant="primary"
          type="submit"
          onClick={isRegistered ? handleOnSignIn : handleOnRegister}
          disabled={isRegistered ? disableSignInButton : disableRegisterButton}
        >
          {formSubmitButtonText}
        </Button>

        <Form.Group>
          <Form.Text className="text-muted"></Form.Text>
          {isRegistered
            ? "Don't have an account? "
            : "Already have an account? "}
          {isRegistered ? (
            <a
              href="#"
              className="text-decoration-underline text-primary"
              onClick={switchForm}
            >
              <strong>Register</strong>
            </a>
          ) : (
            <a
              href="#"
              className="text-decoration-underline text-primary"
              onClick={switchForm}
            >
              <strong>Sign In</strong>
            </a>
          )}
        </Form.Group>
      </Form>
    </Container>
  );
};

export default AuthForm;
