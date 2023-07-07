import './ClearButton.css';

interface ClearButtonProps {
  clickHandler: () => void;
  disabled: boolean;
  testId: string;
}

function ClearButton({
  clickHandler: clearCompletedTasks,
  disabled,
  testId,
}: ClearButtonProps) {
  return (
    <button
      className="clear-button"
      type="button"
      onClick={clearCompletedTasks}
      disabled={disabled}
      data-testid={testId}
    >
      Удалить завершённые
    </button>
  );
}

export default ClearButton;
