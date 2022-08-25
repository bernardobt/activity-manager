import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { Outlet } from "react-router-dom";

import DashboardContent from "../layout/DashboardContent";

const Dashboard = () => {
  // handling modal

  // This item state represents the entity that will be controlled inside
  // the Dashboard. It could be a Product, a Category or a Status, depending
  // on the tab in which one is interacting with.

  //   const [item, setItem] = useState();
  //   const handleOnClickTest = () => {
  //     setShowModal(true);
  //     setProduct("");
  //   };

  return (
    <Container>
      <h1>This is the Dashboard</h1>
      <DashboardContent />

      <Outlet />
    </Container>
  );
};

export default Dashboard;
