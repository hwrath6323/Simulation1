import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Form from './components/Form/Form';

class App extends Component {

  // state = {
  //   url: '',
  //   name: '',
  //   price: '',
  //   products: [],
  //   inventoryList: [],
  // };

  constructor(props){
    super(props)

    this.state = {
      inventoryList:[],
      formInfo:{
        product_id: 0,
        product_url: '',
        product_name:'',
        product_price:'',
        buttonText:'Add to Inventory'
      }
    }
    this.getInventory = this.getInventory.bind(this);
    // this.props = this.state.inventoryList;
    this.selectItem = this.selectItem.bind(this)
  }
  componentWillMount(){
    this.getInventory()
  }


  handleSubmit(e){
    e.preventDefault();

    axios
      .post('/api/products')
        .then(res => {
          console.log(res);
        })
  }

  getInventory(){
    axios
      .get('/api/products')
      .then(response => {
        this.setState({
          inventoryList: response.data,
        });
      });
  }

  selectItem(id){
    debugger
    axios
      .get(`/api/products/${id}`)
      .then(response => {
        response.data.buttonText = 'Save Changes'
        this.setState({
          formInfo: response.data,
        });
      });
  }



  // const product {image, name, price} = this.props;

  render() {
    return (
      <div className="App">
          <Header />
          <Dashboard 
            selectItem={this.selectItem} 
            inventoryList={this.state.inventoryList} 
            getProducts={this.getInventory}/>
          <Form 
            getInventory ={this.getInventory}
            getProducts={this.getInventory} 
            formInfo={this.state.formInfo} />
      </div>
    );
  }


  


}

export default App;
