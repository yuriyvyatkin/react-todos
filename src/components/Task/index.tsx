import Checkbox from './Checkbox';
import Label from './Label';
import CloseButton from './CloseButton';

interface TaskProps {
  id: number;
  name: string;
  completed: boolean;
  checkboxChangeHandler: (id: number) => void;
  taskDeleteHandler: (id: number) => void;
}

function Task({
  id,
  name,
  completed,
  checkboxChangeHandler,
  taskDeleteHandler,
}: TaskProps) {
  return (
    <div className={`todos__task d-flex mb-3 px-1 ${completed && 'completed'}`}>
      <div className="task__wrapper form-check">
        <Checkbox
          id={id}
          completed={completed}
          checkboxChangeHandler={checkboxChangeHandler}
        />
        <Label id={id} name={name} completed={completed} />
      </div>
      <CloseButton id={id} taskDeleteHandler={taskDeleteHandler} />
    </div>
  );
}

export default Task;
