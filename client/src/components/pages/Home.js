import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <h1>This is the Home</h1>
      <h4>What is this app?</h4>
      <Outlet />
    </Container>
  );
};

export default Home;
