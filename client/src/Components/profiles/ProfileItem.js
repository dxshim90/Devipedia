import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios'



const ProfileItem = ({
  profile: {
    user: { _id, name},
    status,
    company,
    location,
    skills,
    githubusername
  }
}) => {
  const [data, setData] = useState({imageURL : ''});

  useEffect(() => {
    const fetchData = async () => {
  const result = await axios(`/api/profile/github/users/${githubusername}`,)
  setData(result.data);

}
fetchData()
},[]);

  return (
    <div className='profile bg-light'>
      <img className='round-img' src={data.avatar_url} alt='' />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`}>
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={_id}>
            <i className='fas fa-check' /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};



ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
