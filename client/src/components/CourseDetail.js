import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

export default class CourseDetail extends Component {

  //state of the user and courses
  state = {
    userName: '',
    course_title: '',
    course_description: '',
    course_materials: '',
    course_estimated_time: '',
    isAuthenticated: false,
    ownerName: '',
    isAuthorized: false,
    errors: []
  }

  componentDidMount() {
    
    const { context } = this.props;

    if(typeof(context) !== 'undefined') { 
        
        context.actions.getUserCourseById(this.props.match.params.id, this.updateCourseDetails, this.handleError);
    }
  }

  handleError = (error) => { //error handling
    if(error.isAxiosError) {
      if(error.response) {
        if(error.response.status === 401) {
          this.setState(() => {
            return { errors: [ 'Create Course was unsuccessful', error.response.data.message ] };
          });
        } else if(error.response.status === 404) {
            this.props.history.push('/notfound');
        } else {
          this.props.errors = [error.response.error]
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


  updateCourseDetails = (response) => { //updates the course

   const { context } = this.props;
   const authenticatedUser = context.authenticatedUser;
   
    if(response !== 'undefined') {
      //authenticate user and give them a name
      const authenticated = (authenticatedUser !== null && typeof(authenticatedUser) !== 'undefined');         
      const authorized = authenticated ?  (authenticatedUser.userId === response.userId) : false;
      const ownerName = response.user.firstName + '  ' + response.user.lastName;

      const details = response;
     
      this.setState({
        course_title: details.title,
        course_description: details.description,
        course_materials: details.materialsNeeded,
        course_time: details.estimatedTime,
        isAuthenticated: authenticated,
        isAuthorized: authorized,
        ownerName: ownerName,
        errors: []
      })
    } else {
        this.props.history.push('/error')
    }
  }

  finishSubmit = () => { //submits the info
          
    this.setState(() => 
    {
      //return the info for the course
      return { 
          course_title: '',
          course_description: '',
          course_materials: '',
          course_estimated_time: '',
          isAuthenticated: false,
          isAuthorized: false,
          ownerName: '',
          errors: []
      };
    });

    this.props.history.push('/courses');
  }

  handleUpdateCourseClick = (event) => { //handles the update
    const id = this.props.match.params.id;
    this.props.history.push(`/courses/${id}/update`);
  }

  handleDeleteCourseClick = (event) => { //handles the delete
    const { context } = this.props;

    if(typeof(context) !== 'undefined') { 
     context.actions.deleteCourseById(this.props.match.params.id, this.finishSubmit, this.handleError)
    }
  }

  renderUpdateCourseButton() { //renders the update course button
    if(this.state.isAuthenticated && this.state.isAuthorized) {
      return (
        <>
          <a href="#" className="button" key="updateCourse" onClick={this.handleUpdateCourseClick}>Update Course</a>
          <a href="#" className="button" key="deleteCourse" onClick={this.handleDeleteCourseClick}>Delete Course</a>
        </>
      )
    } else {
      return (<></>)
    }
  }

  render() { //render the html to the page
    return (
      
        <div id="root">
          <div>
            <div>
              <div className="actions--bar">
              <div className="bounds">
                  <div className="grid-100">
                    <span>
                      {this.renderUpdateCourseButton()}
                    </span>
                    <a className="button button-secondary" href="/courses">Return to List</a></div>
                </div>
              </div>
              <div className="bounds course--detail">
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{this.state.course_title}</h3>
                    <p>By {this.state.ownerName}</p>
                  </div>
                  <div className="course--description">
                    <ReactMarkdown plugins={[gfm]} children={this.state.course_description} />            
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>{this.state.course_time}</h3>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <ReactMarkdown plugins={[gfm]} children={this.state.course_materials} />
                        <ul>
                          
                            
                          
                          
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
            
    );
  }
}