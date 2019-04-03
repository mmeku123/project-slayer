import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { autoAuth, logOutUser } from '../actions';
import { Student } from '../models';

interface IHeaderProps {
  auth: { user: Student; isAuth: boolean; authId: string };
  logOutUser: () => void;
  autoAuth: () => void;
}

interface IHeaderStates {}

class Header extends Component<IHeaderProps, IHeaderStates> {
  componentWillMount() {
    console.log('will mount');
    this.props.autoAuth();
  }

  handleUserLogOut = () => {
    this.props.logOutUser();
  };

  render() {
    return (
      <div>
        <h1>Header</h1>
        <Link to="/">Home</Link>

        {this.props.auth.isAuth ? (
          <div>
            <button onClick={this.handleUserLogOut}>Log out</button>
          </div>
        ) : (
          <div>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        <Link to="/project">Project</Link>
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
      autoAuth,
      logOutUser
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
