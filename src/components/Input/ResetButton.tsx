import { CloseButton } from 'react-bootstrap';

interface ResetButtonProps {
  visible: boolean;
  inputResetHandler: () => void;
}

function ResetButton({
  visible,
  inputResetHandler: handleInputReset,
}: ResetButtonProps) {
  return (
    <CloseButton
      className={`input-clear-button position-absolute ${
        visible ? 'd-block' : 'd-none'
      }`}
      onClick={handleInputReset}
    />
  );
}

export default ResetButton;
