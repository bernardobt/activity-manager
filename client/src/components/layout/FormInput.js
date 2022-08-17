import React from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const Input = ({
  label,
  fieldPlaceholder,
  type,
  textClass,
  isRequired,
  controlId,
  reference,
  autoComplete,
  fieldNote,
  showNote,
  stateToChange,
}) => {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>{isRequired ? `${label} *` : label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={fieldPlaceholder}
        required={isRequired}
        reference={reference}
        autoComplete={autoComplete}
        onChange={stateToChange}
      />
      <Form.Text className={textClass}></Form.Text>

      {fieldNote && (
        <Container className="p-3">
          <Alert variant="danger">{fieldNote}</Alert>
        </Container>
      )}
    </Form.Group>
  );
};

export default Input;
