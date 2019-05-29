import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'



const Landing = ({ isAuthenticated, history }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
  <div className='landing'>
    <Segment placeholder>
      <Grid columns={2} relaxed='very' stackable>
        <Grid.Column>


            <Button content='Login' primary size='big' onClick={() => history.push('/login')} />

        </Grid.Column>

        <Grid.Column verticalAlign='middle'>
          <Button content='Sign up' icon='signup' size='big' onClick={() => history.push('/register')}/>
        </Grid.Column>
      </Grid>

      <Divider vertical>Or</Divider>
    </Segment>
    <h1 className='title'>
      Welcome to DevConnect
    </h1>
    <p className='landing-msg'> A place for Devs, to talk about Dev Stuff!</p>
  </div>

  )
};





Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
