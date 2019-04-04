import React, { Component } from 'react';

import { signInUser } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Student } from '../models';
import { withRouter } from 'react-router';

interface ISignInProps {
  auth: { user: Student; isAuth: boolean; authId: string };
  signInUser: (email: string, password: string) => void;
  history;
}

interface ISignInStates {
  auth: { email: string; password: string };
}

class SignIn extends Component<ISignInProps, ISignInStates> {
  constructor(props) {
    super(props);
    this.state = { auth: { email: '', password: '' } };
  }

  componentDidUpdate() {
    console.log(this.props.auth.isAuth);
    this.props.auth.isAuth ? this.props.history.push('/project') : null;
  }

  handleUserSignIn = () => {
    const { email, password } = this.state.auth;
    this.props.signInUser(email, password);
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
    return (
      <div>
        Sign In
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
            <button onClick={this.handleUserSignIn}>Submit</button>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      signInUser
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignIn));
