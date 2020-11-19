import React, { Component } from 'react';

export default class ShowProduct extends Component {
  state = {
    name: this.props.product.name,
    img: this.props.product.img,
  }

  render() {
    return (
      <div className="Show">
      <App baseURL={baseURL} />
        {
          this.state.products.map((product) => {
            return (
              <div className="Product" key={product._id}>
                <table>
                  <tr>
                    <th>Name</th>
                    <th>Img</th>
                    <th>ID</th>
                  </tr>
                  <tr>
                    <td>{ this.state.name }</td>
                    <td>{ this.state.img }</td>
                  </tr>
                  </table>
                </div>
                )
              })
            }
          </div>
        );
      }
    }
