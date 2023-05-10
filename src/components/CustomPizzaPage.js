import * as React from 'react';
import Pizza from '../pizza.svg';
import {FormPizza} from "./public/FormPizza";

export function CustomPizzaPage() {
    return (
        <>
            <h2 className={"title-generazza"}>Je choisis mes ingredients pour une pizza personnel !</h2>
            <div className={"customFormDisplay"}>
                <FormPizza/>
                <img width={"500px"} src={Pizza} alt=""/>
            </div>
        </>
    );
};