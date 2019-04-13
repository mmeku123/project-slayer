import React, { Component } from 'react';
import Subject from '../../models/Subject';
import SubjectCard from './SubjectCard';
import { Row, Col, Typography, Button } from 'antd';

const { Title } = Typography;

interface ISubjectListProps {
  subjects: Subject[];
  isChooseSubject: boolean;
  chooseSubject: Subject;
  onChangeSubject: (subject: Subject) => void;
  onCreateSubject: (subjectName: string) => void;
}

interface ISubjectListStates {
  isAddNewSubject: boolean;
  newSubjectName: string;
}

class SubjectList extends Component<ISubjectListProps, ISubjectListStates> {
  constructor(props: ISubjectListProps) {
    super(props);
    this.state = { isAddNewSubject: false, newSubjectName: '' };
  }

  handleChangeSubject = (subject: Subject) => {
    console.log(subject);
    this.props.onChangeSubject(subject);
  };

  showNewSubjectInput = () => {
    this.setState({ isAddNewSubject: true });
  };

  createNewSubject = () => {
    this.props.onCreateSubject(this.state.newSubjectName);
    this.setState({ isAddNewSubject: false });
  };

  inputChange = event => {
    this.setState({ newSubjectName: event.target.value });
  };

  renderInputNewSubject = () => {
    return this.state.isAddNewSubject ? (
      <div>
        <input placeholder="New Subject" onChange={this.inputChange} />
        <Button onClick={this.createNewSubject}>+</Button>
      </div>
    ) : (
      <div />
    );
  };

  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          Your subject is:{' '}
          <Title>
            {this.props.isChooseSubject
              ? this.props.chooseSubject.name
              : 'Choose one'}
          </Title>
        </div>

        <Row>
          {this.props.subjects && this.props.subjects != [] ? (
            this.props.subjects.map(subject => {
              return (
                <Col span={6}>
                  <div onClick={() => this.handleChangeSubject(subject)}>
                    <SubjectCard subject={subject} key={subject._id} />
                  </div>
                </Col>
              );
            })
          ) : (
            <div />
          )}

          <Col>
            <Col span={6}>
              <div onClick={this.showNewSubjectInput}>
                <SubjectCard key={'new_subject'} />
              </div>
            </Col>
            {this.renderInputNewSubject()}
          </Col>
        </Row>
      </div>
    );
  }
}

export default SubjectList;
