import React, { useState } from 'react';
import { Button, Input, ModalContent, ModalWrapper } from '../styled/styled';

const Modal = ({ isOpen, onClose, onSubmit }: any) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCancel = () => {
    setInputValue('');
    onClose();
  };

  const handleSubmit = () => {
    onSubmit(inputValue);
    setInputValue('');
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent>
        <label>
          Enter link:
          <Input style={{marginTop: "5px"}} type="text" value={inputValue} onChange={handleInputChange} />
        </label>
        <Button style={{marginTop: "5px", marginRight: "5px"}} onClick={handleCancel}>Cancel</Button>
        <Button style={{marginTop: "5px"}} onClick={handleSubmit}>Submit</Button>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;