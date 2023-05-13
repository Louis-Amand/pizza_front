import * as React from 'react';

// Component Display ingredient
export function Ingredient({ name, price, id, onClick }) {
    return (
        <div className={"ingredient-check"}>
            <input onClick={(e) => onClick(e, id)} type="checkbox" />
            <label className={"ingredient-name"} htmlFor="">{name}  <span className='price'>+{price}€</span></label>
        </div>
    );
};