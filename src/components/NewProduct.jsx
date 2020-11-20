import React, { Component } from 'react';

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
            strap: ""
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
                strap: this.state.strap
            }),
            headers: {'Content-Type': 'application/json'}
        }).then((res) => {
            return res.json();
        }).then((product) => {
            this.props.addProduct(product);
            this.setState({
                name: "",
                price: "",
                description: "",
                img: "",
                material: "",
                color: "",
                strap: ""
            });
        }).catch((err) => {console.error({'Error': err})});
    }

    render() {
        return (
            <form onSubmit={event => this.submitHandler(event)}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name"
                    onChange={event => this.handleChange(event)}
                    value={this.state.name}/>
                <label htmlFor="price">Price:</label>
                <input type="number" step="0.01" id="price"
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
                <label htmlFor="Strap">Strap:</label>
                <input type="text" id="strap"
                    onChange={event => this.handleChange(event)}
                    value={this.state.strap}/>
                <button type="submit">Submit</button>
            </form>
        );
    };
};

export default NewProduct