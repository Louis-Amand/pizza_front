import {useEffect, useState} from "react";
import axios from "axios";

export function BackBase() {
	const [updatedBase,setUpdatedBase] = useState();
	const [isUpdateModBa, setIsUpdateModBa] = useState(false);
	const [newBase, setNewBase] = useState();
	const [bases, setBases] = useState([]);
	const [nameBtnBase, setNameBtnBase] = useState("Fermer");


	useEffect(() => {
			axios.get('http://localhost:8080/api/bases').then((response) => {
				setBases(response.data);
			})
		}, []
	)


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
				const list = document.getElementById("base-list");
				list.classList.remove('unshow')
				setNameBtnBase("Fermer")
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
				const list = document.getElementById("base-list");
				list.classList.remove('unshow')
				setNameBtnBase("Fermer")
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

	function handleColapse() {
		const list = document.getElementById("base-list");
		list.classList.toggle('unshow')
		if (list.classList.contains("unshow")){
			setNameBtnBase('Ouvrir')
		} else {
			setNameBtnBase("Fermer")
		}
	}

	return (
		<div className={'back-box'}>
			<div className="back-form">
				<h1>Ajouter une base</h1>
				<div>
					<input type="text" onChange={(e)=>handleNewBase(e)}  value={newBase ?? ""} placeholder="Nom de la base"/>
					{isUpdateModBa ? <button onClick={()=>handleUpdateBase()} id={'form-btn-mod'}>Modifier Base</button> : <button onClick={()=>postNewBase()} id={'form-btn'}>Créer une nouvelle base</button>}
				</div>
				<button onClick={() => handleColapse()} className={"back-colapse"}>{nameBtnBase}</button>
			</div>
			<div id={"base-list"} className={'back-elm-list'}>
				{bases.map((base)=>{

					return <div key={base.id} className={"back-elements"}>
						<p>{base.name}</p>
						<button onClick={()=>updateBase(base)}  className={"btn-mod"}>Modifier</button>
						<button onClick={()=>delBase(base.id)} className={"btn-del"}>X</button>
					</div>
				})}
			</div>
		</div>
	)
}