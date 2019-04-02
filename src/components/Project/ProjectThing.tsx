import React, { Component } from 'react';
import { Comment, Project, Student, Task } from '../../models';
import { ProjectProgress, ProjectSchedule } from '../../models/Project';

import { editProject } from '../../actions';

import { connect } from 'react-redux';

import ProjectMembers from './ProjectMembers';
import ProjectDetail from './ProjectDetail';
import ProjectTime from './ProjectTime';
import ProjectPercent from './ProjectPercent';
import ProjectTasks from './ProjectTasks';
import { bindActionCreators } from 'redux';
import { EditType } from '../../constant/editType';

enum ShowType {
  DETAIL,
  TASK,
  MEMBER,
  PROGRESS,
  TIMELINE,
  NONE
}

interface IProjectThingProps {
  tasks: Task[];
  members: Student[];
  project: Project;
  editProject: (projectId: string, editType: EditType, value: any) => void;
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
    let { name, detail, studentIds, commentIds, progress, schedule } = project;

    console.log('members', this.props.members);

    switch (this.state.showType) {
      case ShowType.DETAIL:
        return <ProjectDetail />;
      case ShowType.MEMBER:
        return <ProjectMembers members={this.props.members} />;
      case ShowType.TASK:
        return <ProjectTasks tasks={this.props.tasks} />;
      case ShowType.TIMELINE:
        return <ProjectTime projectId={project._id} schedule={schedule} />;
      default:
        return <div />;
    }
  };

  render() {
    console.log(this.props.project);

    return (
      <div>
        {this.renderSelectedShowButtons()}

        {this.renderProjectShowing()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    members: state.members,
    tasks: state.tasks
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ editProject }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectThing);
