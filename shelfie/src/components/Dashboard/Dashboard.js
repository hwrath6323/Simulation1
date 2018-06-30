import React, {Component} from 'react';
import Product from '../Product/Product';
import axios from 'axios';

class Dashboard extends Component {
    


    constructor(props){
        super(props);

        this.state = {
            inventoryList: props.inventoryList,
                //     url: 'https://ae01.alicdn.com/kf/HTB1ARxPHVXXXXcLXpXXq6xXFXXX9/Devil-May-Cry-V-Cosplay-Dante-Ebony-Ivory.jpg',
                //     name: 'Ebony & Ivory',
                //     price: '$50,000,000,000'
                // },
                // {
                //     url: 'https://vignette.wikia.nocookie.net/devilmaycry/images/f/fe/BlueRose.jpg/revision/latest?cb=20080424220315',
                //     name: 'Blue Rose',
                //     price: '$5,000,000',
                // },
                // {
                //     url: 'https://vignette.wikia.nocookie.net/devilmaycry/images/2/2b/Untitledrebellion.png/revision/latest?cb=20131029230616',
                //     name: 'Rebellion',
                //     price: '$100,000,000,000'
                
            getProducts: props.getProducts
        }

        this.deleteProduct = this.deleteProduct.bind(this)




    }
        

    deleteProduct(id){    
        axios
            .delete('/api/products/' + id)
            .then(
                response => {
                    this.props.getProducts()
                })
            .catch(err => {
                console.warn("Product could not be deleted", err)
            })
    }

    // componentDidUpdate(param, this.props){

    // }
    

    
    render(){

        // const inputs = this.inputs
        //     .map((input, i) => (
        //         <div key={`new-product-${i}`}>
        //             <label>
        //                     {input.label}:
        //                     <input
        //                         value={this.state[input.property]}
        //                         onChange={e => this.handleChange(e, input.property)}
        //                         name={input.property}
        //                         />
        //             </label>
        //         </div>
        //     ));

        // const inventoryList = this.state.inventoryList

        return(
            <div>
                Dashboard

                <div>
                    {this.props.inventoryList
                        .map((item) => {
                            return(
                                <Product {...item} 
                                    key={item.id}
                                    deleteProduct={this.deleteProduct}    
                                
                                />
                            )

                        })
                    }
                </div>

            </div>
        )
    }


}

export default Dashboard;