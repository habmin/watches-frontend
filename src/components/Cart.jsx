import React, { Component } from 'react';
import { withRouter, Redirect} from 'react-router-dom';
import { Button, Image } from 'semantic-ui-react';
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
        this.state.cart.forEach(item => {
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
                <table className="cart-table">
                    {
                        this.state.cart.map(item => {
                            return (
                                <tr>
                                    <td className="col1">
                                        <td><Image size="tiny" className="cartImg" src={item.img}/></td>
                                        <p><strong>{item.name}</strong></p>
                                    </td>
                                    <td className="col2"><h3>${item.price}.00</h3></td>
                                    <td className="col3">
                                        <Button 
                                            color="red" 
                                            className="removeButton" 
                                            type="button" 
                                            onClick={() => {this.removeItem(item)}}>Remove
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <td className="col1"><p><strong> Total Before Tax (USD): </strong></p></td>
                        <td className="col2"><h3>${total}.00</h3></td>
                        <td className="col3">
                            <Button 
                                color="black" 
                                className="checkoutButton" 
                                type="button" 
                                onClick={this.checkout}>Checkout
                            </Button>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
};

export default withRouter(Cart);
