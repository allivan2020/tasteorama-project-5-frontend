

// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import styles from './AuthModal.module.css';

// type AuthModalProps = {
//   onClose: () => void;
// };

// export const AuthModal = ({ onClose }: AuthModalProps) => {
//   const [mode, setMode] = useState<'login' | 'register'>('login');

//   return (
//     <div className={styles.backdrop} onClick={onClose}>
//       <div
//         className={styles.modal}
//         onClick={(event) => event.stopPropagation()}
//       >
//         {mode === 'login' ? (
//           <>
//             <h2 className={styles.title}>Login</h2>

//             <form className={styles.form}>
//               <label className={styles.label}>
//                 Enter your email address
//                 <input
//                   className={styles.input}
//                   type="email"
//                   placeholder="email@gmail.com"
//                 />
//               </label>

//               <label className={styles.label}>
//                 Create a strong password

//                 <div className={styles.passwordWrapper}>
//                   <input
//                     className={styles.input}
//                     type="password"
//                     placeholder="********"
//                   />

               
//                 </div>
//               </label>

//               <button type="button" className={styles.primaryBtn}>
//                 Login
//               </button>
//             </form>

//             <p className={styles.switchText}>
//               Don&apos;t have an account?{' '}
//               <button
//                 type="button"
//                 className={styles.switchBtn}
//                 onClick={() => setMode('register')}
//               >
//                 Register
//               </button>
//             </p>
//           </>
//         ) : (
//           <>
//             <h2 className={styles.title}>Register</h2>

//             <p className={styles.description}>
//               Join our community of culinary enthusiasts, save your favorite
//               recipes, and share your cooking creations
//             </p>

//             <form className={styles.form}>
//               <label className={styles.label}>
//                 Enter your name
//                 <input
//                   className={styles.input}
//                   type="text"
//                   placeholder="Max"
//                 />
//               </label>

//               <label className={styles.label}>
//                 Enter your email address
//                 <input
//                   className={styles.input}
//                   type="email"
//                   placeholder="email@gmail.com"
//                 />
//               </label>

//               <label className={styles.label}>
//                 Create a strong password

//                 <div className={styles.passwordWrapper}>
//                   <input
//                     className={styles.input}
//                     type="password"
//                     placeholder="********"
//                   />

                 
//                 </div>
//               </label>

//               <label className={styles.label}>
//                 Repeat your password

//                 <div className={styles.passwordWrapper}>
//                   <input
//                     className={styles.input}
//                     type="password"
//                     placeholder="********"
//                   />

               
//                 </div>
//               </label>

//               <button type="button" className={styles.primaryBtn}>
//                 Create account
//               </button>
//             </form>

//             <p className={styles.switchText}>
//               Already have an account?{' '}
//               <button
//                 type="button"
//                 className={styles.switchBtn}
//                 onClick={() => setMode('login')}
//               >
//                 Log in
//               </button>
//             </p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };
'use client';

import { useState } from 'react';
import styles from './AuthModal.module.css';

// TODO: після того як колега зробить форми
// import { LoginForm } from '@/components/LoginForm/LoginForm';
// import { RegisterForm } from '@/components/RegisterForm/RegisterForm';

type AuthModalProps = {
  onClose: () => void;
};

export const AuthModal = ({ onClose }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={`${styles.modal} ${
          mode === 'login' ? styles.loginModal : styles.registerModal
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        {mode === 'login' ? (
          <>
            <h2 className={styles.title}>Login</h2>

            {/* TODO: Замінити на <LoginForm /> */}
            <div className={styles.formPlaceholder}>
              Login form component
            </div>

            <p className={styles.switchText}>
              Don&apos;t have an account?{' '}
              <button
                type="button"
                className={styles.switchBtn}
                onClick={() => setMode('register')}
              >
                Register
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className={styles.title}>Register</h2>

            <p className={styles.description}>
  <span className={styles.mobileText}>
    Join our community of  culinary 
    <br />
   enthusiasts,save your favorite
    <br />
     recipes, and share your cooking
    <br />
    creations
   
    
  </span>

  <span className={styles.tabletText}>
    Join our community of culinary enthusiasts, save your
    <br />
    favorite recipes, and share your cooking creations
  </span>

  <span className={styles.desktopText}>
    Join our community of culinary enthusiasts,
    <br />
    save your favorite recipes, and share your
    <br />
    cooking creations
  </span>
</p>

            {/* TODO: Замінити на <RegisterForm /> */}
            <div className={styles.formPlaceholder}>
              Register form component
            </div>

            <p className={styles.switchText}>
              Already have an account?{' '}
              <button
                type="button"
                className={styles.switchBtn}
                onClick={() => setMode('login')}
              >
                Log in
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};