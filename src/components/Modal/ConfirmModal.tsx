import { Button, ModalContent, ModalWrapper } from '../styled/styled';

const ConfirmModal = ({ isOpen, onClose, onSubmit }: any) => {

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent>
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
          <Button style={{ padding: "15px", marginRight: "5px", flexGrow: "1", background: "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.065) 100%)" }} onClick={handleCancel}>CANCEL</Button>
          <Button style={{ flexGrow: "1", background: "#02B1AA" }} onClick={handleSubmit}>CONFIRM</Button>
        </div>
      </ModalContent>
    </ModalWrapper>
  );
};

export default ConfirmModal;