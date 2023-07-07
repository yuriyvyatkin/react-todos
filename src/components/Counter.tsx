import getNoun from '../utils/getNoun';

interface CounterProps {
  activeTasksCount: number;
}

function Counter({ activeTasksCount }: CounterProps) {
  return (
    <div
      className={`counter mt-2 ${activeTasksCount === 0 && 'visually-hidden'}`}
    >
      {`${getNoun(
        activeTasksCount,
        'осталась',
        'осталось',
        'осталось',
      )} ${activeTasksCount} ${getNoun(
        activeTasksCount,
        'задача',
        'задачи',
        'задач',
      )}`}
    </div>
  );
}

export default Counter;
