import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//handles signing out
export default class CreateCourse extends Component {
  
  componentWillMount() {
    const { context } = this.props;
    context.actions.signOut();
  }

  render () {
    return (
      <Redirect to="/" />
    );
  }
}
