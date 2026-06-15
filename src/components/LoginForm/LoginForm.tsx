'use client';

import { useId, useState } from 'react';
import css from './LoginForm.module.css';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LoginFormValidationSchema } from './LoginFormValidation';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { login } from '@/lib/api/clientApi';
import { AxiosError } from 'axios';
import Image from 'next/image';



interface LoginFormValues {
    email: string,
    password: string
}

const initialValues: LoginFormValues = {
    email: "",
    password: ""
}

export default function LoginForm() {

    const fieldId = useId();
    const router = useRouter();
    const setUser = useAuthStore(state => state.setUser);


    const [showPassword, setShowPassword] = useState(false);

    const { mutate, isPending } = useMutation({
        mutationFn: login,
        onSuccess: (res) => {
            if (res) {
                toast.success('Login successful!');
                setUser(res);
                router.push('/');
            }
        },
        onError: (error: AxiosError<{ error?: string }>) => {
            const errorMessage =
                error.response?.data?.error ??
                error.message ??
                'Oops... some error';
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
        <div className={css.formCard} >
            <h1 className={css.formTitle}>Login</h1>
            <Formik initialValues={initialValues} validationSchema={LoginFormValidationSchema} onSubmit={handleSubmit}>
                <Form className={css.form}>

                    {/* Поле Email */}
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
                        <ErrorMessage component="span" name="email" className={css.isError} />
                    </div>

                    {/* Поле Пароля */}
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
                            {/* Кнопка-иконка для скрытия/показа пароля (пока просто кнопка) */}
                            <button type="button" className={css.eyeButton} onClick={togglePasswordVisibility}>

                                {/* МОБИЛЬНАЯ ВЕРСИЯ */}
                                <div className={`${css.iconWrapper} ${css.mobileIcon}`}>
                                    <Image src="/icons/eye-on/mobileVersionEyeOn.svg" alt="" fill sizes="16px" priority className={css.iconOn} />
                                    <Image src="/icons/eye-off/mobileVersionEyeOff.svg" alt="" fill sizes="16px" priority className={css.iconOff} />
                                </div>

                                {/* ПЛАНШЕТНАЯ ВЕРСИЯ */}
                                <div className={`${css.iconWrapper} ${css.tabletIcon}`}>
                                    <Image src="/icons/eye-on/tabletVersionEyeOn.svg" alt="" fill sizes="24px" priority className={css.iconOn} />
                                    <Image src="/icons/eye-off/tabletVersionEyeOff.svg" alt="" fill sizes="24px" priority className={css.iconOff} />
                                </div>

                                {/* ДЕСКТОПНАЯ ВЕРСИЯ */}
                                <div className={`${css.iconWrapper} ${css.desktopIcon}`}>
                                    <Image src="/icons/eye-on/desktopVersionEyeOn.svg" alt="" fill sizes="32px" priority className={css.iconOn} />
                                    <Image src="/icons/eye-off/desktopVersionEyeOff.svg" alt="" fill sizes="32px" priority className={css.iconOff} />
                                </div>
                            </button>
                        </div>
                        <ErrorMessage component="span" name="password" className={css.isError} />
                    </div>

                    <button type="submit" className={css.submitButton} disabled={isPending} >
                        {isPending ? (
                            'Logging in...'
                        ) : (
                            'Login'
                        )}
                    </button>
                </Form>
            </Formik>

            {/* Ссылка на регистрацию */}
            <p className={css.redirectText} >
                Don’t have an account?
                <Link className={css.redirectLink} href="/auth/register" >
                    Register
                </Link >
            </p >
        </div >
    );
}