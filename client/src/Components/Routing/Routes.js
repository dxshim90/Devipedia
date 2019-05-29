import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../Layout/Alert';
import Dashboard from '../Dashboard/dashboard';
import CreateProfile from '../Profile-forms/createprofile';
import EditProfile from '../Profile-forms/EditProfile';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import PrivateRoute from '../Routing/Privateroute.js';
import AddExperience from '../Profile-forms/AddExperience';
import Post from '../post/Post.js'



const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
          <PrivateRoute exact path='/posts' component={Posts} />
   <PrivateRoute exact path='/posts/:id' component={Post} />
      </Switch>
    </section>
  );
};

export default Routes;
