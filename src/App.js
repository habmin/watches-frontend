import React, { Component } from 'react';
import NewProduct from './components/NewProduct.jsx';
import ShowProduct from './components/ShowProduct.jsx';
import ProductEdit from './components/ProductEdit.jsx';
import SignUp from './components/SignUp.jsx';
import SignIn from './components/SignIn.jsx';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

let baseURL;
if (process.env.NODE_ENV === 'development')
  baseURL = 'http://localhost:3008';
else
  baseURL = 'heroku/depploment URL placehorder';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
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

  render() {
    return (
      <div className="App">
        <Router>
          <div className="header">
            {
            /* nav section begin */
            }
            <Link to="/">View Watches</Link>
            <Link to="/new">Add Watch</Link>
            
            {
              this.state.currentUser
                ? <Link to="/signout" onClick={this.logoutUser}>Sign Out</Link>
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
              {
                this.state.products.map((product) => {
                  return (
                    <div className="product" key={product._id}>
                      <h1>{product.name}</h1>
                      <img src={product.img} />
                      <Link to={"/" + product._id + '/edit'}>Edit Product</Link>
                      <Link to={"/" + product._id}>More Details</Link>
                    </div>
                  )
                })
              }
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
