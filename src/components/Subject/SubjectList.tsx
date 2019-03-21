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
        <input
          className="form-control"
          placeholder="New Subject"
          onChange={this.inputChange}
        />
        <button className="btn btn-info" onClick={this.createNewSubject}>
          +
        </button>
      </div>
    ) : (
      <div />
    );
  };

  render() {
    return (
      <div>
        <section id="subjects" className="section-bg">
          <div className="container">
            <header className="section-header">
              <div style={{ height: '100px' }} />
              <h3>Project Management</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                excep
              </p>
              <h4>Choose your subject</h4>
              <br />
            </header>

            <div className="row">
              {this.props.subjects.map(subject => {
                return (
                  <div
                    onClick={event => this.handleChangeSubject(event, subject)}
                    key={subject.id}
                    className="col-md-6 col-lg-4 wow bounceInUp"
                    data-wow-duration="1.4s"
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="box">
                      <div className="icon" style={{ background: '#fceef3' }}>
                        <i
                          className="ion-ios-paper-outline"
                          style={{ color: '#ff689b' }}
                        />
                      </div>
                      <h4 className="title">
                        <a href="">{subject.name}</a>
                      </h4>
                      <p className="description">{subject.owner}</p>
                    </div>
                  </div>
                );
              })}
              <div
                onClick={this.showNewSubjectInput}
                className="col-md-6 col-lg-4 wow bounceInUp"
                data-wow-duration="1.4s"
                style={{ cursor: 'pointer' }}
              >
                <div className="box">
                  <div className="icon" style={{ background: 'white' }}>
                    <i className="ion-ios-plus" style={{ color: '#ff689b' }} />
                  </div>
                  <h4 className="title">
                    <a href="">New Subject</a>
                  </h4>
                </div>
                {this.renderInputNewSubject()}
              </div>
            </div>
            <h3>
              Your subject is <strong> {this.props.chooseSubject.name} </strong>
            </h3>
          </div>
        </section>
      </div>
    );
  }
}

export default SubjectList;
