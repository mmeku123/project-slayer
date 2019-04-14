import React, { Component } from 'react';

import { signInUser } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Student } from '../models';
import { withRouter } from 'react-router';

import SignInForm from '../components/Form/SignInForm';
import { Typography } from 'antd';

const { Title } = Typography;

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
    this.props.auth.isAuth ? this.props.history.push('/project') : null;
  }

  handleSubmitSignIn = (email: string, password: string) => {
    this.props.signInUser(email, password);
  };

  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <Title>Sign In</Title>
        </div>
        <div className="container" style={{ maxWidth: '500px' }}>
          <SignInForm onSubmit={this.handleSubmitSignIn} />
        </div>
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
