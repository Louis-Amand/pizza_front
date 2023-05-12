import * as React from 'react';
import {Ingredient} from "./Ingredient";
import {useEffect, useState} from "react";
import axios from "axios";

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

export function FormPizza() {
    const [lastId, setlastId] = useState(0);
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredient, setSelectedIngredients] = useState([]);
    const [bases, setBases] = useState([]);
    const [selectedBase, setSelectedBase] = useState([]);

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
            setSelectedBase({name: event.target.value, id: event.target.selectedOptions[0].dataset.id});
        } else {
            alert("Veuiilez choisir une base")
        }
    }

    const handleCommand = () => {
        const uudi = uuidv4();
        window.localStorage.setItem(uudi, JSON.stringify(uudi));

        if (selectedBase.length === 0) {
            alert("Veuillez choisir une base")
            return;
        }

        if (selectedIngredient.length === 0) {
            alert("Veuillez choisir au moins un ingrédient")
            return;
        }

        axios.post('http://localhost:8080/api/customPizza', {
            uuid: uudi,
            id: lastId,
            base: selectedBase,
            ingredients: selectedIngredient
        }).then((response) => {
            console.log(response)
            alert("Votre pizza a bien été commandé")
        })

    }

    return (
        <>
            <div className={"form"}>
                <label className={"base"} htmlFor="">Base</label>
                <select onChange={(e) => handleSelectedBase(e)} className={"custom-select"} id="base-pizza">
                    <option value="">Ajouté une Base</option>
                    {bases.map((base) => {
                        return <option
                            value={base.name}
                            key={base.id} data-id={base.id}>{base.name}
                        </option>
                    })}
                </select>
                <div className={"ingredient"}>
                    <label className={"ingredient-label"} htmlFor="">Ingredient</label>
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
                <button onClick={handleCommand} className={'btn btn-commande'}>Commander la pizza</button>
            </div>
        </>
    );
};