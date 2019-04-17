import React, { Component } from 'react';

import { Student, Teacher, Project, Subject } from '../../models';
import EditType from '../../constant/editType';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addProjectMember, addSubjectMember } from '../../actions';
import { string } from 'prop-types';
import { Button, Input, Row, Col, Avatar, Icon } from 'antd';

import avatar from '../../images/avatars/1575649.svg';
import { Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';

interface IProjectMembersProps {
  members: Student[];
  subject: Subject;
  project: Project;
  addProjectMember: (projectId: string, memberEmail: string) => void;
  addSubjectMember: (projectId: string, memberEmail: string) => void;
}

interface IProjectMembersStates {
  isAddingMember: boolean;
  memberEmail: string;
}

class ProjectMembers extends Component<
  IProjectMembersProps,
  IProjectMembersStates
> {
  constructor(props) {
    super(props);
    this.state = { isAddingMember: false, memberEmail: '' };
  }

  handleInputChange = event => {
    const email = event.target.value;
    this.setState(state => ({ ...state, memberEmail: email }));
  };

  handleAddNewMember = () => {
    this.setState({ isAddingMember: true, memberEmail: '' });
  };

  handleConfirmAddMember = () => {
    this.props.addProjectMember(this.props.project._id, this.state.memberEmail);
    this.props.addSubjectMember(this.props.subject._id, this.state.memberEmail);
    this.setState({ isAddingMember: false, memberEmail: '' });
  };

  handleCancelAddMember = () => {
    this.setState({ isAddingMember: false, memberEmail: '' });
  };

  render() {
    let members: Student[] = this.props.members;

    return (
      <div style={{ textAlign: 'center' }}>
        <Title>Project Members</Title>
        <Button onClick={this.handleAddNewMember} style={{ height: '45px' }}>
          <Icon style={{ fontSize: '24px' }} type="usergroup-add" /> Add Member
        </Button>
        {this.state.isAddingMember ? (
          <div style={{ margin: '20px' }}>
            <Input
              placeholder="User Email"
              type="text"
              name="email"
              value={this.state.memberEmail}
              onChange={this.handleInputChange}
              style={{ width: '200px', marginLeft: '50px' }}
            />
            <Button onClick={this.handleCancelAddMember}>Cancel</Button>
            <Button type="primary" onClick={this.handleConfirmAddMember}>
              Confirm
            </Button>
          </div>
        ) : (
          <div />
        )}
        <Row>
          {members &&
            members.map(member => {
              return (
                <Col md={8} xs={12} style={{ margin: '24px' }}>
                  <div
                    key={member._id}
                    style={{
                      padding: '10px',
                      textAlign: 'center',
                      boxShadow:
                        'rgba(0, 0, 0, 0.2) 0px 2px 2px 0px, rgba(0, 0, 0, 0.01) 0px 4px 4px 0px',
                      borderRadius: '5px'
                    }}
                  >
                    <div>
                      <Avatar size={128} shape="square" icon="user" />
                    </div>
                    <div style={{ height: '20px' }} />
                    <table style={{ lineHeight: '2.5em' }}>
                      <tbody>
                        <tr>
                          <td>
                            <Text strong>Name</Text>
                          </td>
                          <td>{member.name}</td>
                        </tr>
                        <tr>
                          <td>
                            <Text strong>Student ID</Text>
                          </td>
                          <td>{member.id}</td>
                        </tr>
                        <tr>
                          <td>
                            <Text strong>Email</Text>
                          </td>
                          <td>{member.email}</td>
                        </tr>
                        <tr>
                          <td>
                            <Text strong>Nickname</Text>
                          </td>
                          <td>{member.nickname}</td>
                        </tr>
                        <tr>
                          <td>
                            <Text strong>Role</Text>
                          </td>
                          <td>{member.job}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
              );
            })}
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addProjectMember, addSubjectMember }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(ProjectMembers);
