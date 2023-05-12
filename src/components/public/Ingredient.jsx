import * as React from 'react';

export function Ingredient({name,price, id, onClick}) {


    return (
        <div className={"ingredient-check"}>
            <label className={"ingredient-name"} htmlFor="">{name} : {price} €</label>
            <input onClick={(e) => onClick(e, id)} type="checkbox"/>
        </div>
    );
};