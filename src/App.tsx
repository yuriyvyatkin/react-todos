import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormControl,
  CloseButton,
  Nav,
} from 'react-bootstrap';
import getNoun from "./utils/getNoun";
import Slug from "./components/Slug";
import './App.css';

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

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
  const todoListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setInputValue(inputValue.trim());

    if (inputValue.length === 0) {
      return;
    }

    const newTask: Task = {
      id: tasks.length + 1,
      name: inputValue,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInputValue('');

    setTimeout(() => {
      if (todoListRef.current) {
        todoListRef.current.scrollTop = todoListRef.current.scrollHeight;
      }
    }, 10);
  };

  const handleTaskDelete = (taskId: number) => {
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

  const renderTasks = () => {
    let filteredTasks: Task[] = tasks;

    if (activeTab === 'active') {
      filteredTasks = tasks.filter((task) => !task.completed);
    } else if (activeTab === 'completed') {
      filteredTasks = tasks.filter((task) => task.completed);
    }

    if (filteredTasks.length === 0) {
      return <Slug />;
    }

    return filteredTasks.map((task) => (
      <div
        className={`todo-item d-flex mb-3 px-1 ${
          task.completed ? 'completed' : ''
        }`}
        key={task.id}
      >
        <div className="form-check">
          <input
            id={`task-checkbox-${task.id}`}
            className="form-check-input"
            type="checkbox"
            checked={task.completed}
            onChange={() => handleCheckboxChange(task.id)}
          />
          <label
            className={`form-check-label text-start position-relative ${
              task.completed
                ? 'text-decoration-line-through text-secondary'
                : ''
            }`}
            htmlFor={`task-checkbox-${task.id}`}
            style={{ bottom: '2.5px', overflowWrap: 'anywhere', paddingRight: '25px' }}
          >
            {task.name}
          </label>
        </div>
        <div className="ms-auto d-inline-block position-relative">
          <CloseButton
            className="close-button position-absolute"
            style={{ top: '0px', right: '5px', width: '5px' }}
            onClick={() => handleTaskDelete(task.id)}
          />
        </div>
      </div>
    ));
  };

  const activeTaskCount = tasks.filter((task) => !task.completed).length;

  return (
    <div className="App">
      <Container style={{ maxWidth: '500px' }}>
        <Row>
          <Col md={12}>
            <Card bg="light" text="dark">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <FormControl
                    className="form-control add-task"
                    type="text"
                    placeholder="Новая задача..."
                    value={inputValue}
                    onChange={handleInputChange}
                    autoFocus
                  />
                </Form>
                <Nav
                  className="todo-nav mt-4 d-flex justify-content-center"
                  variant="pills"
                >
                  <Nav.Item>
                    <Nav.Link
                      href="#"
                      active={activeTab === 'all'}
                      onClick={() => handleNavItemClick('all')}
                    >
                      Все
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      href="#"
                      active={activeTab === 'active'}
                      onClick={() => handleNavItemClick('active')}
                    >
                      Активные
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      href="#"
                      active={activeTab === 'completed'}
                      onClick={() => handleNavItemClick('completed')}
                    >
                      Завершённые
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <div
                  className="todo-list mt-4 px-1"
                  style={{ maxHeight: '300px', overflowY: 'auto' }}
                  ref={todoListRef}
                >
                  {renderTasks()}
                </div>
                <div className="task-count mt-2">
                  {`${activeTaskCount} ${getNoun(activeTaskCount, 'задача', 'задачи', 'задач')} ${getNoun(activeTaskCount, 'осталась', 'остались', 'осталось')}`}
                </div>
                <button
                  className="clear-button"
                  type="button"
                  onClick={clearCompletedTasks}
                  disabled={activeTaskCount === tasks.length}
                >
                  Удалить завершённые
                </button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
