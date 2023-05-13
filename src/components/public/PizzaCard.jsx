import React from 'react';
import PropTypes from 'prop-types';

const PizzaCard = ({ image, title, price, ingredients, onOrder }) => {
    return (
        <div className="pizza-card">
            <img src={image} alt={title} className="pizza-image" />
            <h2 className="pizza-title">{title}</h2>
            <p className='pizza-prix'>{price} €</p>
            <p className="pizza-ingredients">{ingredients.join(', ')}</p>
            <button className="order-button button4" onClick={onOrder}>
                Commander
            </button>
        </div>
    );
};

PizzaCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    onOrder: PropTypes.func.isRequired,
};

export default PizzaCard;
