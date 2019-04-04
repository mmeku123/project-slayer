import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUpUser, logOutUser } from '../actions';
import { Student } from '../models';
import { withRouter } from 'react-router';

class SignUp extends Component<
  {
    auth: { user: Student; isAuth: boolean; authId: string };
    signUpUser: (email: string, password: string) => void;
    history;
  },
  { auth: { email: string; password: string } }
> {
  constructor(props) {
    super(props);
    this.state = { auth: { email: '', password: '' } };
  }

  componentDidUpdate() {
    this.props.auth.isAuth ? this.props.history.push('/project') : null;
  }

  handleSubmitSignUp = () => {
    const { email, password } = this.state.auth;
    this.props.signUpUser(email, password);
  };

  handleInputChange = event => {
    const type = event.target.name;

    let { email, password } = this.state.auth;

    switch (type) {
      case 'email':
        email = event.target.value;
        break;
      case 'password':
        password = event.target.value;
        break;
    }

    this.setState(state => ({ ...state, auth: { email, password } }));
  };

  render() {
    console.log(this.props.auth);
    return (
      <div>
        {!this.props.auth.isAuth ? (
          <div>
            <input
              type="email"
              name="email"
              onChange={this.handleInputChange}
              value={this.state.auth.email}
            />
            <input
              type="password"
              name="password"
              onChange={this.handleInputChange}
              value={this.state.auth.password}
            />
            <button onClick={this.handleSubmitSignUp}>Submit</button>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ signUpUser, logOutUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignUp));
