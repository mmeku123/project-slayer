import React, { Component } from 'react';

import { Student, Teacher, Project, Subject } from '../../models';
import { EditType } from '../../constant/editType';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addProjectMember, addSubjectMember } from '../../actions';
import { string } from 'prop-types';

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

  render() {
    let members: Student[] = this.props.members;

    return (
      <div>
        <h5>Project Members</h5>
        <button onClick={this.handleAddNewMember}>+ Member</button>
        {this.state.isAddingMember ? (
          <div>
            <input
              type="text"
              name="email"
              value={this.state.memberEmail}
              onChange={this.handleInputChange}
            />
            <button onClick={this.handleConfirmAddMember}>Confirm</button>
          </div>
        ) : (
          <div />
        )}
        {members &&
          members.map(member => {
            return (
              <div key={member._id}>
                <b>{member.name}</b>
                <ul>
                  <li>id {member.id}</li>
                  <li>email {member.email}</li>
                  <li>nickname {member.nickname}</li>
                  <li>job {member.job}</li>
                  <li>task</li>
                </ul>
              </div>
            );
          })}
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
