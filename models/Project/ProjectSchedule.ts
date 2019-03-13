class ProjectSchedule {
  startDate: Date;
  endDate: Date;

  sprints: Date[];

  constructor(startDate: Date, endDate: Date) {
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

export default ProjectSchedule;
