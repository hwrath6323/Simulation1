import React, {Component} from 'react';
import './Form.css'
import axios from 'axios';

import noimage from '/Users/hwrathall6323/Documents/DevMountain/Projects/simulation-1/shelfie/src/no-camera.png';

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
            items: [ ],
            product_url: '',
            product_name: '',
            product_price: '',
            selectItem: props.selectItem,
            editItem: props.editItem,
            product_id: 0,
        };

        this.baseState = this.state;
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            product_id: nextProps.formInfo.id,
            product_url: nextProps.formInfo.product_url,
            product_name: nextProps.formInfo.product_name,
            product_price: nextProps.formInfo.product_price,
        })
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

    // handleImage(e, name){
    //     const value = e.target.value

    //     this.setState({[name]: value})
    // }


    resetForm(e){
        // e.preventDefault();
        this.setState(this.baseState)
    }

    cancelSubmit(e){
        e.preventDefault();
        this.resetForm();
    }

    handleSubmit(e) {
        debugger
        e.preventDefault();
        const {product_id, product_url, product_name, product_price} = this.state;
        const newProduct = {product_id,product_url, product_name, product_price};
        if(this.props.onSubmit){
            this.props.onSubmit(e, newProduct)
        }
        if(this.state.product_id > 0){
            axios.put('/api/products/' + this.state.id, newProduct)
            .then(response => {
                this.props.getInventory()
            })
            .then(() => 
                this.props.getProducts())
            .catch(err => {
                console.warn("Product could not be updated", err)
            })
        }else{
            axios.post('/api/products', newProduct)
            .then(response => {
                    this.props.getInventory()
                    this.props.getProducts()
                    this.setState(this.refreshState())
                })
            .catch(err => {
                console.warn('Could not add product', err);
            })
        }

    }


    // componentDidUpdate(prevProps, prevState){
    //     if (prevProps.data !== this.props.data){
    //         this.setState(this.props.data)};
    // }



    
    
    
    
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

        let url;
        if(this.state.product_url){
            url = this.state.product_url
        // }else{
        //     return {noimage}
        }

        return(
            <div>
                <form className="product-form">

                    <div className='input-box'>
                        <div className='image-preview'>
                            <img 
                                alt="Upload product"    
                                src={url}
                            />
                        </div>

                        {inputs}

                        <button 
                            type='submit'
                            onClick={e => this.handleSubmit(e)}
                        >{this.props.formInfo.buttonText}</button>
                        <button 
                            onClick={e => this.cancelSubmit(e)}
                        >Cancel</button>
                    </div>
                </form>
            </div>
        )
    };
}

export default Form;