import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//handles signing out
export default class UserSignOut extends Component {
  
  componentWillMount() {
    const { context } = this.props;
    context.actions.signOut();
  }

  render () { //redirects to the home page
    return (
      <Redirect to="/" />
    );
  }
}
