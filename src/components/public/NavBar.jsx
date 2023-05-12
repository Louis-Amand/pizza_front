import {accueil, admin_office, carte, generazza} from "../../router/Routes";
import {useEffect, useState} from "react";

export function NavBar() {
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		const isAuth  = window.localStorage.getItem('isAuth')

		if (isAuth) {
			setIsAuth(isAuth)
		}

	}, []);

	const logout = () => {
		window.localStorage.removeItem('isAuth')
		window.location = window.location.href = accueil
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container">
				<a className="navbar-brand" href={accueil}>GUSTO PIZZ</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
						aria-expanded="false" aria-label="Toggle navigation"><span
					className="navbar-toggler-icon"></span></button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
						<li className="nav-item"><a className="nav-link active" aria-current="page"
													href={generazza}>Générazza</a></li>
						<li className="nav-item"><a className="nav-link" href={carte}>La carte</a></li>
						<li className="nav-item"><a className="nav-link" href="#resto">Le restaurant</a></li>
						{ isAuth ?
							<>
								<li className="nav-item"><a className="nav-link" href={admin_office}>BackOffice</a></li>
								<li className="nav-item"><a className="nav-link" style={{cursor: 'pointer'}} onClick={logout}>Déconnexion</a></li>
							</>
							: ""}
					</ul>
				</div>
			</div>
		</nav>
	)
}