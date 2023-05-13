import {useEffect, useState} from "react";
import axios from "axios";
import {BackBase} from "./public/BackBase";
import {BackIngredient} from "./public/BackIngredient";
import {BackPizza} from "./public/BackPizza";

export function BackofficePage() {

	return (
		<div className={'section-back'}>
			<BackBase/>
			<BackIngredient	/>
			<BackPizza/>
		</div>
	)
}