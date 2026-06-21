'use client';

import {useId, useState} from 'react';
import css from '../AuthForm/AuthForm.module.css'
import Link from 'next/link';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {LoginFormValidationSchema} from './LoginFormValidation';
import {useAuthStore} from '@/lib/store/authStore';
import {useRouter} from 'next/navigation';
import {useMutation} from '@tanstack/react-query';
import {toast} from 'react-hot-toast';
import {login} from '@/lib/api/clientApi';
import {AxiosError} from 'axios';

import EyeOnIcon from '@/assets/icons/open-eye-icon.svg';
import EyeOffIcon from '@/assets/icons/close-eye-icon.svg';

interface LoginFormValues {
    email: string;
    password: string;
}

const initialValues: LoginFormValues = {
    email: '',
    password: '',
};

export default function LoginForm() {
    const fieldId = useId();
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);

    const [showPassword, setShowPassword] = useState(false);

    const {mutate, isPending} = useMutation({
        mutationFn: login,
        onSuccess: (res) => {
            if (res) {
                toast.success('Login successful!');
                setUser(res);
                document.cookie = 'isAuth=true; path=/; max-age=86400';
                router.push('/');
            }
        },
        onError: (error: AxiosError<{ error?: string }>) => {
            const errorMessage =
                error.response?.data?.error ?? error.message ?? 'Oops... some error';
            toast.error(errorMessage);
        },
    });

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = (values: LoginFormValues) => {
        mutate(values);
    };

    return (
        <div className={css.formCard}>
            <h1 className={css.formTitle}>Login</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={LoginFormValidationSchema}
                onSubmit={handleSubmit}
            >
                {({isValid, dirty}) => (
                    <Form className={css.form}>
                        <div className={css.formGroup}>
                            <label htmlFor={`${fieldId}-email`} className={css.label}>
                                Enter your email address
                            </label>
                            <Field
                                id={`${fieldId}-email`}
                                name="email"
                                type="email"
                                placeholder="email@gmail.com"
                                className={css.input}
                            />
                            <ErrorMessage
                                component="span"
                                name="email"
                                className={css.isError}
                            />
                        </div>

                        <div className={css.formGroup}>
                            <label htmlFor={`${fieldId}-password`} className={css.label}>
                                Create a strong password
                            </label>
                            <div className={css.passwordWrapper}>
                                <Field
                                    id={`${fieldId}-password`}
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="**********"
                                    className={`${css.input} ${css.passwordInput}`}
                                />

                                <button
                                    type="button"
                                    className={css.eyeButton}
                                    onClick={togglePasswordVisibility}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    aria-pressed={showPassword}
                                >
                                    {showPassword ? <EyeOnIcon/> : <EyeOffIcon/>}
                                </button>
                            </div>
                            <ErrorMessage
                                component="span"
                                name="password"
                                className={css.isError}
                            />
                        </div>

                        <button
                            type="submit"
                            className={css.submitButton}
                            disabled={!dirty || !isValid || isPending}
                        >
                            {isPending ? 'Logging in...' : 'Login'}
                        </button>
                    </Form>
                )}
            </Formik>

            <p className={css.redirectText}>
                Don’t have an account?
                <Link className={css.redirectLink} href="/auth/register">
                    Register
                </Link>
            </p>
        </div>
    );
}
