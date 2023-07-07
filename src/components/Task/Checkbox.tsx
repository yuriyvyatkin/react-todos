interface CheckboxProps {
  id: number;
  completed: boolean;
  checkboxChangeHandler: (id: number) => void;
}

function Checkbox({
  id,
  completed,
  checkboxChangeHandler: handleCheckboxChange,
}: CheckboxProps) {
  return (
    <input
      id={`task-checkbox-${id}`}
      className="task__checkbox form-check-input"
      type="checkbox"
      checked={completed}
      onChange={() => handleCheckboxChange(id)}
      data-testid="task-checkbox"
    />
  );
}

export default Checkbox;
