import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

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

        // Vérifier si les champs du formulaire sont vides
        if (
            formState.name.trim() === '' ||
            formState.firstName.trim() === '' ||
            formState.phone.trim() === '' ||
            formState.address.trim() === '' ||
            formState.cardNumber.trim() === '' ||
            formState.expiryDate.trim() === '' ||
            formState.cvv.trim() === ''
        ) {
            // Gérer le cas où un champ est vide
            console.error('Veuillez remplir tous les champs du formulaire.');
            return;
        }

        const orderId = uuidv4(); // Générer un UUID pour la commande
        const isCustom = formState.pizza.ingredients && formState.pizza.base;
        let pizzaData = {};

        if (isCustom) {
            pizzaData = {
                pizzaname: 'Générazza',
                price: formState.pizza.price,
                base: formState.pizza.base,
                ingredients: formState.pizza.ingredients
            };
        } else {
            pizzaData = {
                pizzaname: formState.pizza.type,
                price: formState.pizza.price,
            };
        }

        const orderData = {
            orderId: orderId,
            hour: new Date().toISOString(),
            name: formState.name,
            firstName: formState.firstName,
            phone: formState.phone,
            address: formState.address,
            price: formState.pizza.price,
            pizza_name: pizzaData.pizzaname,
            ...(formState.pizza.base && { pizza_base: pizzaData.base }),
            ...(formState.pizza.ingredients && { pizza_ingredients: pizzaData.ingredients })
        };

        axios
            .post('http://localhost:8080/api/commandes', orderData)
            .then(response => {
                window.localStorage.setItem(orderId, JSON.stringify(orderId));
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
                    <input type="text" name="name" onChange={handleChange} required />
                </label>
                <label>
                    Prénom :
                    <input type="text" name="firstName" onChange={handleChange} required />
                </label>
                <label>
                    Téléphone :
                    <input type="text" name="phone" onChange={handleChange} required />
                </label>
                <label>
                    Adresse :
                    <input type="text" name="address" onChange={handleChange} required />
                </label>

                <h2 className='page-title-2'>Informations bancaires :</h2>
                <label>
                    Numéro de la carte :
                    <input type="text" name="cardNumber" onChange={handleChange} required />
                </label>
                <label>
                    Date d'expiration :
                    <input type="text" name="expiryDate" onChange={handleChange} placeholder="MM/YY" required />
                </label>
                <label>
                    CVV :
                    <input type="text" name="cvv" onChange={handleChange} required />
                </label>


                <input type="submit" value="Commander" />
            </form>
        </div>
    );
};

export default CommandPage;
