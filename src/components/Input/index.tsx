import { RefObject } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import './Input.css';
import ResetButton from './ResetButton';

interface InputProps {
  value: string;
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
  inputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputResetHandler: () => void;
  placeholder: string;
  inputRef: RefObject<HTMLInputElement>;
  testId: string;
}

function Input({
  value,
  submitHandler: handleSubmit,
  inputChangeHandler: handleInputChange,
  inputResetHandler,
  placeholder,
  inputRef,
  testId,
}: InputProps) {
  return (
    <Form className="input-wrapper" onSubmit={(e) => handleSubmit(e)}>
      <FormControl
        className="input pe-5"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
        }
        autoFocus
        ref={inputRef}
        data-testid={testId}
      />
      <ResetButton
        visible={Boolean(value.length)}
        inputResetHandler={inputResetHandler}
      />
    </Form>
  );
}

export default Input;
