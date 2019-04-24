import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message, Button } from 'antd';
import { Actor } from '../models';

class Indicator extends Component<{ actor: Actor }> {
  constructor(props) {
    super(props);
  }

  renderNotification() {
    const notification = this.props.actor.notification;
    const { isShow, type } = notification;
    const notiMessage = notification.message;

    if (isShow) {
      switch (type) {
        case 'LOADING':
          message.loading(notiMessage, 0.5);
          break;
        case 'NORMAL':
          message.info(notiMessage);
          break;
        case 'SUCCESS':
          message.success(notiMessage);
          break;
        case 'WARNING':
          message.warning(notiMessage);
          break;
        case 'ERROR':
          message.error(notiMessage);
          break;
        default:
          break;
      }
    }
    return <div />;
  }

  render() {
    return <div>{this.renderNotification()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    actor: state.actor
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Indicator);
