import { RefObject } from 'react';
import Slug from './Slug';
import Task from './Task';
import './Tasks.css';

export interface TaskItem {
  id: number;
  name: string;
  completed: boolean;
}

interface TasksProps {
  tasks: TaskItem[];
  activeTab: string;
  checkboxChangeHandler: (id: number) => void;
  taskDeletionHandler: (id: number) => void;
  tasksRef: RefObject<HTMLDivElement>;
  checkboxTestId: string;
  labelTestId: string;
}

function Tasks({
  tasks,
  activeTab,
  checkboxChangeHandler,
  taskDeletionHandler,
  tasksRef,
  checkboxTestId,
  labelTestId,
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

  const items = filteredTasks.map(({ id, name, completed }) => (
    <Task
      key={id}
      id={id}
      name={name}
      completed={completed}
      checkboxChangeHandler={checkboxChangeHandler}
      taskDeletionHandler={taskDeletionHandler}
      checkboxTestId={checkboxTestId}
      labelTestId={labelTestId}
    />
  ));

  return (
    <div className="tasks mt-4 px-1" ref={tasksRef}>
      {items}
    </div>
  );
}

export default Tasks;
