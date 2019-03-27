import React, { Component } from 'react';
import { Comment, Project } from '../../models';
import { ProjectProgress, ProjectSchedule } from '../../models/Project';

import { editProject } from '../../actions';

import { connect } from 'react-redux';

import ProjectMembers from './ProjectMembers';
import ProjectChat from './ProjectChat';
import ProjectDetail from './ProjectDetail';
import ProjectTime from './ProjectTime';
import ProjectPercent from './ProjectPercent';
import ProjectTasks from './ProjectTasks';
import { bindActionCreators } from 'redux';

enum ShowType {
  DETAIL,
  TASK,
  MEMBER,
  CHAT,
  PROGRESS,
  TIMELINE,
  NONE
}

interface IProjectThingProps {
  project: Project;
  editProject: (editType: string, projectName: string, value: any) => void;
}

interface IProjectThingStates {
  showType: ShowType;
}

class ProjectThing extends Component<IProjectThingProps, IProjectThingStates> {
  constructor(props) {
    super(props);
    this.state = {
      showType: ShowType.NONE
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
        <button onClick={event => this.changeShowType(ShowType.CHAT)}>
          Chat
        </button>
        {/* <button onClick={event => this.changeShowType(ShowType.PROGRESS)}>
          Progress
        </button> */}
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
      studentIds,
      commentIds,
      progress,
      schedule
    } = project;

    switch (this.state.showType) {
      case ShowType.DETAIL:
        return <ProjectDetail />;
      case ShowType.MEMBER:
        return <ProjectMembers members={null} />;
      case ShowType.TASK:
        return <ProjectTasks tasks={tasks} />;
      case ShowType.CHAT:
        return <ProjectChat comments={null} />;
      // case ShowType.PROGRESS:
      //   return <ProjectPercent progress={progress} />;
      case ShowType.TIMELINE:
        return <ProjectTime schedule={schedule} />;
      default:
        return <div />;
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ editProject }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(ProjectThing);
