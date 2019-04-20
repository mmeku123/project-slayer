import React, { Component } from 'react';

import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';

import CharacterAvatars from '../../images/avatar';
import { Link } from 'react-router-dom';

class SignUpForm extends Component<
  {
    form;
    onSubmit: (username, password, profile) => void;
  },
  { profileImg: string }
> {
  constructor(props) {
    super(props);
    this.state = { profileImg: CharacterAvatars[0] };
  }

  handleChangeAvatar = imgPath => {
    this.setState({ profileImg: imgPath });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values.userName, values.password, {
          email: values.userName,
          id: values.studentId,
          name: values.nickname,
          phone: values.phone,
          job: values.job,
          img: this.state.profileImg
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    return (
      <Form
        {...formItemLayout}
        onSubmit={this.handleSubmit}
        className="login-form"
      >
        <Form.Item label="Email">
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
              placeholder="fameza@123.com"
            />
          )}
        </Form.Item>
        <Form.Item label="Password">
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
        <Form.Item label="Student ID">
          {getFieldDecorator('studentId', {
            rules: [
              {
                required: true,
                message: 'Please input your student ID!'
              }
            ]
          })(
            <Input
              prefix={
                <Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="590612345"
            />
          )}
        </Form.Item>
        <Form.Item label="Nickname">
          {getFieldDecorator('nickname')(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Fameoki"
            />
          )}
        </Form.Item>
        <Form.Item label="Phone Number">
          {getFieldDecorator('phone')(
            <Input
              prefix={
                <Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="0812345678"
            />
          )}
        </Form.Item>
        <Form.Item label="Project Role">
          {getFieldDecorator('job')(
            <Input
              prefix={
                <Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="Developer, Product Owner"
            />
          )}
        </Form.Item>
        <Form.Item label="Avatar">
          <div>
            {CharacterAvatars.map(image => {
              return (
                <Button
                  key={image}
                  style={{ width: '90px', height: '90px', margin: '4px' }}
                  onClick={() => this.handleChangeAvatar(image)}
                >
                  <img width="100%" height="100%" alt={image} src={image} />
                </Button>
              );
            })}
          </div>
        </Form.Item>
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
        <Row style={{ margin: '12px' }}>
          Or <Link to="/signin">Already have an account? </Link>
        </Row>
      </Form>
    );
  }
}

const WrappedSignInForm = Form.create({ name: 'normal_login' })(SignUpForm);

export default WrappedSignInForm;
