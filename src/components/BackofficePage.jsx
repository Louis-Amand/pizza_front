import {BackBase} from "./public/BackBase";
import {BackIngredient} from "./public/BackIngredient";
import {BackPizza} from "./public/BackPizza";

// BackofficePage display BackOffice
export function BackofficePage() {

	return (
		<div className={'section-back'}>
			<BackBase/>
			<BackIngredient	/>
			<BackPizza/>
		</div>
	)
}