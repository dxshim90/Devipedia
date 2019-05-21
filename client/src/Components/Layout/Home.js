import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Home extends Component {
  render() {
    if (this.props.isAuth) {
      return <Redirect to="/Dashboard" />;
    }
    return (
      <section className="home">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Developer Connector</h1>
            <p className="lead">
              Create a developer profile/portfolio, share posts and get help
              from other developers
            </p>
            <div className="buttons">
              <Link to="/register" class="btn btn-primary">
                Sign Up
              </Link>
              <Link to="/login" class="btn btn-light">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Home.propTypes = {
  isAuth: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(Home);
