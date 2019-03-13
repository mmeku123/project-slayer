import Task from '../Task';

class Student {
  id: string;
  name: string;
  nickname: string;
  email: string;
  phone: string;

  tasks: Task[];
}

export default Student;
