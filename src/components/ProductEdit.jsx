import React, { Component } from 'react';
import { withRouter, Redirect} from 'react-router-dom'

class ProductEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.product.name,
            price: this.props.product.price,
            description: this.props.product.description,
            img: this.props.product.img,
            material: this.props.product.material,
            color: this.props.product.color,
            strap: this.props.product.strap,
            redirect: false 
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(this.props.baseURL + '/watches/' + this.props.product._id, {
            method: 'PUT',
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
            this.props.updateProduct(product);
            this.setState({
                redirect: true
            });
        }).catch((err) => {console.error({'Error': err})});
    }

    render() {
        if (this.state.redirect)
            return <Redirect to='/' />
        return (
                <div className="product-edit">
                    <div className="image-container">
                        <img className="edit-product-image" src={this.state.img} alt={this.state.name} />
                    </div>
                    <form className="edit-form" onSubmit={this.handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input
                            className="input-name"
                            value={this.state.name}
                            id='name'
                            required
                            autoFocus
                            onChange={this.handleChange}
                        />
                        <label htmlFor="price">Price:</label>
                        <input
                            className="input-price"
                            value={this.state.price}
                            id='price'
                            required
                            onChange={this.handleChange}
                        />
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="textarea-description"
                            rows={10}
                            cols={78}
                            id='Description'
                            value={this.state.description}
                            name='description'
                            onChange={this.handleChange}
                        />
                        <label htmlFor="img">IMG Src:</label>
                        <input
                            className="input-img"
                            id='img'
                            value={this.state.img}
                            name='img'
                            onChange={this.handleChange}
                        />
                        <label htmlFor="material">Material:</label>
                        <input
                            className="material"
                            id='material'
                            value={this.state.material}
                            onChange={this.handleChange}
                        />
                        <label htmlFor="color">Color:</label>
                        <input
                            className="color"
                            value={this.state.color}
                            id='color'
                            onChange={this.handleChange}
                        />
                        <label htmlFor="strap">Strap:</label>
                        <input
                            className="strap"
                            value={this.state.strap}
                            id='strap'
                            onChange={this.handleChange}
                        />
                        <button type='submit' className="save-button">Save</button>
                    </form>
                </div>
        )
    }
}

export default withRouter(ProductEdit);
