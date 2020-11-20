import React, { Component } from 'react'
import Search from './Search'
import { getProducts } from './products'

class Products extends Component {
  constructor() {
    super()
    this.state = {
      products: [],
      filterValue: '',
      filteredProducts: null,
      selectValue: 'Featured'
    }
  }

  async componentDidMount() {
    const products = await getProducts()
    this.setState({ products })
  }

  handleSearchChange = event => {
    const filter = () => {
      const filteredProducts = this.state.products.filter(product => {
        return product.name.toLowerCase().includes(this.state.filterValue.toLowerCase())
      })
      this.setState({ filteredProducts })
    }
    this.setState({ filterValue: event.target.value }, filter)
  }


  handleSubmit = event => event.preventDefault()

  render() {
    const products = this.state.filteredProducts ? this.state.filteredProducts : this.state.products

    return (
      <Layout>
        <Search onSubmit={this.handleSubmit} value={this.state.filterValue} onChange={this.handleSearchChange} />
        <form className="sort-container" onSubmit={this.handleSubmit}>
        </form>
        <div className="products">
          {PRODUCTS}
        </div>
      </Layout>
    )
  }
}

export default Products