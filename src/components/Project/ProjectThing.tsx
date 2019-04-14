import React, { Component } from 'react';
import { Comment, Project, Student, Task, Subject } from '../../models';
import { ProjectProgress, ProjectSchedule } from '../../models/Project';

import { Tabs, Icon } from 'antd';

const TabPane = Tabs.TabPane;
import { editProject } from '../../actions';

import { connect } from 'react-redux';

import ProjectMembers from './ProjectMembers';
import ProjectDetail from './ProjectDetail';
import ProjectTime from './ProjectTime';
import ProjectPercent from './ProjectPercent';
import ProjectTasks from './ProjectTasks';
import { bindActionCreators } from 'redux';
import EditType from '../../constant/editType';

import { isMobile } from '../../utils/screen';

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
  subject: Subject;
  editProject: (projectId: string, editType: EditType, value: any) => void;
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

  changeShowType = type => {
    let showType: ShowType = ShowType.DETAIL;

    switch (type) {
      case 'detail':
        showType = ShowType.DETAIL;
        break;
      case 'member':
        showType = ShowType.MEMBER;
        break;
      case 'task':
        showType = ShowType.TASK;
        break;
      case 'timeline':
        showType = ShowType.TIMELINE;
        break;
    }

    this.setState({ showType });
  };

  renderSelectedShowButtons = () => {
    const show = this.renderProjectShowing();

    const mode = isMobile() ? 'top' : 'left';

    return (
      <div style={{ minHeight: '500px' }}>
        <Tabs
          defaultActiveKey="detail"
          tabPosition={mode}
          onChange={this.changeShowType}
        >
          <TabPane
            tab={
              <span>
                <Icon
                  style={{ fontSize: '24px', verticalAlign: '0.1em' }}
                  type="dashboard"
                />
                Detail
              </span>
            }
            key="detail"
          >
            {show}
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon
                  style={{ fontSize: '24px', verticalAlign: '0.1em' }}
                  type="team"
                />
                Member
              </span>
            }
            key="member"
          >
            {show}
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon
                  style={{ fontSize: '24px', verticalAlign: '0.1em' }}
                  type="ordered-list"
                />
                Task
              </span>
            }
            key="task"
          >
            {show}
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon
                  style={{ fontSize: '24px', verticalAlign: '0.1em' }}
                  type="calendar"
                />
                Timeline
              </span>
            }
            key="timeline"
          >
            {show}
          </TabPane>
        </Tabs>
      </div>
    );
  };

  renderProjectShowing = () => {
    let project: Project = this.props.project;
    let { name, detail, studentIds, commentIds, progress, schedule } = project;

    switch (this.state.showType) {
      case ShowType.DETAIL:
        return <ProjectDetail />;
      case ShowType.MEMBER:
        return (
          <ProjectMembers
            subject={this.props.subject}
            project={this.props.project}
            members={this.props.members}
          />
        );
      case ShowType.TASK:
        return <ProjectTasks tasks={this.props.tasks} />;
      case ShowType.TIMELINE:
        return <ProjectTime projectId={project._id} schedule={schedule} />;
      default:
        return <div />;
    }
  };

  render() {
    return <div>{this.renderSelectedShowButtons()}</div>;
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
