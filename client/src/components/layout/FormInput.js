import React from "react";
import Form from "react-bootstrap/Form";

const Input = ({ label, fieldPlaceholder, type, textClass, isRequired }) => {
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>{isRequired ? `${label} *` : label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={fieldPlaceholder}
        required={isRequired}
      />
      <Form.Text className={textClass}></Form.Text>
    </Form.Group>
  );
};

export default Input;
