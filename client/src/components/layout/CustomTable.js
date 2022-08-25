import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const CustomTable = ({ tableColumns, tableRows }) => {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr className="text-capitalize">
          {tableColumns.map((col, index) => {
            return <th key={index}>{col}</th>;
          })}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tableRows.map((row, index) => {
          return (
            <tr key={index} className="text-capitalize">
              <td>{index + 1}</td>
              {Object.entries(row).map((entry, index) => {
                if (entry[0] !== "id" && entry[0] !== "creator")
                  return <td key={index}>{entry[1]}</td>;
              })}
              <td>
                <ButtonGroup
                  aria-label="Basic example"
                  size="sm"
                  className="float-end"
                >
                  <Button className="text-capitalize" variant="secondary">
                    edit
                  </Button>
                  <Button className="text-capitalize" variant="danger">
                    delete
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default CustomTable;
