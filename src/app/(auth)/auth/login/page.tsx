import LoginForm from '@/components/LoginForm/LoginForm';
import css from './LoginPage.module.css';

export const metadata = {
    title: 'Login Page | Tasteorama',
    description: 'Page for users to log in to their Tasteorama account and access personalized features.',
};

const LoginPage = () => {
    return (
        <main className={css.pageContent}>
            <LoginForm />
        </main>
    )

};

export default LoginPage;