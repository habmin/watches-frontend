import React, { Component } from 'react';


class ProductEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {
                name: '',
                price: '',
                description: '',
                img: '',
                material: "",
                color: "",
                strap: ""
                
            },
            updated: false
        }
    }

    // async componentDidMount() {
    //     let { id } = this.props.match.params
    //     const product = await getProduct(id)
    //     this.setState({ product })
    // }


    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            product: {
                ...this.state.product,
                [name]: value
            }
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        let { id } = this.props.match.params
        const updated = await updateProduct(id, this.state.product)
        this.setState({ updated })
    }

    render() {
        return (
            <Layout>
                <div className="product-edit">
                    <div className="image-container">
                        <img className="edit-product-image" src={product.img} alt={product.name} />
                        <form onSubmit={this.handleSubmit}>
                            <input
                                className="edit-input-image-link"
                                placeholder='Image Link'
                                value={product.img}
                                name='img'
                                required
                                onChange={this.handleChange}
                            />
                        </form>
                    </div>
                    <form className="edit-form" onSubmit={this.handleSubmit}>
                        <input
                            className="input-name"
                            placeholder='Name'
                            value={product.name}
                            name='name'
                            required
                            autoFocus
                            onChange={this.handleChange}
                        />
                        <input
                            className="input-price"
                            placeholder='Price'
                            value={product.price}
                            name='price'
                            required
                            onChange={this.handleChange}
                        />
                        <textarea
                            className="textarea-description"
                            rows={10}
                            cols={78}
                            placeholder='Description'
                            value={product.description}
                            name='description'
                            required
                            onChange={this.handleChange}
                        />
                        <input
                            className="input-img"
                            placeholder='img'
                            value={product.img}
                            name='img'
                            required
                            onChange={this.handleChange}
                        />

                        <input
                            className="material"
                            placeholder='material'
                            value={product.material}
                            name='material'
                            required
                            onChange={this.handleChange}
                        />
                        <input
                            className="color"
                            placeholder='color'
                            value={product.color}
                            name='color'
                            required
                            onChange={this.handleChange}
                        />

                        <input
                            className="strap"
                            placeholder='strap'
                            value={product.strap}
                            name='strap'
                            required
                            onChange={this.handleChange}
                        />
                        <button type='submit' className="save-button">Save</button>
                    </form>
                </div>
            </Layout>
        )
    }
}

export default ProductEdit