import React, { Component } from 'react';
import Subject from '../../models/Subject';

import subjects from '../../mocks/subjects';

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

  handleChangeSubject = (event, subject: Subject) => {
    console.log(event);
    this.props.onChangeSubject(subject);
  };

  showNewSubjectPopUp = () => {
    this.setState({ isAddNewSubject: true });
  };

  createNewSubject = () => {
    this.props.onCreateSubject(this.state.newSubjectName);
  };

  inputChange = event => {
    this.setState({ newSubjectName: event.target.value });
  };

  renderInputNewSubject = () => {
    return this.state.isAddNewSubject ? (
      <div>
        <input placeholder="New Subject" onChange={this.inputChange} />
        <button onClick={this.createNewSubject}>+</button>
      </div>
    ) : (
      <div />
    );
  };

  render() {
    return (
      <div>
        <div>Your subject is: {this.props.chooseSubject.name}</div>
        {this.props.subjects.map(subject => {
          return (
            <button
              onClick={event => this.handleChangeSubject(event, subject)}
              key={subject.id}
            >
              {subject.name}
            </button>
          );
        })}
        <div>
          <button onClick={this.showNewSubjectPopUp}>New Subject</button>
          {this.renderInputNewSubject()}
        </div>
      </div>
    );
  }
}

export default SubjectList;
