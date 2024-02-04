'use client';

import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        success: {
          style: {
            border: '1px solid #009688',
            padding: '16px 24px',
            color: '#009688',
            backgroundColor: '#f0fff4',
          },
        },
        error: {
          style: {
            border: '1px solid #f44336',
            padding: '16px',
            color: '#f44336',
            backgroundColor: '#ff9a7a',
          },
        },
      }}
    />
  );
};
