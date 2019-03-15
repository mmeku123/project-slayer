import React, { Component } from 'react';

interface IProjectDetailProps {
  name: String;
  detail: String;
}

class ProjectDetail extends Component<IProjectDetailProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let name = this.props.name;
    let detail = this.props.detail;

    return (
      <div>
        <h5>Project Name </h5>
        <div> {name} </div>
        <h5>Project Detail </h5> <div>{detail}</div>
      </div>
    );
  }
}

export default ProjectDetail;
