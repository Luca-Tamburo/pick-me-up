import React from 'react';

import SchermataOperazioneCompletata from '../SchermataOperazioneCompletata';

// Schermata Recupero Password Completato
export default function RecuperoPasswordCompletato() {
    return (
        <SchermataOperazioneCompletata
            imagePath={"/assets/svg/email-sent.svg"}
            imageAlt={"Email sent"}
            title={"Recupero passwod completato"}
            buttonTo={"/login"}
            buttonLabel={"Accedi"}>
            Ti abbiamo inviato una email contenente una nuova password generata dal sistema.
        </SchermataOperazioneCompletata>
    );
}