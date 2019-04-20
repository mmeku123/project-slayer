import React, { Component } from 'react';
import Subject from '../../models/Subject';
import SubjectCard from './SubjectCard';
import { Row, Col, Typography, Button, Input, Spin, Icon } from 'antd';

const { Title } = Typography;

interface ISubjectListProps {
  subjects: Subject[];
  isChooseSubject: boolean;
  chooseSubject: Subject;
  isLoading: boolean;
  onChangeSubject: (subject: Subject) => void;
  onCreateSubject: (subject: Subject) => void;
}

interface ISubjectSectionStates {
  isAddNewSubject: boolean;
  newSubject: Subject;
}

class SubjectSection extends Component<
  ISubjectListProps,
  ISubjectSectionStates
> {
  constructor(props: ISubjectListProps) {
    super(props);
    this.state = {
      isAddNewSubject: false,
      newSubject: {
        _id: '',
        id: '',
        detail: '',
        img: '',
        name: '',
        projectIds: [],
        studentIds: []
      }
    };
  }

  handleChangeSubject = (subject: Subject) => {
    this.props.onChangeSubject(subject);
  };

  showNewSubjectInput = () => {
    this.setState(state => ({ isAddNewSubject: true }));
  };

  createNewSubject = () => {
    this.props.onCreateSubject(this.state.newSubject);
    this.setState(state => ({ ...state, isAddNewSubject: false }));
  };

  inputChange = event => {
    const target = event.target;
    switch (target.name) {
      case 'id':
        this.setState(state => ({
          ...state,
          newSubject: { ...state.newSubject, id: target.value }
        }));
        break;
      case 'name':
        this.setState(state => ({
          ...state,
          newSubject: { ...state.newSubject, name: target.value }
        }));
        break;
      case 'detail':
        this.setState(state => ({
          ...state,
          newSubject: { ...state.newSubject, detail: target.value }
        }));
        break;
    }
  };

  renderInputNewSubject = () => {
    return this.state.isAddNewSubject ? (
      <Col lg={8} md={10} sm={12} xs={24}>
        <div>
          <Input name="id" placeholder="ID" onChange={this.inputChange} />
          <Input
            name="name"
            placeholder="New subject name"
            onChange={this.inputChange}
          />
          <Input
            name="detail"
            placeholder="Detail"
            onChange={this.inputChange}
          />
          <Row type="flex" justify="end">
            <Col>
              <Button
                onClick={() => {
                  this.setState({ isAddNewSubject: false });
                }}
              >
                Cancel
              </Button>
            </Col>
            <Button onClick={this.createNewSubject}>Add</Button>
            <Col />
          </Row>
        </div>
      </Col>
    ) : (
      <div />
    );
  };

  renderLoadingIndicator = () => {
    return this.props.isLoading ? (
      <Row type="flex" align="middle" justify="center">
        <Spin indicator={<Icon type="loading" />} />
      </Row>
    ) : (
      <div />
    );
  };

  render() {
    return (
      <div>
        <Row style={{ minHeight: '300px' }} type="flex" align="middle">
          <Col md={12} xs={24}>
            <div style={{ textAlign: 'center' }}>
              Your subject is:{' '}
              <Title>
                {this.props.isChooseSubject
                  ? this.props.chooseSubject.name
                  : 'Choose one'}
              </Title>
            </div>
          </Col>

          <Col md={12} xs={24}>
            <Row type="flex" align="middle">
              {this.props.subjects && this.props.subjects != [] ? (
                this.props.subjects.map(subject => {
                  return (
                    <Col
                      lg={8}
                      md={10}
                      sm={12}
                      xs={24}
                      key={'col' + subject._id}
                    >
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

              <Col lg={8} md={10} sm={12} xs={24}>
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
        {this.renderLoadingIndicator()}
      </div>
    );
  }
}

export default SubjectSection;
