import { useEffect, useState } from 'react';
import { TaskItem } from '@/components/Tasks';

const defaultTasks: TaskItem[] = [
  { id: 1, name: '📅 Запланировать встречу', completed: false },
  { id: 2, name: '🧹 Убраться дома', completed: false },
  { id: 3, name: '🎯 Разработать план', completed: false },
];

function useTaskManager() {
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const storedTasksJSON = localStorage.getItem('tasks');
    return storedTasksJSON !== null ? JSON.parse(storedTasksJSON) : defaultTasks;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (name: string) => {
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
      return;
    }

    setTasks((prevTasks) => {
      const lastId = prevTasks.length ? prevTasks[prevTasks.length - 1].id : 0;
      const newId = lastId + 1;

      const newTask: TaskItem = {
        id: newId,
        name: trimmedName,
        completed: false,
      };

      return [...prevTasks, newTask];
    });
  };

  const deleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearCompletedTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  const activeTasksCount = tasks.filter((task) => !task.completed).length;

  return {
    tasks,
    activeTasksCount,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    clearCompletedTasks,
  };
}

export default useTaskManager;
