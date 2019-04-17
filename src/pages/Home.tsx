import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class HomePage extends Component {
  render() {
    return (
      <section id="intro" className="clearfix">
        <div className="container d-flex h-100">
          <div className="row justify-content-center align-self-center">
            <div className="col-md-6 intro-info order-md-first order-last">
              <h2>
                Project Management
                <br />
                for all of your <br /> <span>projects!</span>
              </h2>
              <div>
                <Link to="/project" className="btn-get-started scrollto">
                  Get Started
                </Link>
              </div>
            </div>
            <div className="col-md-6 intro-img order-md-last order-first">
              <img src="img/intro-img.svg" alt="" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default HomePage;
