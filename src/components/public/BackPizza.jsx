import {useEffect, useState} from "react";
import axios from "axios";
import {Ingredient} from "./Ingredient";
import * as React from "react";

export function BackPizza() {
	const [updatedPizza, setUpdatedPizza] = useState();
	const [isUpdateModPizza, setIsUpdateModPizza] = useState(false);
	const [newPizza, setNewPizza] = useState();
	const [bases, setBases] = useState([]);
	const [ingredients, setIngredients] = useState([]);
	const [pizzas, setPizzas] = useState([]);
	const [selectedIngredient, setSelectedIngredients] = useState([]);
	const [newPzPrice, setNewPzPrice] = useState();


	useEffect(() => {
		axios.get('http://localhost:8080/api/bases').then((response) => {
			setBases(response.data);
		})
		axios.get('http://localhost:8080/api/ingredients').then((response) => {
			setIngredients(response.data);
		})
		axios.get('http://localhost:8080/api/getAllPizzas').then((response) => {
			setPizzas(response.data);
		})
	}, [])


	const handleNewPizza = (event) => {
		setNewPizza(event.target.value)
	}

	const updatePizza = (pizza) => {
		setUpdatedPizza(pizza)
		setIsUpdateModPizza(true)
		setNewPizza(pizza.name)
	}

	function postNewPizza() {
		let id = 0

		if (pizzas !== [] && pizzas != null) {
			id = pizzas[pizzas?.length - 1]?.id + 1
		}
		if (newPizza !== undefined && newPizza != null && !isNaN(newPzPrice)) {
			axios.post('http://localhost:8080/api/pizza', {
				id: id,
				name: newPizza,
				image: "pizza.png",
				price : parseFloat(newPzPrice),
				ingredients: selectedIngredient
			}).then((response) => {
				setPizzas(response.data)
				setNewPizza('');
			})
		} else {
			alert("erreur dans la création de la pizza")
		}
	}

	function handleUpdatePizza() {
		if (newPizza !== undefined && newPizza != null) {
			axios.put(`http://localhost:8080/api/base/${updatedPizza.id}`, {
				name: newPizza,
				price : newPzPrice,
				ingredients: selectedIngredient,
				image: "pizza.png",
				id: updatedPizza.id
			}).then((response) => {
				setPizzas(response.data)
				setIsUpdateModPizza(false)
				setNewPizza('');
			})
		}
	}

	function handleNewPzPrice(e) {
		if (isNaN(e.target.value)) {
			alert("Veuillez saisir un prix !")
			return;
		}
		setNewPzPrice(e.target.value)
	}

	function delPizza(id) {
		axios.delete(`http://localhost:8080/api/deletePizza/${id}`).then((response) => {
			if (response.data === true) {
				setPizzas(pizzas.filter((pizza) => pizza.id !== id))
			}
		})
	}

	function handleSelectedIngredient(event, id) {
		const ingredient = ingredients.find((ingredient) => ingredient.id === id);

		if (event.target.checked) {
			setSelectedIngredients([...selectedIngredient, ingredient]);
		} else {
			setSelectedIngredients(selectedIngredient.filter((ingredient) => ingredient.id !== id));
		}
	}

	return (
		<div className={'back-box'}>
			<div className="back-form">
				<h1>Ajouter une pizza</h1>
				<div>
					<input type="text" onChange={(e) => handleNewPizza(e)} value={newPizza ?? ""}
						   placeholder="Nom de la Pizza"/>
					<input type="text" onChange={(e) => handleNewPzPrice(e)} value={newPzPrice ?? ""}
						   placeholder="Prix"/>
					{ingredients.map((ingredient) => {
						return <Ingredient
							onClick={handleSelectedIngredient}
							key={ingredient.id}
							name={ingredient.name}
							price={ingredient.price}
							id={ingredient.id}
						/>
					})}
					{isUpdateModPizza ?
						<button onClick={() => handleUpdatePizza()} id={'form-btn-mod'}>Modifier Pizza</button> :
						<button onClick={() => postNewPizza()} id={'form-btn'}>Créer une nouvelle pizza</button>}
				</div>
			</div>
			<div className={'back-elm-list'}>
				{pizzas.map((pizza) => {

					return <div key={pizza.id} className={"back-elements"}>
						<div>
							<p>{pizza.name}</p>
							<ul>
								{pizza?.ingredients.map((ingredient, key) => {
									return <li key={key}>{ingredient}</li>
								})}
							</ul>
						</div>
						<button onClick={() => updatePizza(pizza)} className={"btn-mod"}>Modifier</button>
						<button onClick={() => delPizza(pizza.id)} className={"btn-del"}>X</button>
					</div>
				})}
			</div>
		</div>
	)
}