import {useEffect, useState} from "react";
import axios from "axios";

export function BackofficePage() {
	const [updatedBase,setUpdatedBase] = useState();
	const [updatedIngredient,setUpdatedIngredient] = useState();
	const [isUpdateModIg, setIsUpdateModIg] = useState(false);
	const [isUpdateModBa, setIsUpdateModBa] = useState(false);
	const [newIngredient, setNewIngredient] = useState();
	const [newBase, setNewBase] = useState();
	const [newIgPrice, setNewIgPrice] = useState();
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
				price: newIgPrice,
				id: id
			}).then((response)=>{
				setIngredients(response.data)
				setNewIngredient('')
				setNewIgPrice('')
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
		if (newIngredient !== undefined && newIngredient != null){
			axios.put(`http://localhost:8080/api/ingredient/${updatedIngredient.id}`,{
				name: newIngredient,
				price : Math.round(newIgPrice*100)/100,
				id: updatedIngredient.id
			}).then((response)=>{
				setIngredients(response.data)
				setIsUpdateModIg(false)
				setNewIngredient('')
				setNewIgPrice('')
			})
		}
	}

	function handleNewIgPrice(e) {
		if (isNaN(e.target.value)){
			alert("Veuillez saisir un prix !")
			return;
		}
		setNewIgPrice(e.target.value)
	}


	const handleNewBase = (event) => {
		setNewBase(event.target.value)
	}

	const updateBase = (base) => {
		setUpdatedBase(base)
		setIsUpdateModBa(true)
		setNewBase(base.name)
	}

	function postNewBase() {
		let id = 0

		if (bases !== [] && bases != null){
			id = bases[bases?.length-1]?.id+1
		}
		if (newBase !== undefined && newBase != null){
			axios.post('http://localhost:8080/api/base',{
				name: newBase,
				id: id
			}).then((response)=>{
				setBases(response.data)
				setNewBase('');
			})
		}
	}

	function handleUpdateBase() {
		if (newBase !== undefined && newBase != null){
			axios.put(`http://localhost:8080/api/base/${updatedBase.id}`,{
				name: newBase,
				id: updatedBase.id
			}).then((response)=>{
				setBases(response.data)
				setIsUpdateModBa(false)
				setNewBase('');
			})
		}
	}

	function delBase(id) {
		axios.delete(`http://localhost:8080/api/deleteBase/${id}`).then((response)=>{
			if (response.data === true) {
				setBases(bases.filter((base) => base.id !== id))
			}
		})
	}

	return (
		<div className={'section-back'}>
			<div className={'back-box'}>
				<div className="back-form">
					<h1>Ajouter une base</h1>
					<div>
						<input type="text" onChange={(e)=>handleNewBase(e)}  value={newBase ?? ""} placeholder="Nom de la base"/>
						{isUpdateModBa ? <button onClick={()=>handleUpdateBase()} id={'form-btn-mod'}>Modifier Base</button> : <button onClick={()=>postNewBase()} id={'form-btn'}>Créer une nouvelle base</button>}
					</div>
				</div>
				<div className={'back-elm-list'}>
					{bases.map((base)=>{

						return <div key={base.id} className={"back-elements"}>
							<p>{base.name}</p>
							<button onClick={()=>updateBase(base)}  className={"btn-mod"}>Modifier</button>
							<button onClick={()=>delBase(base.id)} className={"btn-del"}>X</button>
						</div>
					})}
				</div>
			</div>
			<div className={'back-box'}>
				<div className="back-form">
					<h1>Ajouter un ingrédient</h1>
					<div>
						<input type="text" onChange={(e)=>handleNewIngredient(e)} value={newIngredient ?? ""} placeholder="Nom de l'ingrédient"/>
						<input type="text" onChange={(e)=>handleNewIgPrice(e)}  value={newIgPrice ?? ""} placeholder="Prix"/>
						{isUpdateModIg ? <button onClick={()=>handleUpdateIngredient()} id={'form-btn-mod'}>Modifier ingrédient</button> : <button onClick={()=>postNewIngredient()} id={'form-btn'}>Créer un nouvel ingrédient</button>}

					</div>
				</div>
				<div className={'back-elm-list'}>
					{ingredients.map((ingredient)=>{
						return <div key={ingredient.id} className={"back-elements"}>
							<p>{ingredient.name} : {ingredient.price} €</p>
							<button onClick={()=>updateIngredient(ingredient)}  className={"btn-mod"}>Modifier</button>
							<button onClick={()=>delIngredient(ingredient.id)} className={"btn-del"}>X</button>
						</div>
					})}
				</div>
			</div>
		</div>
	)
}