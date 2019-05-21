import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../Actions/Profile.js";
import { withRouter } from 'react-router-dom'

class CreateProfile extends Component {
  state = {
    formData: {
      company: "",
      website: "",
      location: "",
      bio: "",
      status: "",
      githubusername: "",
      skills: "",
      youtube: "",
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: ""
    }
  };

  onChange(e) {
    const { formData } = { ...this.state };
    const currentState = formData;
    const { name, value } = e.target;
    currentState[name] = value;
    this.setState({ formData: currentState });
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.createprofile(this.state.formData, this.props.history)
  }


  render() {
    return (
      <section className="container">
        <h1 className="large text-primary">Create Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user" /> Let's get some information to make your
          profile stand out
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={(e) => this.onSubmit(e)}>
          <div className="form-group">
            <select name="status" value={this.state.formData.status} onChange={e => this.onChange(e)}>
              <option value="0">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Other">Other</option>
            </select>
            <small className="form-text">
              Give us an idea of where you are at in your career
            </small>
          </div>
          <div className="form-group">
            <input type="text" placeholder="Company" name="company"
            value={this.state.formData.company}
            onChange={e => this.onChange(e)} />
            <small className="form-text">
              Could be your own company or one you work for
            </small>
          </div>
          <div className="form-group">
            <input type="text" placeholder="Website" name="website" value={this.state.formData.website} onChange={e => this.onChange(e)} />
            <small className="form-text">
              Could be your own or a company website
            </small>
          </div>
          <div className="form-group">
            <input type="text" placeholder="Location" name="location" value={this.state.formData.location} onChange={e => this.onChange(e)}  />
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className="form-group">
            <input type="text" placeholder="* Skills" name="skills" value={this.state.formData.skills} onChange={e => this.onChange(e)}  />
            <small className="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="*Github Username"
              name="githubusername"
              value={this.state.formData.githubusername} onChange={e => this.onChange(e)}
            />
            <small className="form-text">
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div className="form-group">
            <textarea placeholder="A short bio of yourself" name="bio" value={this.state.formData.bio} onChange={e => this.onChange(e)}  />
            <small className="form-text">Tell us a little about yourself</small>
          </div>

          <div className="form-group social-input">
            <i className="fab fa-twitter fa-2x" />
            <input type="text" placeholder="Twitter URL" name="twitter" value={this.state.formData.twitter} onChange={e => this.onChange(e)}  />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-facebook fa-2x" />
            <input type="text" placeholder="Facebook URL" name="facebook" value={this.state.formData.facebook} onChange={e => this.onChange(e)}  />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-youtube fa-2x" />
            <input type="text" placeholder="YouTube URL" name="youtube" value={this.state.formData.youtube} onChange={e => this.onChange(e)}  />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-linkedin fa-2x" />
            <input type="text" placeholder="Linkedin URL" name="linkedin" value={this.state.formData.linkedin} onChange={e => this.onChange(e)}  />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-instagram fa-2x" />
            <input type="text" placeholder="Instagram URL" name="instagram" value={this.state.formData.instagram} onChange={e => this.onChange(e)}  />
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <a class="btn btn-light my-1" href="dashboard.html">
            Go Back
          </a>
        </form>
      </section>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};
export default connect(
  null,
  { createProfile }
)(withRouter(CreateProfile));
