import React, { Component } from 'react';
import { Comment, Project } from '../../models';
import { ProjectProgress, ProjectSchedule } from '../../models/Project';

import ProjectMembers from './ProjectMembers';
import ProjectComments from './ProjectComments';
import ProjectDetail from './ProjectDetail';
import ProjectTime from './ProjectTime';
import ProjectPercent from './ProjectPercent';
import ProjectTasks from './ProjectTasks';

interface IProjectThingProps {
  project: Project;
}

class ProjectThing extends Component<IProjectThingProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let project: Project = this.props.project;
    let {
      name,
      detail,
      tasks,
      members,
      comments,
      progress,
      schedule
    } = project;

    return (
      <div>
        <ProjectDetail name={name} detail={detail} />
        <ProjectMembers members={members} />
        <ProjectTasks tasks={tasks} />
        <ProjectComments comments={comments} />
        <ProjectPercent progress={progress} />
        <ProjectTime schedule={schedule} />
      </div>
    );
  }
}

export default ProjectThing;
