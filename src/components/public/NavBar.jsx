import { accueil, admin_office, carte, generazza, admin } from "../../router/Routes";
import { useEffect, useState } from "react";

export function NavBar() {
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		const isAuth = window.localStorage.getItem('isAuth')

		if (isAuth) {
			setIsAuth(isAuth)
		}

	}, []);

	const logout = () => {
		window.localStorage.removeItem('isAuth')
		window.location = window.location.href = accueil
	}

	return (
		<nav>
			<div className="container">
				<ul>
					<li><a className="navbar-brand" href={accueil}>GUSTO PIZZ</a></li>
					<div className="right">
						<li><a href="/">Accueil</a></li>
						<li><a href={carte}>Découvrir la carte</a></li>
						<li><a href={generazza}>Générateur de pizza</a></li>
						{isAuth ? (
							<>
								<li><a href={admin_office}>BackOffice</a></li>
								<li><a style={{ cursor: 'pointer' }} onClick={logout}>Déconnexion</a></li>
							</>
						) : (
							<li><a href={admin}>Connexion</a></li>
						)}
					</div>
				</ul>
			</div>
		</nav>
	);

}