import React, { Component } from 'react';
import { withRouter, Redirect} from 'react-router-dom';
import { Button, Input, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import '../App.css'


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
                strap: this.state.strap
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
          <div className="formContainer">
          <Grid centered columns={5}>
          <Grid.Column>
            <Form className="form" onSubmit={event => this.submitHandler(event)}>
              <Form.Group className="innerFormOne" unstackable widths={1}>
                <Form.Input  type="text" id="name"
                    label= "Name:"
                    placeholder="Name"
                    required
                    onChange={event => this.handleChange(event)}
                    value={this.state.name}/>
                </Form.Group>
                <Form.Group unstackable widths={1}>
                  <Form.Input type="number" step="0.01" id="price"
                    label= "Price:"
                    placeholder="Price"
                    required
                    onChange={event => this.handleChange(event)}
                    value={this.state.price}/>
                </Form.Group>
                <Form.Group unstackable widths={1}>
                  <Form.Input type="text" id="description"
                    label="Description:"
                    placeholder="Description"
                    onChange={event => this.handleChange(event)}
                    value={this.state.description}/>
                </Form.Group>
                <Form.Group unstackable widths={1}>
                  <Form.Input type="text" id="img"
                    label="IMG Source:"
                    placeholder="IMG Source"
                    onChange={event => this.handleChange(event)}
                    value={this.state.img}/>
                </Form.Group>
                <Form.Group unstackable widths={1}>
                  <Form.Input type="text" id="material"
                    label="Material:"
                    placeholder="Material"
                    onChange={event => this.handleChange(event)}
                    value={this.state.material}/>
                </Form.Group>
                <Form.Group unstackable widths={1}>
                  <Form.Input type="text" id="color"
                    label="Color:"
                    placeholder="Color"
                    onChange={event => this.handleChange(event)}
                    value={this.state.color}/>
                </Form.Group>
                <Form.Group unstackable widths={1}>
                  <Form.Input type="text" id="strap"
                    label="Strap:"
                    placeholder="Strap"
                    onChange={event => this.handleChange(event)}
                    value={this.state.strap}/>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
            </Grid.Column>
            </Grid>
            </div>
        );
    };
};

export default withRouter(NewProduct);
