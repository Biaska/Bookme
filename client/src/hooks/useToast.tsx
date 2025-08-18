import React, { useState} from 'react';

// interface ToastProps {
//     visible: Boolean
//     message: string;
// }
const useToast = (): [React.FC, (msg: string) => void] => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState<string>('');

    const setToast = (msg: string) => {
        setMessage(msg)
        setVisible(true)
        const timeout = setTimeout(() => {
            setVisible(false);
          }, 5000);
      
          return () => {
            clearTimeout(timeout);
          }
        }

    const Toast: React.FC = () => {

        return visible ? (
          <div className="toast">
            <div className="toast-message">{message}</div>
          </div>
        ) : null;
      };
      
      return [Toast, setToast];

}

export default useToast;