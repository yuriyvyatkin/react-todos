import './Checkbox.css';

interface CheckboxProps {
  id: number;
  completed: boolean;
  checkboxChangeHandler: (id: number) => void;
  checkboxTestId: string;
}

function Checkbox({
  id,
  completed,
  checkboxChangeHandler: handleCheckboxChange,
  checkboxTestId
}: CheckboxProps) {
  return (
    <input
      id={`task-checkbox-${id}`}
      className="task__checkbox form-check-input"
      type="checkbox"
      checked={completed}
      onChange={() => handleCheckboxChange(id)}
      data-testid={checkboxTestId}
    />
  );
}

export default Checkbox;
