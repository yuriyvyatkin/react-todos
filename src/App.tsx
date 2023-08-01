import React, { useRef, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './App.css';
import './assets/normalize.css';
import ClearButton from './components/ClearButton';
import Counter from './components/Counter';
import Input from './components/Input';
import NavBar from './components/NavBar';
import Tasks from './components/Tasks';
import useTaskManager from './hooks/useTaskManager';

function App() {
  const {
    tasks,
    activeTasksCount,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    clearCompletedTasks,
  } = useTaskManager();

  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const tasksRef = useRef<HTMLDivElement>(null);

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
    addTask(inputValue);
    setInputValue('');

    setTimeout(() => {
      if (tasksRef.current) {
        tasksRef.current.scrollTop = tasksRef.current.scrollHeight;
      }
    }, 10);
  };

  const handleNavItemClick = (tab: 'all' | 'active' | 'completed') => {
    setActiveTab(tab);
  };

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
                  checkboxChangeHandler={toggleTaskCompletion}
                  taskDeletionHandler={deleteTask}
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
