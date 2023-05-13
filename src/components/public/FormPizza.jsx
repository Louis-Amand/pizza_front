import * as React from 'react';
import { Ingredient } from "./Ingredient";
import { useEffect, useState } from "react";
import axios from "axios";



export function FormPizza() {
    const [lastId, setlastId] = useState(0);
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredient, setSelectedIngredients] = useState([]);
    const [bases, setBases] = useState([]);
    const [selectedBase, setSelectedBase] = useState([]);
    const [totalPrice, setTotalPrice] = useState(11);

    useEffect(() => {
        axios.get('http://localhost:8080/api/ingredients').then((response) => {
            setIngredients(response.data);
        })
        axios.get('http://localhost:8080/api/bases').then((response) => {
            setBases(response.data);
        })
        axios.get('http://localhost:8080/api/customPizzas/lastId').then((response) => {
            setlastId(response.data);
        })
    }, []
    )

    useEffect(() => {
        // Calculer le prix total en additionnant les prix des ingrédients
        const sum = selectedIngredient.reduce((total, ingredient) => total + ingredient.price, 0);
        setTotalPrice(sum + 11); // Ajouter le prix de base
    }, [selectedIngredient]);

    function handleSelectedIngredient(event, id) {
        const ingredient = ingredients.find((ingredient) => ingredient.id === id);

        if (event.target.checked) {
            setSelectedIngredients([...selectedIngredient, ingredient]);
        } else {
            setSelectedIngredients(selectedIngredient.filter((ingredient) => ingredient.id !== id));
        }
    }

    function handleSelectedBase(event) {
        if (event.target.value !== "") {
            setSelectedBase({ name: event.target.value, id: event.target.selectedOptions[0].dataset.id });
        } else {
            alert("Veuiilez choisir une base")
        }
    }

    const handleCommand = () => {

        if (selectedBase.length === 0) {
            alert("Veuillez choisir une base")
            return;
        }

        if (selectedIngredient.length === 0) {
            alert("Veuillez choisir au moins un ingrédient")
            return;
        }


        // Passer les informations nécessaires pour la commande à la page correspondante
        const pizzaData = {
            id: lastId,
            type: "Générazza",
            price: `${totalPrice} €`,
            base: selectedBase,
            ingredients: selectedIngredient
        };
        window.location.href = `/commande?data=${encodeURIComponent(JSON.stringify(pizzaData))}`;
        // Redirection vers la page de commande avec les données de la pizza
    }

    return (
        <>
            <div className={"form"}>
                <label className={"ingredient-label"} htmlFor="">1 - Je choisis ma base :</label>
                <label className={"ingredient-label-2"}>Nos bases sont au tarif de 11 €</label>
                <select onChange={(e) => handleSelectedBase(e)} className={"custom-select"} id="base-pizza">
                    <option value="">je selectionne une base</option>
                    {bases.map((base) => {
                        return <option
                            value={base.name}
                            key={base.id} data-id={base.id}>{base.name}
                        </option>
                    })}
                </select>
                <div className={"ingredient"}>
                    <label className={"ingredient-label"} htmlFor="">2 - Je choisis mes ingredients :</label>
                    {ingredients.map((ingredient) => {
                        return <Ingredient
                            onClick={handleSelectedIngredient}
                            key={ingredient.id}
                            name={ingredient.name}
                            price={ingredient.price}
                            id={ingredient.id}
                        />
                    })}
                </div>
                <p className="total-price">Total: {totalPrice} €</p>
                <button onClick={handleCommand} className={'btn btn-commande'}>Commander</button>
            </div>
        </>
    );
};