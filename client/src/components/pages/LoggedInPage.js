import React from "react";
import Container from "react-bootstrap/esm/Container";

const LoggedInPage = ({ isLoggedIn }) => {
  return (
    <Container>
      {isLoggedIn ? (
        <h1>Logged In Page</h1>
      ) : (
        <h1>You've no business here without logging in</h1>
      )}
    </Container>
  );
};

export default LoggedInPage;
