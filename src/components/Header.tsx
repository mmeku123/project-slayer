import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Header extends Component {
  render() {
    return (
      <div>
        <h1>Header</h1>
        <Link to="/">Home</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/project">Project</Link>
      </div>
    );
  }
}

export default Header;
