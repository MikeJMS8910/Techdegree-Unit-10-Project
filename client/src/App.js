import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
  //Redirect
} from 'react-router-dom';

import './styles/global.css';

import Header from './components/Header'; //import all of the components
import Public from './components/Courses';
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import CourseDetails from './components/CourseDetail';
import Updatecourse from './components/UpdateCourse';
import ForbidenPage from './components/Forbidden';
import ErrorPage from './components/error';
import withContext from './Context';
import PrivateRoute from './routes/PrivateRoute';

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const PublicWithContext = withContext(Public);
const CourseDetailsWithContext = withContext(CourseDetails);
const UpdateCourseWithContext = withContext(Updatecourse);

function App() { //this handles all of the routes
    return (
        <Router>            
            <HeaderWithContext />

            <Switch>
                {/* default route, redirect to courses */} 
                <Route exact path="/" component={PublicWithContext} />
                {/* SignIn Route */} 
                <Route exact path="/signin" component={UserSignInWithContext} />
                {/* SignUp Route*/} 
                <Route exact path="/signup" component={UserSignUpWithContext} />
                {/* SignOut Route */} 
                <Route exact path="/signout" component={UserSignOutWithContext} />
                {/* Create Course Route: Private */} 
                <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
                {/* Update Course Route: Private */} 
                <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} />
                {/* View Course Details Route */} 
                <Route exact path="/courses/:id" component={CourseDetailsWithContext} />
                {/* Default Courses Route */} 
                <Route exact path="/courses" component={PublicWithContext} />
                {/* ERROR REPORTING ROUTES */}
                {/* Forbidden, shows when trying to view a page that is private without AUTH*/}  
                <Route exact path="/forbidden" component={ForbidenPage} />
                {/* Error Page: displays when unknown or 500 returns from axios */} 
                <Route exact path="/error" component={ErrorPage} />
                {/* Page Not Found Route, shows when a route is not found */} 
                <Route path="/notfound" component={NotFound} />
                {/* Page Not Found default Route, shows when a route is not found when a route is manuall hit and does not exist*/} 
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}

export default App;