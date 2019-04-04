import React, { Component } from 'react';
import { autoAuth, logOutUser } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

class LogOut extends Component<{ logOutUser: () => void; history }> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.logOutUser();
    this.props.history.push('/');
  }

  render() {
    return <div>Logout</div>;
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ logOutUser }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(LogOut));
