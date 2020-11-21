import React, { Component } from 'react';
import './App.css';
import NewProduct from './components/NewProduct.jsx';
import ShowProduct from './components/ShowProduct.jsx';
import ProductEdit from './components/ProductEdit.jsx';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

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
      cartItems: [],
    }
  }
  cartFunction = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false
    cartItems.forEach((item ) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    })
    if(!alreadyInCart) {
      cartItems.push({...product, count: 1})
    }
    this.setState({ cartItems });
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
            <Link to="/">View Watches</Link>
            <Link to="/new">Add Watch</Link>
          </div>
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
                      <div className="product" key={product._id}>
                        <header>Go to Cart</header>
                        <h1>{product.name}</h1>
                        <img src={product.img} alt={`${this.props.name} watches`} />
                        <h3>{product.price}</h3>
                        <button onClick={() => this.props.cartFunction(product)}>add</button>
                        <Link to={"/" + product._id + '/edit'}>Edit Product</Link>
                        <Link to={"/" + product._id}>More Details</Link>
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
