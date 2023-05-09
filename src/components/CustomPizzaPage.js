import * as React from 'react';
import Pizza from '../pizza.svg';
import {FormPizza} from "./public/FormPizza";
export function CustomPizzaPage() {
    return (
        <>
            <div>
                <FormPizza/>
            </div>
            <div>
                <h2 className={"title-generazza"}>Je choisis mes ingredients pour une pizza personnel !</h2>
                <img src={Pizza} alt=""/>
            </div>
        </>
    );
};