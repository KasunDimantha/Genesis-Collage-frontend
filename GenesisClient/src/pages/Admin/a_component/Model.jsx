import React from 'react';

const Modal = (imageUrl) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <img src={imageUrl} alt="Profile" />
      </div>
    </div>
  );
};

export default Modal;