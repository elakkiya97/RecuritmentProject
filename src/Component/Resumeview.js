// ResumeModal.js

import React from 'react';

const ResumeModal = ({ isOpen, onClose, resumeFilePath }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
        <iframe src={resumeFilePath} title="Resume" width="100%" height="100%"></iframe>
      </div>
    </div>
  );
};

export default ResumeModal;
