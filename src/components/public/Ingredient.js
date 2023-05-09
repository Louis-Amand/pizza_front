import * as React from 'react';

export function Ingredient({name}) {
    return (
        <div className={"ingredient-check"}>
            <label className={"ingredient-name"} htmlFor="">{name}</label>
            <input type="checkbox"/>
        </div>
    );
};