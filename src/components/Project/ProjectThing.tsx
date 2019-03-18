import React, { Component } from 'react';
import { Comment, Project } from '../../models';
import { ProjectProgress, ProjectSchedule } from '../../models/Project';

import ProjectMembers from './ProjectMembers';
import ProjectComments from './ProjectComments';
import ProjectDetail from './ProjectDetail';
import ProjectTime from './ProjectTime';
import ProjectPercent from './ProjectPercent';
import ProjectTasks from './ProjectTasks';

enum ShowType {
  DETAIL,
  TASK,
  MEMBER,
  COMMENT,
  PROGRESS,
  TIMELINE
}

interface IProjectThingProps {
  project: Project;
}

interface IProjectThingStates {
  showType: ShowType;
}

class ProjectThing extends Component<IProjectThingProps, IProjectThingStates> {
  constructor(props) {
    super(props);
    this.state = {
      showType: ShowType.DETAIL
    };
  }

  changeShowType = (type: ShowType) => {
    this.setState({ showType: type });
  };

  renderSelectedShowButtons = () => {
    return (
      <div>
        <button onClick={event => this.changeShowType(ShowType.DETAIL)}>
          Detail
        </button>
        <button onClick={event => this.changeShowType(ShowType.MEMBER)}>
          Member
        </button>
        <button onClick={event => this.changeShowType(ShowType.TASK)}>
          Task
        </button>
        <button onClick={event => this.changeShowType(ShowType.COMMENT)}>
          Comment
        </button>
        <button onClick={event => this.changeShowType(ShowType.PROGRESS)}>
          Progress
        </button>
        <button onClick={event => this.changeShowType(ShowType.TIMELINE)}>
          Timeline
        </button>
      </div>
    );
  };

  renderProjectShowing = () => {
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

    switch (this.state.showType) {
      case ShowType.DETAIL:
        return <ProjectDetail name={name} detail={detail} />;
      case ShowType.TASK:
        return <ProjectTasks tasks={tasks} />;
      case ShowType.COMMENT:
        return <ProjectComments comments={comments} />;
      case ShowType.MEMBER:
        return <ProjectMembers members={members} />;
      case ShowType.TIMELINE:
        return <ProjectTime schedule={schedule} />;
      case ShowType.PROGRESS:
        return <ProjectPercent progress={progress} />;
    }
  };

  render() {
    return (
      <div>
        {this.renderSelectedShowButtons()}

        {this.renderProjectShowing()}
      </div>
    );
  }
}

export default ProjectThing;
