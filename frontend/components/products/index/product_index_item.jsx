import React from 'react';
import { Link } from 'react-router-dom';

export const ProductIndexItem = (props) => {
    const product = props.product
    
    return (
        <li>
            <img src={product.photoUrl}/>
            <Link to={`/products/${product.id}`}> 
                {product.title}
            </Link>
            {/* ^^^ Clicking on this is going to navigate us 
            to the product's show page
                Task: Change so that clicking on the image changes route as well */}
            <Link to={`/products/${product.id}/edit`} removeProduct={props.removeProduct}>
                Edit
            </Link>
            {/* Task: Make this only visible to logged in people */}
            {/* Task: Make a delete button avilable on the edit form of a specific product
                Not sure if passing the removeProduct function as a prop might be the best
                thing to do here. Not sure if it works too */}
        </li>
    )
};