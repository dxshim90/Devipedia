import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../Actions/alert.js";
import { login } from "../../Actions/auth.js";
import PropTypes from "prop-types";

class Login extends Component {
  state = {
    formData: {
      email: "",
      password: ""
    }
  };

  onChange(e) {
    const { formData } = { ...this.state };
    const currentState = formData;
    const { name, value } = e.target;
    currentState[name] = value;

    this.setState({ formData: currentState });
  }

  onSubmit = async e => {
    e.preventDefault();
    const { password, email } = this.state.formData;
    this.props.login({ email, password });
  };

  render(props) {
    if (this.props.isAuth) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <section class="container">
        <h1 className="large text-primary">Sign In</h1>
        <form className="form" onSubmit={e => this.onSubmit(e)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={this.state.formData.email}
              onChange={e => this.onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={this.state.formData.password}
              onChange={e => this.onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Log In" />
        </form>
        <p className="my-1">
          Dont have an account? <Link to="/register">Sign up</Link>
        </p>
      </section>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(
  mapStateToProps,
  { setAlert, login }
)(Login);
