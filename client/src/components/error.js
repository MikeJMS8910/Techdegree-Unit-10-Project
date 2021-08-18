import React, { Component } from 'react';
import { Link } from 'react-router-dom'

//error handling
export default class Forbidden extends Component {

    render() {  //renders the error
        return (
        <div class="bounds">
            <h1>Internal Server Error</h1>
            <p>{this.props.errors}</p>
            <p>
                <Link to="/">Click here </Link> to go to the home page!
            </p>
        </div>
        
        )
    }
}