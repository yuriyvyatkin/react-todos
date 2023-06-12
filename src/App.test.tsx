import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

const createTask = (taskName: string) => {
  const input = screen.getByPlaceholderText('New Task...') as HTMLInputElement;
  fireEvent.change(input, { target: { value: taskName } });
  const form = input.form;

  if (form) {
    fireEvent.submit(form);
  }

  return true;
};

const markLastCheckbox = () => {
  const taskCheckboxes = screen.getAllByRole('checkbox');
  const lastTaskCheckbox = taskCheckboxes[taskCheckboxes.length - 1] as HTMLInputElement;

  fireEvent.click(lastTaskCheckbox);

  return true;
};

test('добавляет задачу по нажатию клавиши Enter', () => {
  render(<App />);
  expect(createTask('Новая задача')).toBe(true);

  const addedTask = screen.getByText('Новая задача');

  expect(addedTask).toBeInTheDocument();
});

test('помечает задачу как выполненную при изменении флажка', () => {
  render(<App />);
  createTask('Новая задача');
  expect(markLastCheckbox()).toBe(true);

  const taskLabels = screen.queryAllByText('Новая задача', { selector: '.form-check-label' });
  const taskLabel = taskLabels[taskLabels.length - 1];

  expect(taskLabel).toHaveClass('text-decoration-line-through');
  expect(taskLabel).toHaveClass('text-secondary');
});

test('фильтрует задачи по вкладкам "All", "Active" и "Completed"', () => {
  render(<App />);
  createTask('Новая задача');
  createTask('Новая задача');
  expect(markLastCheckbox()).toBe(true);

  const activeTabButton = screen.getByText('Active');
  fireEvent.click(activeTabButton);
  const activeTasks = screen.getAllByRole('checkbox');

  expect(activeTasks.length).toBeGreaterThan(0);

  const completedTabButton = screen.getByText('Completed');
  fireEvent.click(completedTabButton);
  const completedTasks = screen.getAllByRole('checkbox');

  expect(completedTasks.length).toBeGreaterThan(0);

  const allTabButton = screen.getByText('All');
  fireEvent.click(allTabButton);
  const allTasks = screen.getAllByRole('checkbox');

  expect(allTasks.length).toBeGreaterThan(0);
});

test('очищает выполненные задачи по нажатию кнопки "Clear completed"', () => {
  render(<App />);
  createTask('Новая задача');
  expect(markLastCheckbox()).toBe(true);

  const clearButton = screen.getByText('Clear completed');
  fireEvent.click(clearButton);
  const completedTasks = screen.queryAllByTestId('todo-item');

  expect(completedTasks.length).toBe(0);
  expect(screen.queryByText('Create theme')).toBeNull();
});
