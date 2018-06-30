import React, {Component} from 'react';
import './Form.css'
import axios from 'axios';

class Form extends Component {

    
    inputs = [
        {
            label: "Image URL",
            property: "product_url"
        },
        {
            label: "Name",
            property: "product_name"
        },
        {
            label: "Price",
            property: "product_price"
        }
    ];
    // state = {
    //     items: []
    // }
    
    constructor(props){
        super(props);

        const inputProperties = this.refreshState();
        
        this.state = {
            ...inputProperties,
            inventoryList: props.getProducts,
                // [{
                //     url: 'https://ae01.alicdn.com/kf/HTB1ARxPHVXXXXcLXpXXq6xXFXXX9/Devil-May-Cry-V-Cosplay-Dante-Ebony-Ivory.jpg',
                //     name: 'Ebony & Ivory',
                //     price: '$50,000,000,000'
                // },
                // {
                //     url: 'https://vignette.wikia.nocookie.net/devilmaycry/images/f/fe/BlueRose.jpg/revision/latest?cb=20080424220315',
                //     name: 'Blue Rose',
                //     price: '$50,000,000',
                // },
                // {
                //     url: 'https://vignette.wikia.nocookie.net/devilmaycry/images/2/2b/Untitledrebellion.png/revision/latest?cb=20131029230616',
                //     name: 'Rebellion',
                //     price: '$100,000,000,000'
                // }],
              
            items: [ ],
            product_url: '',
            product_name: '',
            product_price: '',
        };
    }

    
    handleChange(e, name) {
        const value = e.target.value;
        this.setState({[name]: value})
    }
    
    refreshState(){
        return this.inputs.reduce((map, input) => {
            return {
                ...map, 
                [input.property] : ''
            }
        }, {});
    }
    cancelClick(){
        this.setState(this.initialState);
    }

    handleSubmit(e) {
        e.preventDefault();
        const {product_url, product_name, product_price} = this.state;
        const newProduct = {product_url, product_name, product_price};

        if(this.props.onSubmit){
            this.props.onSubmit(e, newProduct)
        }

        
        return axios
        .post('/api/products', newProduct)
        .then(response => {
                this.props.getProducts()
                this.setState(this.refreshState())
            })
            .catch(err => {
                console.warn('Could not add product', err);
            })

    }

    
    
    
    
    render(){
        const inputs = this.inputs
            .map((input, i) => (
                <div key={`new-product-form-${i}`}>
                    <div>
                        <label>
                            {input.label}:
                            <br /><input
                                type='text'
                                value={this.state[input.property]}
                                onChange={e => this.handleChange(e, input.property)}
                                name={input.property} />
                        </label>
                    </div>
                </div>
            ));

            // const inventoryList = this.props.inventoryList;

        return(
            <div>
                <form className="product-form">
                    {/* <div className="inventory">
                        <img src={this.state.inventoryList.url} />
                        <br />{this.state.inventoryList.name}
                        <br />{this.state.inventoryList.price}
                    </div> */}

                    <div className='input-box'>
                        <div className='image-preview'>
                            <img 
                                src="http://icons.iconarchive.com/icons/icons8/windows-8/512/City-No-Camera-icon.png"
                                alt="Upload product"    
                            />
                        </div>

                        {inputs}

                        <button 
                            type='submit'
                            onClick={e => this.handleSubmit(e)}
                        >Add to Inventory</button>
                        <button 
                            onClick={e => this.cancelClick(e)}
                        >Cancel</button>
                    </div>
                </form>
            </div>
        )
    };
}

export default Form;