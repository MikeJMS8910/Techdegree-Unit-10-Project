import React from 'react';
import { Link } from 'react-router-dom'

//404 page
export default () => (
  <div className="bounds">
    <h1>Not Found</h1>
    <p>Sorry! We couldn't find the page you're looking for.</p>
    <p>
      <Link to="/">Click here </Link> to go to the home page!
    </p>
  </div>
);
