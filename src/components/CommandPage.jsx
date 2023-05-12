import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommandPage = () => {
    const [formState, setFormState] = useState({
        name: '',
        firstName: '',
        phone: '',
        address: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        pizza: {} // Objet pizza qui sera rempli avec les données transmises
    });

    useEffect(() => {
        // Récupérer les données de la pizza transmises via l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const pizzaData = JSON.parse(urlParams.get('data'));
        setFormState(prevState => ({ ...prevState, pizza: pizzaData }));
    }, []);

    const handleChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formState);
        axios.post('/api/commandes', formState)
            .then(response => {
                console.log(response);
                // Rediriger l'utilisateur vers une autre page ou afficher un message de succès
            })
            .catch(error => {
                console.error(error);
                // Gérer l'erreur (par exemple, afficher un message d'erreur à l'utilisateur)
            });
    };

    return (
        <div>
            <h1 className='page-title'>Je finalise ma commande</h1>
            <h2 className='page-title-2'>Récapitulatif de la commande :</h2>
            <div className='data-row'>
                <p>Type de pizza :<span className='value'> {formState.pizza.type}</span></p>
                <p>&nbsp;au prix de :<span className='value'> {formState.pizza.price}</span></p>
            </div>
            <h2 className='page-title-2'>Informations de contact :</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nom :
                    <input type="text" name="name" onChange={handleChange} />
                </label>
                <label>
                    Prénom :
                    <input type="text" name="firstName" onChange={handleChange} />
                </label>
                <label>
                    Téléphone :
                    <input type="text" name="phone" onChange={handleChange} />
                </label>
                <label>
                    Adresse :
                    <input type="text" name="address" onChange={handleChange} />
                </label>

                <h2 className='page-title-2'>Informations bancaires :</h2>
                <label>
                    Numéro de la carte :
                    <input type="text" name="cardNumber" onChange={handleChange} />
                </label>
                <label>
                    Date d'expiration :
                    <input type="text" name="expiryDate" onChange={handleChange} placeholder="MM/YY" />
                </label>
                <label>
                    CVV :
                    <input type="text" name="cvv" onChange={handleChange} />
                </label>

                <input type="submit" value="Commander" />
            </form>
        </div>
    );
};

export default CommandPage;
