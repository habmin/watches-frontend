import React, { Component } from 'react';
import { withRouter, Redirect} from 'react-router-dom';

class NewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: "",
            description: "",
            img: "",
            material: "",
            color: "",
            strap: "",
            qty: 0,
            redirect: false
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        fetch(this.props.baseURL + '/watches', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                price: this.state.price,
                description: this.state.description,
                img: this.state.img,
                material: this.state.material,
                color: this.state.color,
                strap: this.state.strap,
                qty: this.state.qty
            }),
            headers: {'Content-Type': 'application/json'}
        }).then((res) => {
            return res.json();
        }).then((product) => {
            this.props.addProduct(product);
            this.setState({
                redirect: true
            });
        }).catch((err) => {console.error({'Error': err})});
    }

    render() {
        if (this.state.redirect)
            return <Redirect to='/' />;
        return (
            <form onSubmit={event => this.submitHandler(event)}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name"
                    required
                    onChange={event => this.handleChange(event)}
                    value={this.state.name}/>
                <label htmlFor="price">Price:</label>
                <input type="number" step="0.01" id="price" min="0"
                    required
                    onChange={event => this.handleChange(event)}
                    value={this.state.price}/>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description"
                    onChange={event => this.handleChange(event)}
                    value={this.state.description}/>
                <label htmlFor="img">IMG Source:</label>
                <input type="text" id="img"
                    onChange={event => this.handleChange(event)}
                    value={this.state.img}/>
                <label htmlFor="material">Material:</label>
                <input type="text" id="material"
                    onChange={event => this.handleChange(event)}
                    value={this.state.material}/>
                <label htmlFor="color">Color:</label>
                <input type="text" id="color"
                    onChange={event => this.handleChange(event)}
                    value={this.state.color}/>
                <label htmlFor="strap">Strap:</label>
                <input type="text" id="strap"
                    onChange={event => this.handleChange(event)}
                    value={this.state.strap}/>
                <label htmlFor="quantity">Quantity:</label>
                <input type="number" step="1" id="qty"
                    required
                    onChange={event => this.handleChange(event)}
                    value={this.state.qty}/>
                <button type="submit">Submit</button>
            </form>
        );
    };
};

export default withRouter(NewProduct);
