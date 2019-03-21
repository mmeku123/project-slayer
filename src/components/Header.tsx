import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavDropdown,
  FormControl,
  Button,
  Form
} from 'react-bootstrap';
class Header extends Component {
  render() {
    return (
      <div>
        <header id="header" style={{ position: 'absolute' }}>
          {/* <div id="topbar">
            <div className="container">
              <div className="social-links">
                <a href="#" className="twitter">
                  <i className="fa fa-twitter" />
                </a>
                <a href="#" className="facebook">
                  <i className="fa fa-facebook" />
                </a>
                <a href="#" className="linkedin">
                  <i className="fa fa-linkedin" />
                </a>
                <a href="#" className="instagram">
                  <i className="fa fa-instagram" />
                </a>
              </div>
            </div>
          </div> */}

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
