import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import useSession from '../../../Hooks/useSession'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

// Bootstrap Components
import { Row, Col, Modal, Form, Tooltip, OverlayTrigger } from 'react-bootstrap'

// Custom Components
import Button from '../../Utility/Button';
import AlertMessage from '../../Utility/AlertMessage';

export default function ModificaMetodoModal(props) {
    const { session, setSession } = useSession();
    const history = useHistory()
    const [state, setState] = useState({
        error: {
            show: false,
        },
        success: {
            show: false,
        },
        submit: false
    })

    function onSubmit(e) {
        e.preventDefault();
        const tipologiaPatenteInput = document.getElementById("tipologiaPatente");
        const numeroPatenteInput = document.getElementById("numeroPatente");
        const dataScadenzaPatente = document.getElementById("dataScadenzaPatente");
        const ufficioRilascioInput = document.getElementById("ufficioRilascio");
        const data = {
            id: session.id,
            patente: {
                tipologiaPatente: tipologiaPatenteInput.value,
                numeroPatente: numeroPatenteInput.value,
                dataScadenza: dataScadenzaPatente.value,
                ufficioRilascio: ufficioRilascioInput.value,
            },
        }
        setState({ ...state, submit: true });
        try {
            axios.put("/patente/modificaPatente", data)
                .then(res => {
                    setSession({ ...session, patente: res.data.patente })
                    setState({ ...state, submit: false, success: { show: true, message: res.data.message } })
                })
                .catch(err => {
                    setState({ ...state, submit: false, error: { show: true, message: err.response.data } });
                })
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="modificaCellulareModal"
            centered>
            <Modal.Header>
                <Modal.Title className="t-bold" id="modificaCellulareModal">
                    Modifica metodo di pagamento
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.success.show || state.error.show ?
                    <AlertMessage
                        show={state.success.show || state.error.show}
                        variant={state.success.show ? "success" : "danger"}
                        header={state.success.show ? "Operazione completata con successo" : "Operazione fallita!"}
                        body={state.success.show ? state.success.message : state.error.message}
                        button={"Indietro"}
                        onClick={() => { state.success ? history.go(0) : setState({ ...state, error: { show: false } }) }} />
                    : <Form onSubmit={onSubmit}>
                        <Row className="gy-4" >
                            <Col xs={{ span: 12 }} lg={{ span: 5, offset: 1 }}>
                                <Form.Group controlId="tipologiaPatente">
                                    <Form.Label>Patente di guida</Form.Label>
                                    <Form.Control className="form-select" as="select" required>
                                        <option value="" disabled selected>{session.patente.tipologiaPatente}</option>
                                        <option value="AM">AM</option>
                                        <option value="A1">A1</option>
                                        <option value="A2">A2</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 5 }}>
                                <Form.Group controlId="numeroPatente">
                                    <Form.Label className="me-2">Numero Patente</Form.Label>
                                    <OverlayTrigger
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id="numeroCartaInfo">
                                                Il numero della patente per risultare valida deve essere composta da:
                                                <br />• 2 Lettere
                                                <br />• 7 Cifre
                                                <br />• 1 Lettera finale
                                                <br />Ad esempio: AB1234567C
                                            </Tooltip>
                                        }
                                    >
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                    </OverlayTrigger>
                                    <Form.Control type="text" placeholder={session.patente.numeroPatente} pattern="[a-zA-Z]{2}\d{7}[a-zA-Z]{1}" required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 6 }} lg={{ span: 5, offset: 1 }} >
                                <Form.Group controlId="dataScadenzaPatente">
                                    <Form.Label>Data di scadenza</Form.Label>
                                    <Form.Control type="date" placeholder={session.patente.dataScadenza} required />
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 6 }} lg={{ span: 5 }}>
                            <Form.Group controlId="ufficioRilascio">
                                    <Form.Label>Ufficio di rilascio</Form.Label>
                                    <Form.Control className="form-select" as="select" required>
                                        <option value="" disabled selected>Seleziona...</option>
                                        <option value="Prefettura">Prefettura</option>
                                        <option value="MCTC">MCTC</option>
                                        <option value="MIT-UCO">MIT-UCO</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1}} className="buttonsGroup justify-content-end">
                                <Button variant={"Secondary"} onClick={props.onHide}>Annulla</Button>
                                <Button spinner={state.submit} variant={"Primary"} submit>Conferma</Button>
                            </Col>
                        </Row>
                    </Form>
                }
            </Modal.Body>
        </Modal>
    );
}