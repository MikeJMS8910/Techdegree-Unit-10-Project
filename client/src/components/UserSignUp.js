import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

//handle user sign up
export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: [],
    Id: ''
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      errors,
    } = this.state;

    return ( //return the html to the page
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} onBlur={this.change}
                  placeholder="First Name" />
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName} 
                  onChange={this.change} onBlur={this.change}
                  placeholder="Last Name" />
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} onBlur={this.change}
                  placeholder="Email Address" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} onBlur={this.change}
                  placeholder="Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => { //change event
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  finishSubmit = (user) => { //this signs the user in and then calls the finalizesignup

    if(user !== null && typeof(user) !== 'undefined') {
      const { context } = this.props;
      console.log(user)
      context.actions.signIn(user, this.finalizeSignUp, this.handleError);
      
    }
  }

  finalizeSignUp = (user) => { //when this is triggered it will make sure that the user is defined and then run the finalizeSignIn in the context.js to authenticate the user and add the cookie value

    if(user !== null && typeof(user) !== 'undefined') {
      const { context } = this.props;
      console.log(user)
      context.actions.finalizeSignIn(user);
      this.props.history.push('/'); 
    }
  }

  handleError = (error) => { //error handling, will tell the error if there are any errors with signing up
    if(error.isAxiosError) {
      if(typeof (error.response) != 'undefined') {
        if(error.response.status === 400) {
          this.setState( {errors: error.response.data.errors} );
        } else {
          this.setState( {errors: [error.response.data.message]});
          this.props.history.push('/error');
        }
      }
    }
  }

  //when the information is submitted it will set all of the inputed values for the users
  submit = async () => {
      const { context } = this.props;
      const {
        firstName,
        lastName,
        emailAddress,
        password,
        Id
      } = this.state;

      const user = {
        firstName,
        lastName,
        emailAddress,
        password,
        Id
      };
      
      context.actions.addNewUser(user, this.finishSubmit, this.handleError);
    }


  cancel = () => {
   this.props.history.push('/');
  }
}
