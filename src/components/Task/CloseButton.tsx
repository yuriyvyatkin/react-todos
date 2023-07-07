import { CloseButton as BootstrapCloseButton } from 'react-bootstrap';

interface CloseButtonProps {
  id: number;
  taskDeleteHandler: (id: number) => void;
}

function CloseButton({
  id,
  taskDeleteHandler: handleTaskDelete,
}: CloseButtonProps) {
  return (
    <div className="close-button-wrapper ms-auto d-inline-block position-relative">
      <BootstrapCloseButton
        className="close-button position-absolute"
        onClick={() => handleTaskDelete(id)}
      />
    </div>
  );
}

export default CloseButton;
