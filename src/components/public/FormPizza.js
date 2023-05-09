import * as React from 'react';
import {Ingredient} from "./Ingredient";
export function FormPizza() {
    return (
        <>
            <div className={"form"}>
                <label htmlFor="">Base</label>
                <select id="base-pizza">
                    <option value="tomate">Tomate</option>
                    <option value="creme">Crème</option>
                </select>
                <div>
                    <label htmlFor="">Ingredient</label>
                    <Ingredient name={"chorizo"} />
                </div>
            </div>
        </>
    );
};