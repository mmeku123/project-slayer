import React, { Component } from 'react';

import { Student, Teacher, Project, Subject } from '../../models';
import EditType from '../../constant/editType';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addProjectMember, addSubjectMember } from '../../actions';
import { string } from 'prop-types';
import { Button, Input, Row, Col } from 'antd';

import avatar from '../../images/avatars/1575649.svg';

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
      <div>
        <h5>Project Members</h5>
        <Button onClick={this.handleAddNewMember}>+ Member</Button>
        {this.state.isAddingMember ? (
          <div>
            <Input
              placeholder="User Email"
              type="text"
              name="email"
              value={this.state.memberEmail}
              onChange={this.handleInputChange}
            />
            <Button type="danger" onClick={this.handleCancelAddMember}>
              Cancel
            </Button>
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
                <Col span={6} offset={2}>
                  <div key={member._id} style={{ textAlign: 'center' }}>
                    <div>
                      <img src={avatar} height={200} />
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <td>1</td>
                          <td>2</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>name</td>
                          <td>{member.name}</td>
                        </tr>
                        <tr>
                          <td>id</td>
                          <td>{member.id}</td>
                        </tr>
                        <tr>
                          <td>email</td>
                          <td>{member.email}</td>
                        </tr>
                        <tr>
                          <td>nickname</td>
                          <td>{member.nickname}</td>
                        </tr>
                        <tr>
                          <td>job</td>
                          <td>{member.job}</td>
                        </tr>
                        <tr>
                          <td>task</td>
                          <td />
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
