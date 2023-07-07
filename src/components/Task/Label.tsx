interface LabelProps {
  id: number;
  name: string;
  completed: boolean;
}

function Label({ id, name, completed }: LabelProps) {
  return (
    <label
      className={`task__label text-start position-relative ${
        completed && 'text-decoration-line-through text-secondary'
      }`}
      htmlFor={`task-checkbox-${id}`}
      data-testid="task-label"
    >
      {name}
    </label>
  );
}

export default Label;
