import React, {Component} from 'react';
import Product from '../Product/Product';
import axios from 'axios';

class Dashboard extends Component {
    


    constructor(props){
        super(props);

        this.state = {
            inventoryList: props.inventoryList,
                
            getProducts: props.getProducts
        }

        this.deleteProduct = this.deleteProduct.bind(this)

        // this.selectItem = this.selectItem.bind(this)

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


                <div>
                    {this.props.inventoryList
                        .map((item) => {
                            return(
                                <Product {...item} 
                                    key={item.id}
                                    deleteProduct={this.deleteProduct}  
                                    editItem={()=>{this.props.selectItem(item.id)}} 
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