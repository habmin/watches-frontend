import React, { Component } from 'react';
import './App.css';
import ShowProduct from './components/ShowProduct.jsx';
import NewProduct from './components/NewProduct.jsx';
import Store from './components/Store.jsx';
import ProductEdit from './components/ProductEdit.jsx';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Card, Button, Input, Image, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'


let baseURL;
if (process.env.NODE_ENV === 'development')
  baseURL = 'http://localhost:3003';
else
  baseURL = 'heroku/depploment URL placehorder';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      cartItems: []
    }
  }

  cartFunction = (product) => {
        let itemsInCart = [...this.state.cartItems];
        itemsInCart.push(product)
        this.setState({
          cartItems: itemsInCart
    })
    console.log(this.state.cartItems)
  };

  getProducts = async () => {
    try{
      await fetch(baseURL + "/watches").then(res => {
        return res.json();
      }).then(productData => {
        console.log(productData);
        this.setState({
          products: productData
        })
      })
    }
    catch(error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.getProducts();
  };
  addProduct = (newProduct) => {
    const productsBuffer = [...this.state.products];
    productsBuffer.push(newProduct);
    this.setState({
      products: productsBuffer
    });
  };

  updateProduct = (updatedProduct) => {
    const index = this.state.products.findIndex(indexTarget => indexTarget._id === updatedProduct._id);
    const productsBuffer = [...this.state.products];
    productsBuffer[index] = updatedProduct;
    this.setState({
      products: productsBuffer
    });
  }

  deletedProduct = (productID) => {
    const index = this.state.products.findIndex(indexTarget => indexTarget._id === productID);
    const productsBuffer = [...this.state.products];
    productsBuffer.splice(index, 1);
    this.setState({
      products: productsBuffer
    });
  }
  render() {
    return (
      <div className="App">
        <Router>
          <div>
          <div className="header">
            {
            /* make this a nav bar
            user sign in
            */
            }
            <nav className="navBar">
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Poiret+One&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Raleway+Dots&display=swap');
            </style>

              <li className="navBarLi"><Link to="/">HOME</Link></li>
              <li className="navBarLi"><Link to="/new">ADD INVENTORY</Link></li>
              <li className="searchBar">|   SEARCH</li>
              <li><h1 className="title">Fifth Hour</h1></li>
            </nav>
          </div>

          <header>
            <h1>Fifth Hour</h1>
          </header>


          <Switch>
            {
              this.state.products.map((product) => {
                return (
                  <Route path={"/" + product._id + "/edit"}>
                    <ProductEdit
                      baseURL={baseURL}
                      product={product}
                      updateProduct={this.updateProduct}
                      deletedProduct={this.deletedProduct}/>
                  </Route>
                );
              })
            }
            {
              this.state.products.map((product) => {
                return (
                  <Route exact path={"/" + product._id}>
                    <ShowProduct baseURL={baseURL} product={product}/>
                  </Route>
                );
              })
            }

            <Route path='/new'>
              <NewProduct baseURL={baseURL} addProduct={this.addProduct}/>
            </Route>

              <Route path='/'>
               <div>
                {

                  this.state.products.map((product) => {
                    return (
                      <div className="cards">
                      <div key={product._id}>
                        <img onClick={() => this.cartFunction(product)}className="card-img" src={product.img} alt={`${this.props.name} watches`} wrapped ui={false} />
                        <h3 className="product">{product.name}</h3>
                        <p className="price">${product.price}</p>
                        <div>
                        <button className="addProductButton">ADD</button>
                        </div>
                        <Link to={"/" + product._id + '/edit'}>Edit Product</Link>
                        <Link to={"/" + product._id}>More Details</Link>
                       </div>
                      </div>
                    )
                  })
                }
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
    );
  }


}


export default App;
