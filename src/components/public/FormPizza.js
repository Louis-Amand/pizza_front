import * as React from 'react';
import {Ingredient} from "./Ingredient";

export function FormPizza() {
    return (
        <>
            <div className={"form"}>
                <label className={"base"} htmlFor="">Base</label>
                <select className={"custom-select"} id="base-pizza">
                    <option value="tomate">Tomate</option>
                    <option value="creme">Crème</option>
                </select>
                <div className={"ingredient"}>
                    <label className={"ingredient-name"} htmlFor="">Ingredient</label>
                    <Ingredient name={"chorizo"}/>
                </div>
            </div>
        </>
    );
};