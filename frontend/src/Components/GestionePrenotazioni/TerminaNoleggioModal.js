import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import useSession from '../../Hooks/useSession'
import axios from 'axios';

import PlacesAutocomplete, { geocodeByAddress, geoLatLng } from 'react-places-autocomplete'

// Bootstrap Components
import { Row, Col, Modal, Form, Card } from 'react-bootstrap'

// Custom Components
import Button from '../Utility/Button';
import AlertMessage from '../Utility/AlertMessage';

function SelectCard(props) {
    return (
        <Card className="animation-card border-0 shadow h-100">
            <Card.Body>
                <Card.Title className="t-bold">
                    {props.title}
                </Card.Title>
                <Card.Text className="t-light">
                    {props.text}
                </Card.Text>
                {props.children}
            </Card.Body>
            <Button spinner={props.spinner} onClick={props.onClick} variant={"Primary"}>Termina noleggio</Button>
        </Card>
    );
}

export default function TerminaNoleggioModal(props) {
    const { session, setSession } = useSession();
    const [address, setAddress] = useState("")
    const history = useHistory()
    const [state, setState] = useState({
        error: {
            show: false,
        },
        success: {
            show: false
        },
        submit: false
    })

    async function handleSelect(value) {
        
    }

    function terminaNoleggio(e) {
        e.preventDefault()
        setState({ ...state, submit: true })
        try {
            axios.put("/gestione-prenotazione/terminaNoleggio", { _id: props.id, idUtente: session.id })
                .then(res => {
                    window.sessionStorage.setItem("prenotazioni", JSON.stringify(res.data.prenotazioni))
                    setState({ ...state, submit: false, success: { show: true, message: res.data.message } })
                })
                .catch(err => {
                    setState({ ...state, submit: false, error: { show: true, message: err.response.data } })
                })
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    function terminaNoleggioDeposito(e) {
        e.preventDefault()
        const deposito = document.querySelector("#depositiSelect").value
        try {
            axios.put("/gestione-prenotazione/terminaNoleggio", { _id: props.id, idUtente: session.id, consegna: deposito })
                .then(res => {
                    window.sessionStorage.setItem("prenotazioni", JSON.stringify(res.data.prenotazioni))
                    setState({ ...state, submit: false, success: { show: true, message: res.data.message } })
                })
                .catch(err => {
                    setState({ ...state, submit: false, error: { show: true, message: err.response.data } })
                })
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="terminaNoleggioModal"
            centered>
            <Modal.Header>
                <Modal.Title className="t-bold" id="terminaNoleggioModal">
                    Termina noleggio
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.success.show || state.error.show ?
                    <AlertMessage
                        show={state.success.show || state.error.show}
                        variant={state.success.show ? "success" : "danger"}
                        header={state.success.show ? "Noleggio terminato con successo" : "Operazione fallita!"}
                        body={state.success.show ? state.success.message : state.error.message}
                        button={"Chiudi"}
                        onClick={() => { state.success.show ? history.go(0) : setState({ ...state, error: { show: false } }) }} />
                    : <React.Fragment>
                        <Row className="gy-4">
                            <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }}>
                                <SelectCard
                                    title={"Località pattuita"}
                                    text={"Hai consegnato il veicolo presso la località pattuita in fase di prenotazione?"}
                                    onClick={terminaNoleggio}
                                    spinner={state.submit} />
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 5, offset: 1 }}>
                                <SelectCard
                                    title={"Altra località dell'azienda"}
                                    text={"Hai consegnato il veicolo presso un parcheggio o stallo diverso da quello pattuito?"}
                                    onClick={terminaNoleggioDeposito}>
                                    <Form >
                                        <Row className="gy-4" >
                                            <Col xs={{ span: 12 }}>
                                                <Form.Group controlId="depositiSelect">
                                                    <Form.Label>Località di consegna</Form.Label>
                                                    <Form.Control as={"select"} placeholder="Inserisci il nuovo numero di cellulare" className="form-select" required>
                                                        <option value="" selected disabled>Seleziona località di consegna</option>
                                                        {props.depositi ? props.depositi.map(key => {
                                                            return (<option value={key._id}>{key.nome}</option>)
                                                        }) : null}
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={{ span: 12 }} lg={{ span: 10, offset: 1 }} className="buttonsGroup justify-content-end">
                                                {/* <Button variant={"Secondary"} onClick={props.onHide}>Annulla</Button>
                                                
                                                <Button spinner={state.submit} variant={"Primary"} submit>Conferma</Button> */}
                                            </Col>
                                        </Row>
                                    </Form>
                                </SelectCard>
                            </Col>
                            <Col xs={{ span: 12 }} lg={{ span: 5 }}>
                                <PlacesAutocomplete
                                    value={address}
                                    onChange={setAddress}
                                    onSelect={handleSelect}
                                >{({ getInputProps, suggestions, getSuggestionItemProps, loading }) =>
                                (<div>
                                    <input {...getInputProps({ placeholder: "Inserisci indirizzo" })} />
                                    <div>
                                        {loading ? <div>Caricamento...</div> : null}
                                        {console.log(suggestions)}
                                        {suggestions.map((suggestion) => {
                                            const style = {
                                                backgroundColor: suggestion.active ? "red" : "white"
                                            }

                                            return (
                                                <div {...getSuggestionItemProps(suggestion, { style })}>
                                                    {suggestion.description}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>)
                                    }</PlacesAutocomplete>
                                {/* <SelectCard
                                    title={"Altro"}
                                    text={"Hai consegnato il veicolo al di fuori di un nostro parcheggio o stallo?"} /> */}
                            </Col>
                        </Row>
                    </React.Fragment>
                }
            </Modal.Body>
        </Modal>
    );
}
