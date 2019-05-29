import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../Actions/Profile';

const Profiles = ({ getProfiles, profile: { profiles } }) => {
useEffect(() => {
    getProfiles();
  }, [getProfiles]);


  return (
        <div>
          <h1>Developers</h1>
          <p >
            <i className='fab fa-connectdevelop' /> Browse and connect with
            developers
          </p>
          <div>
            {profiles.length !== 0 ? (
            profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </div>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  profiles: state.profiles
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
