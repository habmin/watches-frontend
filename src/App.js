import React, { Component } from 'react';
import NewProduct from './components/NewProduct.jsx';
import ShowProduct from './components/ShowProduct.jsx';
import ProductEdit from './components/ProductEdit.jsx';
import SignUp from './components/SignUp.jsx';
import SignIn from './components/SignIn.jsx';
import Cart from './components/Cart.jsx';
import Search from './components/Search.jsx';

import './App.css';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { Card, Button, Input, Image, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';


let baseURL;
if (process.env.NODE_ENV === 'development')
  baseURL = 'http://localhost:' + process.env.REACT_APP_PORT;
else
  baseURL = 'heroku/deployment URL placeholder';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      cart: [],
      searchResults: null,
      currentUser: null
    }
  }

  getProducts = async () => {
    try {
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

  getSeed = () => {
    fetch(baseURL + "/watches/seed", {
      method: 'POST',
      body: JSON.stringify({
          currentUser: this.state.currentUser
      }),
      headers: {'Content-Type': 'application/json'}
      }).then(res => {
        return res.json();
      }).then(productData => {
        console.log(productData);
        this.setState({
          products: productData
        })
      }).catch(error => {console.log(error)});
  };

  componentDidMount() {
    this.getProducts();
  };

  loginUser = (user) => {
      this.setState({
        currentUser: user
    });
  };

  logoutUser = () => {
    try {
      fetch(baseURL + '/sessions', {
        method: 'DELETE',
      }).then((res) => {
        this.setState({
          currentUser: null
        });
      });
    }
    catch(err) {
      console.log("an error!?")
      console.log(err);
    }
  }

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

  addToCart = (product) => {
    const cartBuffer = [...this.state.cart];
    const amountOfProductInCart = cartBuffer.filter(items => items === product);
    if (amountOfProductInCart.length >= product.qty) {
      //can't have that much in the cart error
      //could be a modal?
    }
    else {
      cartBuffer.push(product);
      this.setState({
        cart: cartBuffer
      });
    }
    console.log(this.state.cart)
  };

  checkoutCart = () => {
    this.setState({
      cart: []
    });
  }

  removeCartItem = (item) => {
    const index = this.state.cart.findIndex(indexTarget => indexTarget._id === item);
    const cartBuffer = [...this.state.cart];
    cartBuffer.splice(index, 1);
    this.setState({
      cart: cartBuffer
    });
  }

  searchResults = (results) => {
    this.setState({
      searchResults: results
    });
  };

  clearResults = () => {
    this.setState({
      searchResults: null
    });
  }
  
  renderIndex = (list) => {
    return (
      <Card.Group className="product-cards" itemsPerRow={3} stackable>
      {
        list.map((product) => {
          return (        
          <Card className="product" key={product._id}>
            <Card.Content>
              <Card.Header>{product.name}</Card.Header>
              <Image className="product-img" size="medium" src={product.img} alt={`${this.props.name} watches`} />
              <Card.Description>
                <h3>$ {product.price}</h3>
                {
                  this.state.currentUser
                  ? product.qty
                    ? <Button type="button" content="ADD TO CART" onClick={() => this.addToCart(product)} />
                    : <Button type="button" content="SOLD OUT" />
                  : <Button type="button" content="SIGN IN TO ADD" />
                }
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              {
                this.state.currentUser && this.state.currentUser.username === "admin"
                ? <Link className="edit-product-link" to={"/" + product._id + '/edit'}>Edit Product</Link>
                : <></>
              }
              <Link to={"/" + product._id}>More Details</Link>
            </Card.Content>
          </Card>
          );
        })
      }
      </Card.Group>
    )
  };

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
            <h1 className="title">Fifth Hour</h1>
              <li className="navBarLi"><Link to="/">HOME</Link></li>
              {
                this.state.currentUser && this.state.currentUser.username === "admin"
                ? 
                  <div>
                    <li className="navBarLi"><Link to="/new">ADD INVENTORY</Link></li>
                    <li className="navBarLi"><Link to="/" onClick={this.getSeed}>IMPORT PRODUCT SEED</Link></li>
                  </div>
                : <></>
              }
              {
                this.state.currentUser
                  ? 
                    <div>
                      <li className="navBarLi">
                        <Link to="/cart">View Cart</Link>
                      </li>
                      <li className="navBarLi">
                        <Link to="/signout" onClick={this.logoutUser}>Sign Out</Link>
                      </li>
                    </div>
                  : 
                    <div>
                      <li className="navBarLi">
                        <Link to="/signup">Sign Up</Link>
                      </li>
                      <li className="navBarLi">
                        <Link to="/signin">Sign In</Link>
                      </li>
                    </div>
              }
            </nav>
          </div>
          <Switch>
            <Route path='/signin'>
              <SignIn baseURL={baseURL} loginUser={this.loginUser}/>
            </Route>
            <Route path='/signup'>
              <SignUp baseURL={baseURL} loginUser={this.loginUser}/>
            </Route>
            <Route path='/cart'>
              <Cart 
                baseURL={baseURL} 
                cart={this.state.cart} 
                checkoutCart={this.checkoutCart}
                removeCartItem={this.removeCartItem}/>
            </Route>
            {
              this.state.currentUser && this.state.currentUser.username === "admin"
              ?
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
              :
                this.state.products.map((product) => {
                  return (
                    <Route path={"/" + product._id + "/edit"}>
                      <p>Unauthorized Access</p>
                    </Route>
                  );
                })
            }
            {
              this.state.products.map((product) => {
                return (
                  <Route exact path={"/" + product._id}>
                    <ShowProduct 
                      baseURL={baseURL} 
                      product={product} 
                      currentUser={this.state.currentUser}
                      addToCart={this.addToCart}/>
                  </Route>
                );
              })
            }
            {
              this.state.currentUser && this.state.currentUser.username === "admin"
              ?
                <Route path='/new'>
                  <NewProduct baseURL={baseURL} addProduct={this.addProduct}/>
                </Route>
              :
                <Route path='/new'>
                  <p>Unauthorized Access</p>
                </Route>
            }
            <Route path='/'>
              <div className="show-path">
                <Search 
                  baseURL={baseURL} 
                  searchResults={this.searchResults} 
                  clearResults={this.clearResults}/>
                <div className="cards">
                  {
                    this.state.searchResults
                    ? this.renderIndex(this.state.searchResults)
                    : this.renderIndex(this.state.products)
                  }
                </div>
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
