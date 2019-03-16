import React, { Component } from 'react';

import { Student, Teacher } from '../../models';

interface IProjectMembersProps {
  members: Student[];
}

class ProjectMembers extends Component<IProjectMembersProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let members: Student[] = this.props.members;

    return (
      <div>
        <h5>Project Members</h5>

        {members.map(member => {
          return (
            <div>
              <b>{member.name}</b>
              <ul>
                <li>id {member.id}</li>
                <li>email {member.email}</li>
                <li>nickname {member.nickname}</li>
                <li>job {member.job}</li>
                <li>
                  task
                  <ol>
                    {member.tasks.map(task => {
                      return <li>{task.name}</li>;
                    })}
                  </ol>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ProjectMembers;
