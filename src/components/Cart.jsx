import React, { Component } from 'react';
import './Cart.css'
import { withRouter, Redirect} from 'react-router-dom';

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
                    <tr className="cart-row">
                        <th className="cart-item cart-header cart-column">Item</th>
                        <th className="cart-price cart-header cart-column">Price</th>
                    </tr>
                    {
                        this.state.cart.map(item => {
                            return (
                                <tr>
                                    <td>{item.name}</td>
                                    <td >{item.price}</td>
                                    <td><button type="button" className="btn-danger" onClick={() => {this.removeItem(item)}}>Remove Item</button></td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <th className="cart-total-title">Total</th>
                        <td className="cart-total-price">{total}</td>
                    </tr>
                </table>
                <button type="button" className="btn-checkout" onClick={this.checkout}>Checkout</button>
            </div>
        );
    }
};

export default withRouter(Cart);

// className="btn-purchase