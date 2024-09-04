import React from 'react';

const Dialog = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null; 

  return(
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h2>{title}</h2>
        <div>{children}</div>
        <div style={styles.buttons}>
          <button onClick={onConfirm} style={styles.buttonConfirm}>Confirm</button>
          <button onClick={onClose} style={styles.buttonClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 1,
      visibility: 'visible',
      transition: 'opacity 5s ease, visibility 6s ease',
    },
    dialog: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      width: '400px',
      maxWidth: '80%',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      opacity: 1,
      transform: 'translateY(0)',
      transition: 'transform 5s ease, opacity 5s ease',
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '20px',
    },
    buttonConfirm: {
      marginRight: '10px',
      padding: '8px 16px',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    buttonClose: {
      padding: '8px 16px',
      backgroundColor: '#DC3545',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

export default Dialog;