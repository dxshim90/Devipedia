import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../Actions/auth';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <ul>
      <li>

        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/dashboard'>

          <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <span>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link className='btn-nav' to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link className='btn-nav' to='/register'>Register</Link>
      </li>
      <li>
        <Link className='btn-nav' to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <div >
    <nav className="nav-con">
      <h1 className='logo'>
        <Link  to='/'>
          <i class="fas fa-terminal"></i> DevConnect
        </Link>
      </h1>
      {(
        <div className="nav-links">{isAuthenticated ? authLinks : guestLinks}</div>
      )}
    </nav>
  </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
