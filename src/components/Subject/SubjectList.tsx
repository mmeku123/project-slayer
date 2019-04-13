import React, { Component } from 'react';
import Subject from '../../models/Subject';
import SubjectCard from './SubjectCard';
import { Row, Col, Typography, Button, Input } from 'antd';

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
      <Col md={6}>
        <div>
          <Input placeholder="New Subject" onChange={this.inputChange} />
          <Button onClick={this.createNewSubject}>+</Button>
        </div>
      </Col>
    ) : (
      <div />
    );
  };

  render() {
    return (
      <div>
        <Row type="flex" align="middle">
          <Col md={12}>
            <div style={{ textAlign: 'center' }}>
              Your subject is:{' '}
              <Title>
                {this.props.isChooseSubject
                  ? this.props.chooseSubject.name
                  : 'Choose one'}
              </Title>
            </div>
          </Col>

          <Col md={12}>
            <Row type="flex" align="middle">
              {this.props.subjects && this.props.subjects != [] ? (
                this.props.subjects.map(subject => {
                  return (
                    <Col md={8}>
                      <div
                        style={{ padding: '10px' }}
                        onClick={() => this.handleChangeSubject(subject)}
                      >
                        <SubjectCard subject={subject} key={subject._id} />
                      </div>
                    </Col>
                  );
                })
              ) : (
                <div />
              )}

              <Col md={8}>
                <div
                  style={{ padding: '10px' }}
                  onClick={this.showNewSubjectInput}
                >
                  <SubjectCard key={'new_subject'} />
                </div>
              </Col>
              {this.renderInputNewSubject()}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SubjectList;
