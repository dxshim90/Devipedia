import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getGithubImage } from '../../Actions/Profile';
import axios from 'axios'

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name },
    githubusername,

  }
}) => {

  const [data, setData] = useState({imageURL : ''});

  useEffect(() => {
    const fetchData = async () => {
  const result = await axios(`http://localhost:3000/api/profile/github/users/${githubusername}`,)
  setData(result.data);
}
fetchData()
  },[]);

  return (
    <div>
      <img  src={data.avatar_url} alt='' />
      <h1>{name}</h1>
      <p>
        {status} {company && <span> at {company}</span>}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <div>
        {website && (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <i className='fas fa-globe fa-2x' />
          </a>
        )}
        {social && social.twitter && (
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-twitter fa-2x' />
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x' />
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-linkedin fa-2x' />
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-youtube fa-2x' />
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram fa-2x' />
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
