import React, { Component } from 'react';

import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';

class SignUpForm extends Component<{
  form;
  onSubmit: (username, password, profile) => void;
}> {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values.userName, values.password, {
          // TODO: implement user profile
        });
        console.log('Received values of form: ', values);
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
            <Col span={6}>
              <a href="/">
                <Button
                  style={{ width: '100%' }}
                  type="default"
                  className="login-form-button"
                >
                  Cancel
                </Button>
              </a>
            </Col>
            <Col span={16} offset={2}>
              <Button
                style={{ width: '100%' }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Sign Up
              </Button>
            </Col>
          </Row>
          <Row>
            Or <a href="/signin">Already have an account? </a>
          </Row>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedSignInForm = Form.create({ name: 'normal_login' })(SignUpForm);

export default WrappedSignInForm;
