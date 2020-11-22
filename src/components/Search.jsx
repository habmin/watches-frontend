import React, { Component } from 'react';

class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            foundResults: true
        }
    };
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    fetchResults = async (event) => {
        event.preventDefault();
        try {
            await fetch(this.props.baseURL + "/watches/search/" + this.state.input).then(res => {
              return res.json();
            }).then(results => {
                if (results.length) {
                    this.props.searchResults(results);
                    this.setState({
                        foundResults: true
                    });
                }
                else {
                    this.setState({
                        foundResults: false
                    });
                }
            });
          }
          catch(error) {
            console.log(error);
        }
    }

    clearResults = () => {
        this.state = {
            input: "",
            foundResults: true
        };
    };
    
    render() {
        return (
            <div className="search-bar">
                <form className="search-form" onSubmit={(event) => this.fetchResults(event)}>
                    <label htmlFor="search-input"></label>
                    <input
                        className="search-input"
                        id="search-input"
                        name="input"
                        placeholder="Search"
                        value={this.state.input}
                        type="text"
                        onChange={event => this.handleChange(event)}
                    />
                    <button type="submit">Search</button>
                </form>
                <button onClick={this.props.clearResults}>Clear</button>
                {
                    !this.state.foundResults
                    ?   <p>No Results Found</p>
                    :   <></>
                }
            </div>            
        )
    }
}

export default Search;
