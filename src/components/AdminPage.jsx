import {useState} from "react";
import axios from "axios";
import {admin_office} from "../router/Routes";
import {CustomPizzaPage} from "./CustomPizzaPage";

// Display Admin page (login)
export function AdminPage() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const handleEmail = (event) => {
		setEmail(event.target.value);
	}

	const handlePassword = (event) => {
		setPassword(event.target.value);
	}

	const handleLogin = () => {
		if (email == undefined ){
			alert("Veuillez saisir un email valide !")
			return;
		}

		if (password == undefined ){
			alert("Veuillez saisir un mot de passe valide !")
			return;
		}

		axios.post("http://localhost:8080/api/login",
			{
				email: email,
				password: password
			}).then((response)=>{
				if (response.data === true) {
					window.localStorage.setItem("isAuth",response.data);
					window.location = window.location.href = admin_office;
				}
		})

	}
	
	return (
		<div className="container-login">
			<div className="screen">
				<div className="screen__content">
					<div className="login">
						<div className="login__field">
							<i className="login__icon fas fa-user"></i>
							<input onChange={(e)=> handleEmail(e)} type="text" className="login__input" placeholder="Email"/>
						</div>
						<div className="login__field">
							<i className="login__icon fas fa-lock"></i>
							<input type="password" onChange={(e)=> handlePassword(e)} className="login__input" placeholder="Mot de passe"/>
						</div>
						<button onClick={handleLogin} className="button login__submit">
							<span className="button__text">Authentifiez vous</span>
							<i className="button__icon fas fa-chevron-right"></i>
						</button>
					</div>
				</div>
				<div className="screen__background">
					<span className="screen__background__shape screen__background__shape4"></span>
					<span className="screen__background__shape screen__background__shape3"></span>
					<span className="screen__background__shape screen__background__shape2"></span>
					<span className="screen__background__shape screen__background__shape1"></span>
				</div>
			</div>
		</div>
	)
}