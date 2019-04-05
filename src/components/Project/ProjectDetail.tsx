import React, { Component } from 'react';
import Project from '../../models/Project';
import { connect } from 'react-redux';
import { editProject } from '../../actions';
import { bindActionCreators } from 'redux';
import EditType from '../../constant/editType';

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
    this.state = { editDetail: '', isEdit: false, isEditDone: false };
  }

  showEditDialog = () => {
    this.setState({
      editDetail: this.props.projects.focusProject.detail,
      isEdit: true
    });
  };

  confirmEdit = () => {
    this.setState({ editDetail: '', isEdit: false });
    this.props.editProject(
      this.props.projects.focusProject._id,
      EditType.DETAIL,
      this.state.editDetail
    );
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
          <div>{this.props.projects.focusProject.detail}</div>
        )}
        <button onClick={this.showEditDialog}>Edit</button>
      </div>
    );
  };

  render() {
    let { name } = this.props.projects.focusProject;

    return (
      <div>
        <div>
          {this.props.projects.isLoading ? <div>Loading</div> : <div />}
        </div>
        ;<h5>Project Name </h5>
        <div> {name} </div>
        <h5>Project Detail </h5>
        {this.renderProjectDetail()}
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
