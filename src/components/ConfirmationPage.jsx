import React from 'react';

// Display Confirmation page
const ConfirmationPage = () => {
    return (
        <div className="notification">
            <div className="logo"></div>
            <h1>Merci pour votre commande !</h1>
            <p>Votre commande a été passée avec succès et est en cours de traitement. Vous pouvez venir récupérer la pizza dans moins de 15 minutes !</p>

            <a className="button" href="/">Retour à l'accueil</a>
        </div>
    );
};

export default ConfirmationPage;
