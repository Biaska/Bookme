import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return visible ? (
    <div className="toast">
      <div className="toast-message">{message}</div>
    </div>
  ) : null;
};

export default Toast;