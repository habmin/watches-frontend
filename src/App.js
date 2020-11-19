import React, { Component } from 'react';
import NewProduct from './components/NewProduct.jsx';

let baseURL;
if (process.env.NODE_ENV === 'development')
  baseURL = 'http://localhost:3005';
else 
  baseURL = 'heroku/depploment URL placehorder';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: []
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

  addProduct = async (newProduct) => {
    const productsBuffer = [...this.state.products];
    productsBuffer.push(newProduct);
    this.setState({
      products: productsBuffer
    });
  };

  render() {
    return (
      <div className="App">
        <NewProduct baseURL={baseURL} addProduct={this.addProduct}/>
        {
          this.state.products.map((product) => {
            return (
              <div className="product" key={product._id}>
                <h1>{product.name}</h1>
                <img src={product.img} />
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default App;
