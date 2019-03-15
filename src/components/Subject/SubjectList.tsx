import React, { Component } from 'react';
import Subject from '../../models/Subject';

import subjects from '../../mocks/subjects';

interface ISubjectListProps {
  subjects: Subject[];
  isChooseSubject: boolean;
  chooseSubject: Subject;
  onChangeSubject: (subject: Subject) => void;
}

interface ISubjectListStates {}

class SubjectList extends Component<ISubjectListProps, ISubjectListStates> {
  constructor(props: ISubjectListProps) {
    super(props);
  }

  handleChangeSubject = (event, subject: Subject) => {
    console.log(event);
    this.props.onChangeSubject(subject);
  };

  render() {
    return (
      <div>
        Your subject is: {this.props.chooseSubject.name}
        <br />
        {this.props.subjects.map(subject => {
          return (
            <button onClick={event => this.handleChangeSubject(event, subject)}>
              {subject.name}
            </button>
          );
        })}
        ;
      </div>
    );
  }
}

export default SubjectList;
