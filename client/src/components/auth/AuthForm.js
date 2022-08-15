import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Input from "../layout/FormInput";

const Auth = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const switchForm = () => {
    setIsSignedIn((prevIsSignedIn) => !prevIsSignedIn);
  };

  const handleOnSubmit = () => {};
  const formTitle = isSignedIn ? "Sign Up" : "Sign In";
  const formSubmitButtonText = isSignedIn ? "Sign Up" : "Sign In";
  const formBody = isSignedIn ? (
    <>
      <Input
        label="Email"
        fieldPlaceholder={"Enter e-mail adress"}
        type="email"
        textClass="text-muted"
        isRequired={true}
      />
      <Input
        label="Username"
        fieldPlaceholder={"Enter username"}
        type="string"
        textClass="text-muted"
        isRequired={true}
      />
      <Input
        label="Password"
        fieldPlaceholder={"Enter password"}
        type="password"
        textClass="text-muted"
        isRequired={true}
      />
      <Input
        label="Confirm Password"
        fieldPlaceholder={"Comfirm your password"}
        type="password"
        textClass="text-muted"
        isRequired={true}
      />
    </>
  ) : (
    <>
      <>
        <Input
          label="Username"
          fieldPlaceholder={"Enter username"}
          type="string"
          textClass="text-muted"
          isRequired={true}
        />
        <Input
          label="Password"
          fieldPlaceholder={"Enter password"}
          type="password"
          textClass="text-muted"
          isRequired={true}
        />
      </>
    </>
  );

  return (
    <Form className="mt-5">
      <h1>{formTitle}</h1>
      {formBody}

      <Button variant="primary" type="submit">
        {formSubmitButtonText}
      </Button>

      <Button variant="secondary" onClick={switchForm}>
        Go to {isSignedIn ? "Sign In" : "Sign Up"}
      </Button>
    </Form>
  );
};

export default Auth;
