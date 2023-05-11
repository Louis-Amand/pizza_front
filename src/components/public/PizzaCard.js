import React from 'react';
import PropTypes from 'prop-types';

const PizzaCard = ({ image, title, ingredients, onOrder }) => {
    return (
        <div className="pizza-card">
            <img src={image} alt={title} className="pizza-image" />
            <h2 className="pizza-title">{title}</h2>
            <p className='pizza-prix'>10 €</p>
            <p className="pizza-ingredients">{ingredients.join(', ')}</p>
            <button className="order-button" onClick={onOrder}>
                Commander
            </button>
        </div>
    );
};

PizzaCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    onOrder: PropTypes.func.isRequired,
};

export default PizzaCard;
