import React, { Component } from 'react';
import Subject from '../../models/Subject';

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
        <button onClick={this.createNewSubject}>+</button>
      </div>
    ) : (
      <div />
    );
  };

  render() {
    return (
      <div>
        <div>
          Your subject is:{' '}
          {this.props.isChooseSubject
            ? this.props.chooseSubject.name
            : 'Choose one'}
        </div>

        {this.props.subjects && this.props.subjects != [] ? (
          this.props.subjects.map(subject => {
            return (
              <button
                onClick={event => this.handleChangeSubject(event, subject)}
                key={subject._id}
              >
                {subject.name}
              </button>
            );
          })
        ) : (
          <div />
        )}

        <div>
          <button onClick={this.showNewSubjectInput}>New Subject</button>
          {this.renderInputNewSubject()}
        </div>
      </div>
    );
  }
}

export default SubjectList;
