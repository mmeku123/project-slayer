import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
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
                <li className="active">
                  <a href="/">Home</a>
                </li>
                <li>
                  <a style={{ cursor: 'not-allowed' }}>Sign In</a>
                </li>
                <li>
                  <a style={{ cursor: 'not-allowed' }}>Sign Up</a>
                </li>
                <li>
                  <a href="/project">My Project</a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
