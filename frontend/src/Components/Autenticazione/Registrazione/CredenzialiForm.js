import React, { useState } from 'react';
import { useHistory } from 'react-router';
import useSession from '../../../Hooks/useSession';
import axios from 'axios';

// Bootstrap Components
import { ProgressBar, Form, Container, Row, Col } from 'react-bootstrap';

// Custom Components
import Button from '../../Utility/Button';
import InputEmail from '../../Utility/FormsUtility/InputEmail';
import InputPassword from '../../Utility/FormsUtility/InputPassword';
import AlertMessage from '../../Utility/AlertMessage';

const CryptoJS = require("crypto-js");

// Form credenziali di accesso
export default function CredenzialiForm() {
    const history = useHistory();
    const { session, setSession } = useSession()
    const [state, setState] = useState({
        error: {
            show: false,
        },
        submit: false
    });

    function registrazioneCliente(e) {
        e.preventDefault();
        // Controllo che la password e la conferma combacino
        if (document.querySelector("#signupPassword").value !== document.querySelector("#confermaPassword").value) {
            document.querySelector("#confermaPasswordError").classList.remove("d-none");
            return
        } else {
            // Cripto la password e aggiorno i dati dell'utente
            const encryptedPassword = CryptoJS.AES.encrypt(document.querySelector("#signupPassword").value, "pick-me-up").toString();
            const userData = {
                ...history.location.state.payload,
                credenziali: {
                    cellulare: document.querySelector("#cellulare").value,
                    email: document.querySelector("#signupEmail").value,
                    password: encryptedPassword,
                }
            }
            setState({ ...state, submit: true });
            try {
                // Mando una richiesta al server per registrare l'utente, passando i dati inseriti
                axios.post("/autenticazione/registraUtente", userData)
                    .then((res) => {
                        // 201 CREATED: visualizza la schermata di registrazione completata
                        history.push("/signup", {
                            type: "COMPLETATO"
                        });
                    })
                    .catch(err => {
                        // 400 BAD REQUEST: visualizza messaggio di errore "Account già esistente"
                        setState({
                            error: {
                                show: true,
                                message: err.response.data
                            },
                            submit: false
                        })
                    })
            } catch (err) {
                console.log(err.response.data.msg);
            }
        }
    }

    function registrazioneImpiegato(e) {
        e.preventDefault()
        const userData = {
            ...history.location.state.payload,
            credenziali: {
                cellulare: document.querySelector("#cellulare").value,
                email: document.querySelector("#signupEmail").value,
            }
        }
        setState({ ...state, submit: true });
        try {
            // Mando una richiesta al server per registrare l'utente, passando i dati inseriti
            axios.post("/autenticazione/registraImpiegato", userData)
                .then((res) => {
                    // 201 CREATED: visualizza la schermata di registrazione completata
                    history.push("/registrazione-impiegato", {
                        type: "COMPLETATO"
                    });
                })
                .catch(err => {
                    // 400 BAD REQUEST: visualizza messaggio di errore "Account già esistente"
                    setState({
                        error: {
                            show: true,
                            message: err.response.data
                        },
                        submit: false
                    })
                })
        } catch (err) {
            console.log(err.response.data.msg);
        }
    }

    return (
        <Container fluid className="d-flex align-items-center justify-content-center h-100">
            <Row className="gy-5">
                <Col xs={{ span: 10, offset: 1 }}>
                    <AlertMessage
                        show={state.error.show}
                        variant={"danger"}
                        header={"Registrazione fallita!"}
                        body={state.error.message}
                        to={session && "/login"}
                        button={!session ? "Accedi" : "Chiudi"}
                        onClick={(session && session.user === "AMMINISTRATORE") ? () => setState({ ...state, error: { show: false } }) : null} />
                </Col>
                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                    <h1 className="h1 text-center t-bold mb-4">Registrazione</h1>
                    <ProgressBar now={80} className="mb-4" />
                    <Form
                        onSubmit={history.location.state.payload.tipologiaUtente === "CLIENTE" ? registrazioneCliente : registrazioneImpiegato}
                        onClick={() => setState({ ...state, error: { show: false } })}>
                        <Row className="gy-4" >
                            <Col xs={{ span: 6 }} lg={{ span: 6 }}>
                                <InputEmail controlId={"signupEmail"} required />
                            </Col>
                            <Col xs={{ span: 6 }} lg={{ span: 6 }}>
                                <Form.Group controlId="cellulare">
                                    <Form.Label>Cellulare</Form.Label>
                                    <Form.Control type="tel" placeholder="Inserisci il numero di cellulare" pattern="^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{6,7}$" required />
                                </Form.Group>
                            </Col>
                            {!session &&
                                <><Col xs={{ span: 6 }} lg={{ span: 6 }}>
                                    <InputPassword tooltip controlId={"signupPassword"} placeholder={"Inserisci la password"}>
                                        Password
                                    </InputPassword>
                                </Col>
                                    <Col xs={{ span: 6 }} lg={{ span: 6 }}>
                                        <InputPassword controlId={"confermaPassword"} placeholder={"Conferma la tua password"}>
                                            Conferma password
                                        </InputPassword>
                                        <Form.Text id="confermaPasswordError" className="d-none text-danger">Le password non coincidono!</Form.Text>
                                    </Col></>}
                            <Button spinner={state.submit} variant={"Primary"} submit>Continua</Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container >
    );
}