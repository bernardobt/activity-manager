import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Register from "./Register";
import SignIn from "./SignIn";
import axios from "../../api/axios.js";
import { USERS_URL } from "../../constants/apiUrls.js";

const Auth = () => {
  // Alert Message
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(true);

  // Login Successfull
  const [success, setSuccess] = useState(false);

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
    <SignIn setUser={setUser} setPassword={setPassword} />
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
      // console.log("response.data", response.data);
      // console.log("response.accessToken", response.accessToken);
      // console.log("response", JSON.stringify(response));
      setSuccess(true);
      setAlertMessage("Successfully registered!");
      clearFields();
      switchForm();
    } catch (error) {
      if (!error?.response) {
        setAlertMessage("No Server Response");
      } else if (error.response?.status === 409) {
        setAlertMessage("Username taken.");
      } else {
        setAlertMessage("Registration Failed");
      }
    }
    clearFields();
  };

  const handleOnSignIn = (e) => {
    e.preventDefault();
    console.log("clicked Sign In");
    console.log("user: ", user);
    console.log("password: ", password);
  };

  const disableRegisterButton =
    email && validName && validPassword && validMatch ? false : true;
  const disableSignInButton = user && password ? false : true;

  useEffect(() => {
    alertMessage ? setShowAlert(true) : setShowAlert(false);
  }, [alertMessage]);

  return (
    <Container>
      {showAlert && alertMessage && (
        <Alert
          variant={success ? "success" : "danger"}
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

export default Auth;
