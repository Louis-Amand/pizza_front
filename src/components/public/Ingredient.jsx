import * as React from 'react';

export function Ingredient({name, id, onClick}) {


    return (
        <div className={"ingredient-check"}>
            <label className={"ingredient-name"} htmlFor="">{name}</label>
            <input onClick={(e) => onClick(e, id)} type="checkbox"/>
        </div>
    );
};