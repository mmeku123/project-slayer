import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { autoAuth } from '../actions';
import { Student } from '../models';

interface IHeaderProps {
  auth: { user: Student; isAuth: boolean; authId: string };
  autoAuth: () => void;
}

interface IHeaderStates {}

class Header extends Component<IHeaderProps, IHeaderStates> {
  componentWillMount() {
    console.log('will mount');
    this.props.autoAuth();
  }

  render() {
    return (
      <div>
        <header id="header" style={{ position: 'absolute' }}>
          <div className="container">
            <div className="logo float-left">
              <h1 className="text-light">
                <a href="/" className="scrollto">
                  <span>Project Slayer</span>
                </a>
              </h1>
            </div>
            <nav className="main-nav float-right d-none d-lg-block">
              <ul>
                {this.props.auth.isAuth ? (
                  <li>
                    <Link to="/logout">Log out</Link>
                  </li>
                ) : (
                  <div>
                    <li>
                      <Link to="/signin">Sign In</Link>
                    </li>

                    <li>
                      <Link to="/signup">Sign Up</Link>
                    </li>
                  </div>
                )}
                <li>
                  <Link to="/project">Project</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
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
      autoAuth
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
