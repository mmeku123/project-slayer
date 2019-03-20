import React, { Component } from 'react';
import Project from '../../models/Project';
import { connect } from 'react-redux';
import { editProject } from '../../actions';
import { bindActionCreators } from 'redux';

interface IProjectDetailProps {
  focusProject: Project;
  editProject: (projectName: string, editType: string, detail: string) => void;
}

interface IProjectDetailStates {
  editDetail: string;
  isEdit: boolean;
}

class ProjectDetail extends Component<
  IProjectDetailProps,
  IProjectDetailStates
> {
  constructor(props) {
    super(props);
    this.state = { editDetail: '', isEdit: false };
  }

  showEditDialog = () => {
    this.setState({ editDetail: this.props.focusProject.detail, isEdit: true });
  };

  confirmEdit = () => {
    this.props.editProject(
      this.props.focusProject.name,
      'detail',
      this.state.editDetail
    );
    this.setState({ editDetail: '', isEdit: false });
  };

  onChangeDetail = event => {
    this.setState({ editDetail: event.target.value });
  };

  renderEditDetail = () => {
    return (
      <div>
        <input
          type="text"
          value={this.state.editDetail}
          onChange={this.onChangeDetail}
        />
        <button onClick={this.confirmEdit}>Confirm</button>
      </div>
    );
  };

  renderProjectDetail = () => {
    return (
      <div>
        {this.state.isEdit ? (
          this.renderEditDetail()
        ) : (
          <div>{this.props.focusProject.detail}</div>
        )}
        <button onClick={this.showEditDialog}>Edit</button>
      </div>
    );
  };

  render() {
    let { name } = this.props.focusProject;

    return (
      <div>
        <h5>Project Name </h5>
        <div> {name} </div>
        <h5>Project Detail </h5>
        {this.renderProjectDetail()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { focusProject: state.projects.focusProject };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ editProject }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetail);
