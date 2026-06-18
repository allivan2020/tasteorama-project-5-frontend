'use client';

import styles from './AuthModal.module.css';

import LoginForm from '@/components/LoginForm/LoginForm';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';

type AuthModalProps = {
  onClose: () => void;
  mode?: 'login' | 'register';
};

export const AuthModal = ({ onClose, mode = 'login' }: AuthModalProps) => {
  const isLogin = mode === 'login';

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={`${styles.modal} ${
          isLogin ? styles.loginModal : styles.registerModal
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.formSlot}>
          {isLogin ? <LoginForm /> : <RegistrationForm />}
        </div>
      </div>
    </div>
  );
};