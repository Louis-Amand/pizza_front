import * as React from 'react';

// Component Display ingredient in backoffice for crud
export function IngredientBackoffice({items, checkedItems, onCheckboxChange}) {
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        onCheckboxChange(value, checked);
    };

    return (
        <>
            {items?.map((item) => (
                <div  key={item.id} className={"ingredient-check"}>
                    <label className={"ingredient-name"} htmlFor="">{item.name}</label>
                    <input
                           type="checkbox"
                           value={item.name}
                           checked={checkedItems.includes(item.name)}
                           onChange={handleCheckboxChange}/>
                </div>

            ))}
        </>

    );
};