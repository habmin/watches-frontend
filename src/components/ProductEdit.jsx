import React, { Component } from 'react';
import { withRouter, Redirect} from 'react-router-dom';

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
            qty: this.props.product.qty,
            redirect: false 
        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

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
                strap: this.state.strap,
                qty: this.state.qty,
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
    };
    
    deleteProduct = (eventID) => {
        fetch(this.props.baseURL + '/watches/' + eventID, {
            method: 'DELETE',
        }).then((res) => {
            this.props.deletedProduct(eventID);
            this.setState({
                redirect: true
            });
        }).catch((err) => {console.error({'Error': err})});
    };

    render() {
        if (this.state.redirect)
            return <Redirect to='/' />;
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
                        type="number" step="0.01" id="price" min="0"
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
                        id='description'
                        value={this.state.description}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="img">IMG Src:</label>
                    <input
                        className="input-img"
                        id='img'
                        value={this.state.img}
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
                    <label htmlFor="qty">Quantity:</label>
                    <input
                        type="number" step="1" min="0"
                        required
                        className="strap"
                        value={this.state.qty}
                        id='qty'
                        onChange={this.handleChange}
                    />
                    <button type='submit' className="save-button">Save</button>
                </form>
                <button onClick={() => this.deleteProduct(this.props.product._id)}>Delete</button>
            </div>
        );
    };
};

export default withRouter(ProductEdit);
