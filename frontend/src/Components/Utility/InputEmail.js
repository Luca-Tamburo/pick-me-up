import React, { useState, useEffect } from 'react'

// Bootstrap Components
import { Col, Form } from 'react-bootstrap';

// Input Email
export default function InputEmail() {
    const [validateFormat, setValidateFormat] = useState(false);

    // Check email format
    useEffect(() => {
        if (validateFormat) {
            let regex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
            let emailInput = document.querySelector("#email");
            let error = document.querySelector("#emailFormatError");
            let match = regex.test(emailInput.value);
            if (!match) {
                emailInput.classList.add("border-danger", "text-danger");
                error.classList.remove("d-none");
            } else {
                emailInput.classList.remove("border-danger", "text-danger");
                emailInput.classList.add("border-success", "text-success");
                error.classList.add("d-none");
            }
        }
        setValidateFormat(false);
    }, [validateFormat])

    return (
        <Col xs={12}>
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Inserisci la tua email" onBlur={() => setValidateFormat(true)} />
                <Form.Text id="emailFormatError" className="text-danger d-none">Formato email non valido!</Form.Text>
            </Form.Group>
        </Col>
    );
}