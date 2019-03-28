import React, { Component } from 'react';

import { authStudent } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface ISignInProps {
  authStudent: () => void;
}

class SignIn extends Component<ISignInProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  authUser = () => {
    this.props.authStudent();
  };

  render() {
    return (
      <div>
        Sign In
        <button onClick={this.authUser}>Sign In</button>
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
      authStudent
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
