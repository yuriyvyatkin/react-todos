import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

const createTask = (taskName: string) => {
  const input = screen.queryByTestId('input') as HTMLInputElement;

  if (input && input.form) {
    fireEvent.change(input, { target: { value: taskName } });
    fireEvent.submit(input.form);

    return true;
  }

  return false;
};

const markLastCheckbox = () => {
  const taskCheckboxes = screen.queryAllByTestId('task-checkbox');

  if (taskCheckboxes.length) {
    const lastTaskCheckbox = taskCheckboxes[taskCheckboxes.length - 1];

    fireEvent.click(lastTaskCheckbox);

    return true;
  }

  return false;
};

const testTaskName = 'Новая задача';

test('добавляет задачу по нажатию клавиши Enter', () => {
  render(<App />);
  expect(createTask(testTaskName)).toBe(true);

  const addedTask = screen.getByText(testTaskName);

  expect(addedTask).toBeInTheDocument();
});

test('помечает задачу как выполненную при отметке чек-бокса', () => {
  render(<App />);
  expect(createTask(testTaskName)).toBe(true);
  expect(markLastCheckbox()).toBe(true);

  const taskLabel = screen.queryByText(testTaskName);

  expect(taskLabel).toHaveClass('text-decoration-line-through');
  expect(taskLabel).toHaveClass('text-secondary');
});

test('фильтрует задачи по спискам "Все", "Активные" и "Завершённые"', () => {
  render(<App />);
  expect(createTask(testTaskName)).toBe(true);
  expect(createTask(testTaskName)).toBe(true);
  expect(markLastCheckbox()).toBe(true);

  const activeTodosButton = screen.queryByTestId('active');
  if (activeTodosButton) {
    fireEvent.click(activeTodosButton);
  }
  const activeTasks = screen.queryAllByText(testTaskName);

  expect(activeTasks.length).toBe(1);

  const completedTodosButton = screen.queryByTestId('completed');
  if (completedTodosButton) {
    fireEvent.click(completedTodosButton);
  }
  const completedTasks = screen.queryAllByText(testTaskName);

  expect(completedTasks.length).toBe(1);

  const allTodosButton = screen.queryByTestId('all');
  if (allTodosButton) {
    fireEvent.click(allTodosButton);
  }
  const allTasks = screen.queryAllByText(testTaskName);

  expect(allTasks.length).toBe(2);
});

test('очищает выполненные задачи по нажатию кнопки "Удалить завершённые"', () => {
  render(<App />);
  expect(createTask(testTaskName)).toBe(true);
  expect(markLastCheckbox()).toBe(true);

  const clearButton = screen.queryByTestId('clear-button');
  if (clearButton) {
    fireEvent.click(clearButton);
  }
  const completedTask = screen.queryByText(testTaskName);

  expect(completedTask).toBeNull();
});
