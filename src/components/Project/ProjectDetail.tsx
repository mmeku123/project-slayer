import React, { Component } from 'react';
import Project from '../../models/Project';
import { connect } from 'react-redux';
import { editProject } from '../../actions';
import { bindActionCreators } from 'redux';
import EditType from '../../constant/editType';

import { Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

interface IProjectDetailProps {
  projects: {
    projects: Project[];
    focusProject: Project;
    isFocusProject: boolean;
    isLoading: boolean;
  };
  editProject: (projectId: string, editType: EditType, detail) => void;
}

interface IProjectDetailStates {
  editDetail: string;
  isEdit: boolean;
  isEditDone: boolean;
}

class ProjectDetail extends Component<
  IProjectDetailProps,
  IProjectDetailStates
> {
  constructor(props) {
    super(props);
    this.state = {
      editDetail: this.props.projects.focusProject.detail,
      isEdit: false,
      isEditDone: false
    };
  }

  confirmEdit = () => {
    this.setState(state => ({ ...state, isEdit: false }));
    this.props.editProject(
      this.props.projects.focusProject._id,
      EditType.DETAIL,
      this.state.editDetail
    );
  };

  onChangeDetail = str => {
    this.setState({ isEdit: true, editDetail: str });
  };

  showConfirmEditDetail = () => {
    return (
      <div>
        <button onClick={this.confirmEdit}>Save</button>
      </div>
    );
  };

  renderProjectDetail = () => {
    return (
      <div>
        <Text editable={{ onChange: this.onChangeDetail }}>
          {this.state.editDetail}
        </Text>

        {this.state.isEdit ? this.showConfirmEditDetail() : <div />}
      </div>
    );
  };

  render() {
    let { name } = this.props.projects.focusProject;

    return (
      <div>
        <Title level={2}>Project Name </Title>
        <div> {name} </div>
        <div>
          {' '}
          Project Detail
          {this.renderProjectDetail()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { projects: state.projects };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ editProject }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetail);
