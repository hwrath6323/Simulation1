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
                <div class="buttons">
                    <button className="product-button" onClick={() => props.deleteProduct(props.id)}>Delete</button>
                </div>
        </div>
    )
};

export default Product; 