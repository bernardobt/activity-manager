import React from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const Input = ({
  label,
  fieldPlaceholder,
  type,
  isValid,
  isInvalid,
  isRequired,
  controlId,
  reference,
  autoComplete,
  fieldNote,
  showNote,
  stateToChange,
  onFocus,
  onBlur,
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
        onFocus={onFocus}
        onBlur={onBlur}
        isValid={isValid}
        isInvalid={isInvalid}
      />
      <Form.Control.Feedback type="invalid">
        {fieldNote && showNote && onFocus && (
          <Container className="mt-3">
            <Alert variant="danger">{fieldNote}</Alert>
          </Container>
        )}
      </Form.Control.Feedback>
      <Form.Text></Form.Text>
    </Form.Group>
  );
};

export default Input;
