import * as React from 'react';
export function Ingredient({name}) {
    return (
        <>
            <label htmlFor="">{name}</label>
            <input type="checkbox"/>
        </>
    );
};