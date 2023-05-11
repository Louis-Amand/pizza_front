import React, { useState, useEffect } from 'react';
import PizzaCard from './public/PizzaCard';

const CardPizzaPage = () => {
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/getAllPizzas');
                const data = await response.json();
                setPizzas(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données des pizzas:', error);
            }
        };

        fetchData();
    }, []);

    const handleOrder = (pizzaId) => {
        console.log(`Commande de la pizza avec l'ID ${pizzaId} en cours...`);
    };

    return (
        <div className="card-pizza-page">
            <h1 className='pizza-page-title'>Découvrez nos pizzas traditionnelles italiennes</h1>
            <p className='pizza-page-text'>Dégustez l'authenticité de l'Italie avec notre sélection de pizzas traditionnelles. Préparées selon des recettes ancestrales avec des ingrédients frais</p>
            <div className="pizza-list">
                {pizzas.map((pizza) => (
                    <PizzaCard
                        key={pizza.id}
                        image={`http://localhost:8080/ServExistingPizzaImage/${pizza.image}`}
                        title={pizza.name}
                        ingredients={pizza.ingredients}
                        onOrder={() => handleOrder(pizza.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CardPizzaPage;
