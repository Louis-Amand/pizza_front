import * as React from 'react';
import Pizza from '../pizza.svg';
import { FormPizza } from "./public/FormPizza";

export function CustomPizzaPage() {
    return (
        <>
            <h2 className={"title-generazza"}>Je choisis mes ingredients pour une pizza personnel !</h2>
            <h3 className={"title-generazza-2"}>Commencer votre pizza avec une base à 11 €</h3>
            <div className={"customFormDisplay"}>
                <FormPizza />
                <img className='img-size' src={Pizza} alt="" />
            </div>
        </>
    );
};