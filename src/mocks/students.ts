import Student from '../models/User/Student';
import { tasks } from './tasks';

let student = new Student(
  '590610644',
  'Patsakorn Towatrakool',
  'tusaveinwza@gmail.com',
  '123-456',
  'developer',
  'tusave'
);

student.tasks = [tasks[1]];

let student2 = new Student(
  '590610621',
  'Thanatat Voraveeravong',
  'fameoki@gmail.com',
  '123-456',
  'general assistant',
  'fame'
);

student2.tasks = [tasks[0]];

let _studentId = 0;
student._id = _studentId++;
student2._id = _studentId++;

export { student, student2, _studentId };
