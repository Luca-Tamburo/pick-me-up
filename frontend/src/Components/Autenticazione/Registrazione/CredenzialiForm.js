import React from 'react';

import { ProgressBar, Form, Container, Row, Col } from 'react-bootstrap';


import Button from '../../Utility/Button';
import InputEmail from '../../Utility/InputEmail';
import InputPassword from '../../Utility/InputPassword';

export default function CredenzialiForm() {

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100">
            <Container className="d-flex flex-column">
                <Col className="">
                    <h1 className="display-5 text-center t-bold">Registrazione</h1>
                    <ProgressBar now={80} className="my-lg-5 my-4" />
                </Col>
                <Form method="GET">
                    <Row xs={{ cols: 1 }} lg={{ cols: 2 }} className="gy-4 mb-lg-5 mb-4" >
                        <InputEmail />
                        <Col>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Cellulare</Form.Label>
                                <Form.Control type="tel" placeholder="Inserisci il numero di cellulare" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row xs={{ cols: 1 }} lg={{ cols: 2 }} className="gy-4 mb-lg-5 mb-4">
                        <InputPassword/>
                        <Col>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Conferma password</Form.Label>
                                <Form.Control type="password" placeholder="Conferma la tua password" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant={"Primary"} submit>Continua</Button>
                </Form>
            </Container>
        </Container >
    );
}