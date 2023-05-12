import * as React from 'react';
import pizzaSvg from '../img/Group 6.svg'
import pizza from '../img/pizza-3000285_1280.png'
import pizzeria from '../img/pizzeria.jpg'
import pizzaiolo from '../img/pizzaiolo.png'
import {useEffect, useState} from "react";
import PizzaCard from "./public/PizzaCard";
import {Link} from "react-router-dom";
import {generazza} from "../router/Routes";
export function FrontPage() {
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
        <>

            <section class="py-5">
                <div class="container my-5">
                    <div class="row justify-content-center">
                        <div class="col-lg-6">
                            <h2>GUSTO PIZZ, CONSTRUIS TA PIZZA SUR MESURE</h2>
                            <p>La meilleur Pizza de Bordeaux se trouve chez Gusto PIZZ</p>
                            <Link to={generazza} class="button4" style={{backgroundColor:"#84f14e"}}>Je crée ma pizza ↳</Link>

                        </div>
                        <div class="col-lg-6">
                            <img src={pizzaSvg} width="400"
                                 height="380"/>
                        </div>
                    </div>
                </div>
            </section>

            <section class="py-5">
                <h1 class="text-center">Le chef</h1>
                <div class="container my-5">
                    <div class="row justify-content-center">
                        <div class="col-lg-6">
                            <img src={pizzaiolo}/>
                        </div>
                        <div class="col-lg-6">
                            <p>Découvrez notre chef pizzaiolo passionné, Antonio Rossi. Originaire de Naples, berceau de la pizza authentique, il maîtrise l'art de la pâte depuis plus de 20 ans. Antonio associe habilement tradition et innovation, utilisant des ingrédients de première qualité pour créer des pizzas uniques. Son talent et sa passion se reflètent dans chaque bouchée. Préparez-vous à un voyage gustatif inoubliable avec notre chef pizzaiolo exceptionnel, Antonio Rossi.</p>
                        </div>

                    </div>
                </div>
            </section>

            <section class="py-5 p-3 mb-2 bg-light text-dark rounded" style={{margin: "50px"}}>
                <h2 class="text-center" style={{margin: "50px"}}>Nos pizzas</h2>
                <div class="card-deck">
                    <div class="row justify-content-around">
                        {pizzas.splice(-3).map((pizza) => (
                            <PizzaCard
                                key={pizza.id}
                                image={`http://localhost:8080/ServExistingPizzaImage/${pizza.image}`}
                                title={pizza.name}
                                price={pizza.price}
                                ingredients={pizza.ingredients}
                                onOrder={() => handleOrder(pizza.id)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section class="py-5" id={"resto"}>
                <h1 class="text-center">Le restaurant</h1>
                <div class="container my-5">
                    <div class="row justify-content-center">
                        <div class="col-lg-6">
                            <p>Bienvenue chez Gusto PIZZ, un lieu où l'amour pour la cuisine italienne rencontre la convivialité et le plaisir de manger ensemble. Chez nous, vous découvrirez une ambiance chaleureuse et accueillante, associée à un service attentionné. Notre menu propose une sélection de pizzas artisanales, préparées avec soin par notre talentueux chef pizzaiolo. Chaque pizza est une combinaison parfaite d'ingrédients frais et de saveurs authentiques, créant une expérience culinaire exceptionnelle. Que vous soyez un amateur de pizza traditionnelle ou à la recherche de nouvelles saveurs, notre restaurant est l'endroit idéal pour satisfaire vos papilles et passer un moment mémorable.</p>
                        </div>
                        <div class="col-lg-6">
                            <img src={pizzeria} width="400"
                                 height="266"/>
                        </div>

                    </div>
                </div>
            </section>

        </>
    );
};