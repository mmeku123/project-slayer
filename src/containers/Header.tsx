import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { autoAuth } from '../actions';
import { Student } from '../models';

import { isMediumScreen } from '../utils/screen';
import { Icon } from 'antd';

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

  updateDimensions = () => {
    this.setState({});
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  renderShortHeader = () => {
    return (
      <header id="header">
        <div className="container">
          <div className="logo float-left">
            <h1 className="text-light">
              <Link to="/" className="scrollto">
                <span>
                  {window.innerWidth <= 430 ? (
                    <i>Proj. Slayer</i>
                  ) : (
                    <i>Project Slayer</i>
                  )}
                </span>
              </Link>
            </h1>
          </div>
          <nav className="main-nav float-right d-lg-block">
            <ul>
              <li>
                <Link to="/">
                  <Icon type="home" />
                </Link>
              </li>
              {this.props.auth.isAuth ? (
                <li>
                  <Link to="/logout">
                    <Icon type="poweroff" />
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/signin">
                    <Icon type="user" />
                  </Link>
                </li>
              )}

              {this.props.auth.isAuth ? (
                <li>
                  <Link to="/project">
                    <Icon type="project" />
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/signup">
                    <Icon type="form" />
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    );
  };

  renderFullHeader = () => {
    return (
      <header id="header">
        <div className="container">
          <div className="logo float-left">
            <h1 className="text-light">
              <Link to="/" className="scrollto">
                <span>
                  <i>Project Slayer</i>
                </span>
              </Link>
            </h1>
          </div>
          <nav className="main-nav float-right d-lg-block">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {this.props.auth.isAuth ? (
                <li>
                  <Link to="/logout">Log out</Link>
                </li>
              ) : (
                <li>
                  <Link to="/signin">Sign In</Link>
                </li>
              )}

              {this.props.auth.isAuth ? (
                <li>
                  <Link to="/project">Project</Link>
                </li>
              ) : (
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    );
  };

  render() {
    return (
      <div>
        {isMediumScreen() ? this.renderShortHeader() : this.renderFullHeader()}
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
