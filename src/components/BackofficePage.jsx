import {useEffect, useState} from "react";
import axios from "axios";

export function BackofficePage() {
	const [updatedIngredient,setUpdatedIngredient] = useState();
	const [isUpdateMod, setIsUpdateMod] = useState(false);
	const [newIngredient, setNewIngredient] = useState();
	const [ingredients, setIngredients] = useState([]);
	const [bases, setBases] = useState([]);

	useEffect(() => {
			axios.get('http://localhost:8080/api/ingredients').then((response) => {
				setIngredients(response.data);
			})
			axios.get('http://localhost:8080/api/bases').then((response) => {
				setBases(response.data);
			})
		}, []
	)

	const delIngredient = (id) => {
		axios.delete(`http://localhost:8080/api/deleteIngredient/${id}`).then((response)=>{
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

		if (ingredients !== [] && ingredients != null){
			id = ingredients[ingredients?.length-1]?.id+1
		}
		if (newIngredient !== undefined && newIngredient != null){
			axios.post('http://localhost:8080/api/ingredient',{
				name: newIngredient,
				id: id
			}).then((response)=>{
				setIngredients(response.data)
			})
		}
	}

	const updateIngredient = (ingredient) => {
		setUpdatedIngredient(ingredient)
		setIsUpdateMod(true)
		setNewIngredient(ingredient.name)
	}

	function handleUpdate() {
		if (newIngredient !== undefined && newIngredient != null){
			axios.put(`http://localhost:8080/api/ingredient/${updatedIngredient.id}`,{
				name: newIngredient,
				id: updatedIngredient.id
			}).then((response)=>{
				setIngredients(response.data)
			})
		}
	}

	return (
		<div>
			<div className={'back-box'}>
				<div className="back-form">
					<h1>Ajouter une base</h1>
					<div>
						<input type="text" name="field1" placeholder="Nom de la base"/>
						<button id={'form-btn'}>Créer un nouvel ingrédient</button>

					</div>
				</div>
				<div className={'back-elm-list'}>

				</div>
			</div>
			<div className={'back-box'}>
				<div className="back-form">
					<h1>Ajouter un ingrédient</h1>
					<div>
						<input type="text" onChange={(e)=>handleNewIngredient(e)} value={newIngredient ?? ""} placeholder="Nom de l'ingrédient"/>
						{isUpdateMod ? <button onClick={()=>handleUpdate()} id={'form-btn-mod'}>Modifier ingrédient</button> : <button onClick={()=>postNewIngredient()} id={'form-btn'}>Créer un nouvel ingrédient</button>}

					</div>
				</div>
				<div className={'back-elm-list'}>
					{ingredients.map((ingredient)=>{
						return <div key={ingredient.id} className={"back-elements"}>
							<p>{ingredient.name}</p>
							<button onClick={()=>updateIngredient(ingredient)}  className={"btn-mod"}>Modifier</button>
							<button onClick={()=>delIngredient(ingredient.id)} className={"btn-del"}>X</button>
						</div>
					})}
				</div>
			</div>
		</div>
	)
}