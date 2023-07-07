import Slug from './Slug';
import Task from './Task';

export interface TaskItem {
  id: number;
  name: string;
  completed: boolean;
}

interface TasksProps {
  tasks: TaskItem[];
  activeTab: string;
  checkboxChangeHandler: (id: number) => void;
  taskDeleteHandler: (id: number) => void;
}

function Tasks({
  tasks,
  activeTab,
  checkboxChangeHandler,
  taskDeleteHandler,
}: TasksProps) {
  let filteredTasks = tasks;

  if (activeTab === 'active') {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else if (activeTab === 'completed') {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  if (filteredTasks.length === 0) {
    return <Slug />;
  }

  const result = filteredTasks.map(({ id, name, completed }) => (
    <Task
      id={id}
      name={name}
      completed={completed}
      checkboxChangeHandler={checkboxChangeHandler}
      taskDeleteHandler={taskDeleteHandler}
    />
  ));

  return <>{result}</>;
}

export default Tasks;
