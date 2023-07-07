import { CloseButton as BootstrapCloseButton } from 'react-bootstrap';
import './CloseButton.css';

interface CloseButtonProps {
  id: number;
  taskDeletionHandler: (id: number) => void;
}

function CloseButton({
  id,
  taskDeletionHandler: handleTaskDeletion,
}: CloseButtonProps) {
  return (
    <div className="close-button-wrapper ms-auto d-inline-block position-relative">
      <BootstrapCloseButton
        className="close-button position-absolute text-warning"
        onClick={() => handleTaskDeletion(id)}
        style={{color: 'red'}}
      />
    </div>
  );
}

export default CloseButton;
