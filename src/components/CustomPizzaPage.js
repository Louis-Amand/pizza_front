import * as React from 'react';
import Pizza from '../pizza.svg';
import {FormPizza} from "./public/FormPizza";

export function CustomPizzaPage() {
    return (
        <>
            <h2 className={"title-generazza"}>Je choisis mes ingredients pour une pizza personnel !</h2>
            <div>
                <FormPizza/>
                <img src={Pizza} alt=""/>

            </div>
        </>
    );
};