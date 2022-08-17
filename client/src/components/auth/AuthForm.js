import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Register from "./Register";
import SignIn from "./SignIn";

const Auth = () => {
  // Login Successfull
  const [success, setSucess] = useState(false);

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
  const switchForm = () => {
    setIsRegistered((prevIsSignedIn) => !prevIsSignedIn);
    setEmail("");
    setUser("");
    setPassword("");
    setMatchPassword("");
  };

  const handleOnRegister = async (e) => {
    e.preventDefault();
    console.log("clicked Register");
    console.log("email: ", email);
    console.log("user: ", user);
    console.log("password: ", password);
    console.log("matchPassword: ", matchPassword);
    setSucess(true);
    switchForm();
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

  return (
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
        {isRegistered ? "Don't have an accout? " : "Already have an accout? "}
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
  );
};

export default Auth;
