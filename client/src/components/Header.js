

import React from 'react';
//import { Link } from 'react-router-dom';

//header component
export default class Header extends React.PureComponent {

    renderHeaderLinks = () => { //renders the info for the users like name and sign out
      let html = {}
      if(this.props.context.authenticatedUser) {
        const name = this.props.context.authenticatedUser.firstName + '  ' + this.props.context.authenticatedUser.lastName;
        html = <nav><span>Welcome {name}!</span><a className="signout" href="/signout">Sign Out</a></nav>;
      } else {        
        html = <nav><a className="signup" href="/signup">Sign Up</a><a className="signin" href="/signin">Sign In</a></nav>;
      }

      return html;
    }
    
    render() { //render the results

      return (
        <>
          <div className = "header" >
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link href="https://fonts.googleapis.com/css?family=Work+Sans:400,500" rel="stylesheet" type="text/css" />
            <link href="https://fonts.googleapis.com/css?family=Cousine" rel="stylesheet" type="text/css" />
            <link href="../styles/global.css" rel="stylesheet" />
            <title>Courses</title>
              <div>
                  <div className="bounds">
                    <h1 className="header--logo">Courses</h1>
                    {this.renderHeaderLinks()} 
                  </div>
              </div>
            </div>
        </>
      );
    }
};