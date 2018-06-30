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
      inventoryList: [
        // {
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
        // }
      ]
    }

    this.getInventory = this.getInventory.bind(this);


    // this.props = this.state.inventoryList;
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
      .get('/api/inventory')
      .then(response => {
        this.setState({
          inventoryList: response.data,
        });
      });
  }



  // const product {image, name, price} = this.props;

  render() {
    return (
      <div className="App">
          <Header />
          <Dashboard inventoryList={this.state.inventoryList} getProducts={this.getInventory}/>
          <Form getProducts={this.getInventory} />
      </div>
    );
  }


  


}

export default App;
