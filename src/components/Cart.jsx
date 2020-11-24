import React, { Component } from 'react';
import { withRouter, Redirect} from 'react-router-dom';
import './Cart.css'


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: this.props.cart,
            redirect: false
        }
    }

    checkout = () => {
        this.state.cart.map(item => {
            fetch(this.props.baseURL + '/watches/' + item._id, {
                method: 'PUT',
                body: JSON.stringify({
                    qty: --item.qty,
                }),
                headers: {'Content-Type': 'application/json'}
            }).then((res) => {
                return res.json();
            }).then((product) => {
                console.log(product);
            }).catch((err) => {console.error({'Error': err})});
        })
        this.props.checkoutCart();
        this.setState({
            redirect: true
        });
    }

    removeItem = (item) => {
        const index = this.state.cart.findIndex(indexTarget => indexTarget._id === item);
        const cartBuffer = [...this.state.cart];
        cartBuffer.splice(index, 1);
        this.setState({
          cart: cartBuffer
        });
        this.props.removeCartItem(item);
    }

    render() {
        let total = 0;
        this.state.cart.forEach(item => {
            total += item.price
        });
        if (this.state.redirect)
            return <Redirect to='/' />;
        return (
            <div className="cart-display">
                <table>
                    {
                        this.state.cart.map(item => {
                            return (
                              <table className="tableOne">
                              <tr>
                                  <td><strong>{item.name}</strong></td>
                                  <td><strong>${item.price}.00 </strong></td>
                              </tr>
                                <tr>
                                    <td><img className="cartImg" src={item.img}/></td>
                                    <td><button className="removeButton" type="button" onClick={() => {this.removeItem(item)}}>Remove</button></td>
                                </tr>

                              </table>
                            )
                        })
                    }
                    <tr >
                        <th><strong> Total Before Tax (USD): </strong> ${total}.00</th>
                        <th><button className="checkoutButton" type="button" onClick={this.checkout}>Checkout</button></th>

                    </tr>
                </table>
            </div>
        );
    }
};

export default withRouter(Cart);
