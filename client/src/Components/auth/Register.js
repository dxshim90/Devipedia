import React, { Component } from "react";
import axios from "axios";

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
      alert("Passwords do not match");
    } else {
      const { name, email, password } = this.state.formData;
      const newUser = {
        name,
        email,
        password
      };
      try {
        const config = {
          headers: { "Content-Type": "Application/json" }
        };
        const body = JSON.stringify(newUser);

        const response = await axios.post("/api/users", body, config);
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  render() {
    return (
      <section class="container">
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
              required
            />
          </div>
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
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={this.state.formData.password2}
              onChange={e => this.onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <a href="login.html">Sign In</a>
        </p>
      </section>
    );
  }
}

export default Register;
