import React from 'react';
import './Product.css';

const Product = (props) => {

    // let state = {
    //     inventoryList: [],
    // }

    return(
        <div className="product-list inventory">
                <img src={props.product_url} />
                <br />{props.product_name}
                <br />{props.product_price}
                <div className="buttons">
                    <button className="product-button" onClick={() => props.deleteProduct(props.id)}>Delete</button>
                    <button className="product-button" onClick={() => props.editItem(props.id)}>Edit</button>
                </div>
        </div>
    )
};

export default Product; 