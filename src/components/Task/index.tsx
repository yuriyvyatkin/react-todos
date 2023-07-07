import { TaskItem } from '../Tasks';
import Checkbox from './Checkbox';
import CloseButton from './CloseButton';
import Label from './Label';

interface TaskProps extends TaskItem {
  checkboxChangeHandler: (id: number) => void;
  taskDeletionHandler: (id: number) => void;
  checkboxTestId: string;
  labelTestId: string;
}

function Task({
  id,
  name,
  completed,
  checkboxChangeHandler,
  taskDeletionHandler,
  checkboxTestId,
  labelTestId,
}: TaskProps) {
  return (
    <div className={`todos__task d-flex mb-3 px-1 ${completed && 'completed'}`}>
      <div className="task__wrapper form-check">
        <Checkbox
          id={id}
          completed={completed}
          checkboxChangeHandler={checkboxChangeHandler}
          checkboxTestId={checkboxTestId}
        />
        <Label
          id={id}
          name={name}
          completed={completed}
          labelTestId={labelTestId}
        />
      </div>
      <CloseButton id={id} taskDeletionHandler={taskDeletionHandler} />
    </div>
  );
}

export default Task;
