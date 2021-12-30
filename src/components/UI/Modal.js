const Modal = ({ children, onClose }) => {
  return (
    <div className="modal">
      <div className="modalContent">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modalBody">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
