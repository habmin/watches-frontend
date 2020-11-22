import React, { Component } from 'react';
import NewProduct from './components/NewProduct.jsx';
import ShowProduct from './components/ShowProduct.jsx';
import ProductEdit from './components/ProductEdit.jsx';
import SignUp from './components/SignUp.jsx';
import SignIn from './components/SignIn.jsx';
import Cart from './components/Cart.jsx';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

let baseURL;
if (process.env.NODE_ENV === 'development')
  baseURL = 'http://localhost:3008';
else
  baseURL = 'heroku/deployment URL placeholder';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      cart: [],
      currentUser: null
    }
  }

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

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <div className="header">
              {
              /* nav section begin */
              }
              <Link to="/">View Watches</Link>
              {
                this.state.currentUser && this.state.currentUser.username === "admin"
                ? <Link to="/new">Add Watch</Link>
                : <></>
              }
              {
                this.state.currentUser
                  ? 
                    <div>
                      <Link to="/cart">View Cart</Link>
                      <Link to="/signout" onClick={this.logoutUser}>Sign Out</Link>
                    </div>
                  : 
                    <div>
                      <Link to="/signup">Sign Up</Link>
                      <Link to="/signin">Sign In</Link>
                    </div>
              }
              {
              /* nav section end */
              }
            </div>
            <Switch>
              <Route path='/signin'>
                <SignIn baseURL={baseURL} loginUser={this.loginUser}/>
              </Route>
              <Route path='/signup'>
                <SignUp baseURL={baseURL} loginUser={this.loginUser}/>
              </Route>
              <Route path='/cart'>
                <Cart baseURL={baseURL} cart={this.state.cart} checkoutCart={this.checkoutCart}/>
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
                      <ShowProduct baseURL={baseURL} product={product}/>
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
              <Route path='/new'>
                <NewProduct baseURL={baseURL} addProduct={this.addProduct}/>
              </Route>
              <Route path='/'>
                <div className="products-display">
                  {
                    this.state.products.map((product) => {
                      return (
                        <div className="product" key={product._id}>
                          <h1>{product.name}</h1>
                          <img src={product.img} />
                          {
                            this.state.currentUser && this.state.currentUser.username === "admin"
                            ? <Link to={"/" + product._id + '/edit'}>Edit Product</Link>
                            : <></>
                          }
                          <Link to={"/" + product._id}>More Details</Link>
                          {
                            this.state.currentUser 
                            ? product.qty
                              ? <button type="button" onClick={() => this.addToCart(product)}>Add To Cart</button>
                              : <button type="button">Sold Out</button>
                            : <></>
                          }
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
