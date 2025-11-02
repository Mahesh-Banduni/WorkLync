'use client';

import { Provider } from 'react-redux';
import store from '../store/store';
import ToastManager from '@/components/ui/toastWrapper';

export default function ClientLayout({ children }) {
  return (
    <Provider store={store}>
      <ToastManager />
      {children}
    </Provider>
  );
}
