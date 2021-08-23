
import React, { Component } from 'react';

export default class Courses extends Component {

  htmlInsert = [];

  componentDidMount() {
    const { context } = this.props;
    context.actions.getCourses(this.updateCourses, this.handleError);
    
  }

  updateCourses = (response) => { 
    this.htmlInsert = [];
    if(response !== null && typeof(response) !=='undefined') {
      response.forEach((element, index) => {
        const path = `/courses/${element.id}`;
        this.htmlInsert.push(        
              <div key={index} className="grid-33"><a className="course--module course--link" href={path} >
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{element.title}</h3>
                </a></div>
          );
      });
      this.setState({});
    }
  }

  handleError = (error) => { //error handling
    if(error.isAxiosError) {
      if(typeof(error.response) !== 'undefined') {
        if(error.response.status !== 200) {          
          this.props.history.push('/error')
        }
      }
      else {
        this.props.history.push('/error');
      }
    }
    else {
      this.props.history.push('/error');
    }
  }

  handleCreateCourseClick = (event) => { //handles when the user clicks create course
    const { context } = this.props;
    if(context.authenticatedUser !== null) {
      this.props.history.push('/courses/create');
    } else {
      context.actions.setRedirect('/courses/create');
      this.props.history.push('/signin');
    }
  }

  render() { //render the results
    return (
      
      <div id="root">
        <hr />
        <div className="bounds">
          {
            this.htmlInsert
          }
          <div href="" className="grid-33"><a className="course--module course--add--module" onClick={this.handleCreateCourseClick}>
                <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
                  </svg>New Course</h3>
              </a></div>
        </div>
      </div>        
    );
  }
}
