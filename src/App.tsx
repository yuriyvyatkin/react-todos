import React, { useEffect, useRef, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './App.css';
import './assets/normalize.css';
import ClearButton from './components/ClearButton';
import Counter from './components/Counter';
import Input from './components/Input';
import NavBar from './components/NavBar';
import Tasks, { TaskItem as Task } from './components/Tasks';

const defaultTasks: Task[] = [
  { id: 1, name: '📅 Запланировать встречу', completed: false },
  { id: 2, name: '🧹 Убраться дома', completed: false },
  { id: 3, name: '🎯 Разработать план', completed: false },
];

const storedTasksJSON = localStorage.getItem('tasks');
let storedTasks: Task[] | null = null;

if (storedTasksJSON !== null) {
  storedTasks = JSON.parse(storedTasksJSON);
} else {
  localStorage.setItem('tasks', JSON.stringify(defaultTasks));
  storedTasks = defaultTasks;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(storedTasks || []);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>(
    'all',
  );
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const tasksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputReset = () => {
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setInputValue(inputValue.trim());

    if (inputValue.length === 0) {
      return;
    }

    let lastId = 0;

    if (tasks.length) {
      lastId = tasks[tasks.length - 1].id;
    }

    const newId = lastId + 1;

    const newTask: Task = {
      id: newId,
      name: inputValue,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInputValue('');

    setTimeout(() => {
      if (tasksRef.current) {
        tasksRef.current.scrollTop = tasksRef.current.scrollHeight;
      }
    }, 10);
  };

  const handleTaskDeletion = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(updatedTasks);
  };

  const handleCheckboxChange = (taskId: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const handleNavItemClick = (tab: 'all' | 'active' | 'completed') => {
    setActiveTab(tab);
  };

  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);

    setTasks(updatedTasks);
  };

  const activeTasksCount = tasks.filter((task) => !task.completed).length;

  return (
    <div className="App">
      <Container className="todos">
        <Row>
          <Col md={12}>
            <Card className="shadow" bg="light" text="dark">
              <Card.Body>
                <Input
                  value={inputValue}
                  submitHandler={handleSubmit}
                  inputChangeHandler={handleInputChange}
                  inputResetHandler={handleInputReset}
                  placeholder="Новая задача..."
                  inputRef={inputRef}
                  testId="input"
                />
                <NavBar
                  activeTab={activeTab}
                  data={[
                    { name: 'all', content: 'Все' },
                    { name: 'active', content: 'Активные' },
                    { name: 'completed', content: 'Завершённые' },
                  ]}
                  navItemClickHandler={handleNavItemClick}
                />
                <Tasks
                  tasks={tasks}
                  activeTab={activeTab}
                  checkboxChangeHandler={handleCheckboxChange}
                  taskDeletionHandler={handleTaskDeletion}
                  tasksRef={tasksRef}
                  checkboxTestId="task-checkbox"
                  labelTestId="task-label"
                />
                <Counter activeTasksCount={activeTasksCount} />
                <ClearButton
                  clickHandler={clearCompletedTasks}
                  disabled={activeTasksCount === tasks.length}
                  testId="clear-button"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
