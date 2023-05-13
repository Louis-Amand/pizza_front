import {useEffect, useState} from "react";
import axios from "axios";

// Component Crud Ingredient pizza form
export function BackIngredient() {
	const [updatedIngredient, setUpdatedIngredient] = useState();
	const [isUpdateModIg, setIsUpdateModIg] = useState(false);
	const [newIngredient, setNewIngredient] = useState();
	const [newIgPrice, setNewIgPrice] = useState();
	const [ingredients, setIngredients] = useState([]);
	const [nameBtn, setNameBtn] = useState("Fermer");

	useEffect(() => {
			axios.get('http://localhost:8080/api/ingredients').then((response) => {
				setIngredients(response.data);
			})
		}, []
	)


	const delIngredient = (id) => {
		axios.delete(`http://localhost:8080/api/deleteIngredient/${id}`).then((response) => {
			if (response.data === true) {
				setIngredients(ingredients.filter((ingredient) => ingredient.id !== id))
			}
		})
	}

	const handleNewIngredient = (event) => {
		setNewIngredient(event.target.value)
	}

	const postNewIngredient = () => {
		let id = 0

		if (ingredients !== [] && ingredients != null) {
			id = ingredients[ingredients?.length - 1]?.id + 1
		}
		if (newIngredient !== undefined && newIngredient != null) {
			axios.post('http://localhost:8080/api/ingredient', {
				name: newIngredient,
				price: newIgPrice,
				id: id
			}).then((response) => {
				setIngredients(response.data)
				setNewIngredient('')
				setNewIgPrice('')
				const listB = document.getElementById("ingredients-list");
				listB.classList.remove("unshow");
				setNameBtn("Fermer")
			})
		}
	}

	const updateIngredient = (ingredient) => {
		setUpdatedIngredient(ingredient)
		setIsUpdateModIg(true)
		setNewIngredient(ingredient.name)
		setNewIgPrice(ingredient.price)
	}

	function handleUpdateIngredient() {
		if (newIngredient !== undefined && newIngredient != null) {
			axios.put(`http://localhost:8080/api/ingredient/${updatedIngredient.id}`, {
				name: newIngredient,
				price: Math.round(newIgPrice * 100) / 100,
				id: updatedIngredient.id
			}).then((response) => {
				setIngredients(response.data)
				setIsUpdateModIg(false)
				setNewIngredient('')
				setNewIgPrice('')
				const listB = document.getElementById("ingredients-list");
				listB.classList.remove("unshow");
				setNameBtn("Fermer")
			})
		}
	}

	function handleNewIgPrice(e) {
		if (isNaN(e.target.value)) {
			alert("Veuillez saisir un prix !")
			return;
		}
		setNewIgPrice(e.target.value)
	}


	function handleColapse() {
		const listB = document.getElementById("ingredients-list");
		listB.classList.toggle("unshow");
		if (listB.classList.contains("unshow")){
			setNameBtn('Ouvrir')
		} else {
			setNameBtn("Fermer")
		}
	}

	return (
		<div className={'back-box'}>
			<div className="back-form">
				<h1>Ajouter un ingrédient</h1>
				<div>
					<input type="text" onChange={(e) => handleNewIngredient(e)} value={newIngredient ?? ""}
						   placeholder="Nom de l'ingrédient"/>
					<input type="text" onChange={(e) => handleNewIgPrice(e)} value={newIgPrice ?? ""}
						   placeholder="Prix"/>
					{isUpdateModIg ? <button onClick={() => handleUpdateIngredient()} id={'form-btn-mod'}>Modifier
							ingrédient</button> :
						<button onClick={() => postNewIngredient()} id={'form-btn'}>Créer un nouvel ingrédient</button>}

				</div>
				<button onClick={() => handleColapse()} className={"back-colapse"}>{nameBtn}</button>
			</div>
			<div id={"ingredients-list"} className={'back-elm-list'}>
				{ingredients.map((ingredient) => {
					return <div key={ingredient.id} className={"back-elements"}>
						<p>{ingredient.name} : {ingredient.price} €</p>
						<button onClick={() => updateIngredient(ingredient)} className={"btn-mod"}>Modifier</button>
						<button onClick={() => delIngredient(ingredient.id)} className={"btn-del"}>X</button>
					</div>
				})}
			</div>
		</div>
	)
}