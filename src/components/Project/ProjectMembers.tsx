import React, { Component } from 'react';

import { Student, Teacher } from '../../models';
import { EditType } from '../../constant/editType';

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
                  <li>
                    task
                    <ol>
                      {member.tasks.map(task => {
                        return (
                          <li key={task._id}>
                            {task.name} {task.isDone ? 'completed' : 'active'}
                          </li>
                        );
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
