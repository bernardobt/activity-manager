import Button from "react-bootstrap/esm/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CustomTable from "./CustomTable";

// example of parammeter for activity table
// later it will be retrieved form db
const activitiesHeader = ["#", "name", "category", "status", "date"];
const activityRows = [
  {
    id: 0,
    name: "One piece",
    cat: "manga",
    status: "finished",
    date: "date 1",
    creator: "jose",
  },
  {
    id: 1,
    name: "Overlord ",
    cat: "light novel",
    status: "finished",
    date: "date 2",
    creator: "jose",
  },
  {
    id: 2,
    name: "danganronpa v3",
    cat: "game",
    status: "playing",
    date: "date 3",
    creator: "jose",
  },
];

// example of parammeter for status table
// later it will be retrieved form db
const statusHeader = ["#", "name", "date"];
const statusRows = [
  {
    id: 0,
    name: "finished",
    created: "date 1",
    creator: "jose",
  },
  {
    id: 1,
    name: "started",
    created: "date 5",
    creator: "brainer",
  },
  {
    id: 2,
    name: "dropped",
    created: "date 3",
    creator: "jose",
  },
  {
    id: 2,
    name: "planning",
    created: "date 3",
    creator: "brainer",
  },
];
// example of parammeter for category table
// later it will be retrieved form db
const categoriesHeader = ["#", "name", "date"];
const categoriesRows = [
  {
    id: 0,
    name: "light novel",
    created: "date 1",
    creator: "brainer",
  },
  {
    id: 1,
    name: "game",
    created: "date 5",
    creator: "jose",
  },
  {
    id: 2,
    name: "manga",
    created: "date 3",
    creator: "brainer",
  },
];

// handle add activity
const handleAddActivity = () => {
  console.log("Clicked Add Activity");
};
// handle add category
const handleAddCategory = () => {
  console.log("Clicked Add Category");
};
// handle add status
const handleAddStatus = () => {
  console.log("Clicked Add Status");
};

const DashboardContent = () => {
  return (
    <Tabs
      defaultActiveKey="activities"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="activities" title="Activities">
        <h4 className="mb-4">
          Activities content
          <Button
            className="float-end text-capitalize"
            onClick={handleAddActivity}
          >
            add activity
          </Button>
        </h4>
        <CustomTable tableColumns={activitiesHeader} tableRows={activityRows} />
      </Tab>

      <Tab eventKey="categories" title="Categories">
        <h4 className="mb-4">
          Categories content
          <Button
            className="float-end text-capitalize"
            onClick={handleAddCategory}
          >
            Add category
          </Button>
        </h4>
        <CustomTable
          tableColumns={categoriesHeader}
          tableRows={categoriesRows}
        />
      </Tab>

      <Tab eventKey="status" title="Status">
        <h4 className="mb-4">
          Status content
          <Button
            className="float-end text-capitalize"
            onClick={handleAddStatus}
          >
            add status
          </Button>
        </h4>
        <CustomTable tableColumns={statusHeader} tableRows={statusRows} />
      </Tab>
    </Tabs>
  );
};

export default DashboardContent;
