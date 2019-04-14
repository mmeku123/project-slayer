import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUpUser, logOutUser } from '../actions';
import { Student } from '../models';
import { withRouter } from 'react-router';
import { Typography } from 'antd';
const { Title } = Typography;
import SignUpForm from '../components/Form/SignUpForm';
class SignUp extends Component<
  {
    auth: { user: Student; isAuth: boolean; authId: string };
    signUpUser: (email: string, password: string, profile) => void;
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

  handleSubmitSignUp = (email, password, profile) => {
    this.props.signUpUser(email, password, profile);
  };

  render() {
    console.log(this.props.auth);
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <Title>Sign Up</Title>
        </div>
        <div className="container" style={{ maxWidth: '500px' }}>
          <SignUpForm onSubmit={this.handleSubmitSignUp} />
        </div>
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
