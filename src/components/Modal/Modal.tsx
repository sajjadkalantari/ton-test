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

          <Input style={{ color: "white", padding: "20px 12px" ,borderTop: "1px solid", marginTop: "20px", background: "#FFFFFF14", borderRadius: "8px", borderImageSource: "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.017) 100%)" }} placeholder='ENTER LINK ...' type="text" value={inputValue} onChange={handleInputChange} />
        </label>
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
          <Button style={{ padding: "15px", marginRight: "5px", flexGrow: "1", background: "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.065) 100%)" }} onClick={handleCancel}>CANCEL</Button>
          <Button style={{ flexGrow: "1", background: "#02B1AA" }} onClick={handleSubmit}>SUBMIT</Button>
        </div>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;