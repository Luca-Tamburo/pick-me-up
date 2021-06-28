import React from 'react'

import { Card } from 'react-bootstrap';

export default function RiepilogoCard(props) {
    return (
        <Card className="animation-card border-0 shadow">
            <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>
                    <h3 className="t-bold pb-4">Riepilogo</h3>
                    <div className="pb-3">
                        <h5 className="t-bold">Tipologia veicolo</h5>
                        <h6 className="t-light">{props.tipologiaMezzo}</h6>
                    </div>
                    <div className="pb-3">
                        <h5 className="t-bold">Richiesta autista</h5>
                        <h6 className="t-light">{props.autista}</h6>
                    </div>
                    <div className="pb-3">
                        <h5 className="t-bold">Ritiro</h5>
                        <h6 className="t-light">{`${props.dataRitiro} alle ore ${props.oraRitiro}`}</h6>
                        <h6 className="t-light">{`presso ${props.localitaRitiro}`}</h6>
                    </div>
                    <div>
                        <h5 className="t-bold">Consegna</h5>
                        <h6 className="t-light">{`${props.dataConsegna} alle ore ${props.oraConsegna}`}</h6>
                        <h6 className="t-light">{`presso ${props.localitaConsegna}`}</h6>
                    </div>
                </Card.Title>
            </Card.Body>
        </Card>
    );
}