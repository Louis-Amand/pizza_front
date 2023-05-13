import * as React from 'react';
import pizzaSvg from '../img/Group 6.svg'
import pizzeria from '../img/pizzeria.jpg'
import pizzaiolo from '../img/pizzaiolo.png'
import { carte, generazza } from "../router/Routes";

export function FrontPage() {
    return (
        <>
            <section class="pres">
                <div class="left-column">
                    <div class="content">
                        <h1>GUSTO PIZZ, la pizzeria 100% Italia</h1>
                        <h2>Découvrez nos pizzas à la carte ou nos pizza personalisées avec notre superbe générateur !</h2>
                        <a href={generazza} class="custom-button">Je génère ma pizza</a>
                        <a href={carte} class="custom-button-2">Je veux voir la carte</a>
                    </div>
                </div>
                <div class="right-column">
                    <div class="image-container">
                        <img src={pizzaSvg} alt="Pizza" />
                    </div>
                </div>
            </section>

            <section class="chef-section">

                <div class="chef-container">
                    <div class="chef-item chef-image">
                        <img src={pizzaiolo} />
                    </div>

                    <div class="chef-item chef-text">
                        <h1 class="chef-title">Un chef Napolitain qui à la main dans la pate </h1>
                        <p>Découvrez notre chef pizzaiolo passionné, Antonio Rossi. Originaire de Naples, berceau de la pizza authentique, il maîtrise l'art de la pâte depuis plus de 20 ans. Antonio associe habilement tradition et innovation, utilisant des ingrédients de première qualité pour créer des pizzas uniques. Son talent et sa passion se reflètent dans chaque bouchée. Préparez-vous à un voyage gustatif inoubliable avec notre chef pizzaiolo exceptionnel, Antonio Rossi.</p>
                    </div>
                </div>
            </section>


            <section id="resto">

                <div>

                    <div class="resto-text">
                        <h1>La tradizionne de la casa</h1>
                        <p>Bienvenue chez Gusto PIZZ, un lieu où l'amour pour la cuisine italienne rencontre la convivialité et le plaisir de manger ensemble. Chez nous, vous découvrirez une ambiance chaleureuse et accueillante, associée à un service attentionné. Notre menu propose une sélection de pizzas artisanales, préparées avec soin par notre talentueux chef pizzaiolo. Chaque pizza est une combinaison parfaite d'ingrédients frais et de saveurs authentiques, créant une expérience culinaire exceptionnelle. Que vous soyez un amateur de pizza traditionnelle ou à la recherche de nouvelles saveurs, notre restaurant est l'endroit idéal pour satisfaire vos papilles et passer un moment mémorable.</p>
                    </div>
                    <div class="resto-image">
                        <img src={pizzeria} />
                    </div>
                </div>
            </section>


        </>
    );
};