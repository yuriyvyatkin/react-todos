import { memo } from 'react';
import { TaskItem } from '../Tasks';
import './Label.css';

interface LabelProps extends TaskItem {
  labelTestId: string;
}

function Label({ id, name, completed, labelTestId }: LabelProps) {
  return (
    <label
      className={`task__label text-start position-relative ${
        completed && 'text-decoration-line-through text-secondary'
      }`}
      htmlFor={`task-checkbox-${id}`}
      data-testid={labelTestId}
    >
      {name}
    </label>
  );
}

export default memo(Label);
