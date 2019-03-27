import React, { Component } from 'react';
import { ProjectProgress } from '../../models/Project';
import { EditType } from '../../constant/editType';

interface IProjectPercentProps {
  progress: ProjectProgress;
}

class ProjectPercent extends Component<IProjectPercentProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let progress = this.props.progress;

    if (progress) {
      return (
        <div>
          <h5>Project Progress</h5>
          {progress ? <div> Progress </div> : <div />}
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default ProjectPercent;
