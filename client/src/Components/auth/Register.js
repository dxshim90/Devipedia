import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../Actions/alert.js";
import { register } from "../../Actions/auth.js";
import PropTypes from "prop-types";

class Register extends Component {
  state = {
    formData: {
      name: "",
      email: "",
      password: "",
      password2: ""
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
    if (this.state.formData.password !== this.state.formData.password2) {
      this.props.setAlert("Passwords do not match", "error");
    } else {
      const { name, password, email } = this.state.formData;
      this.props.register({ name, email, password });
    }
  };

  render(props) {
    if (this.props.isAuth) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user" /> Create Your Account
        </p>
        <form className="form" onSubmit={e => this.onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={this.state.formData.name}
              onChange={e => this.onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={this.state.formData.email}
              onChange={e => this.onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.formData.password}
              onChange={e => this.onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={this.state.formData.password2}
              onChange={e => this.onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>
    );
  }
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuth: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
