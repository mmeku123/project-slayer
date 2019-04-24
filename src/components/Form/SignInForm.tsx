import React, { Component } from 'react';

import { Form, Icon, Input, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

class SignInForm extends Component<{
  form;
  onSubmit: (username, password) => void;
}> {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values.userName, values.password);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [
              {
                required: true,
                message: 'Please input your username!'
              },
              {
                type: 'email',
                message: 'Please input a valid email'
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your Password!' },
              { min: 6, message: 'Password must be minimum 6 characters' }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>

        <Form.Item>
          <Row>
            <Col>
              <Button
                style={{ width: '100%' }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Col>
          </Row>
          <Row>
            Or <Link to="/signup">register now!</Link>
          </Row>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedSignInForm = Form.create({ name: 'normal_login' })(SignInForm);

export default WrappedSignInForm;
