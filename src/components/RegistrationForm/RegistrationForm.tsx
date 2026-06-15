'use client';
import css from './RegistrationForm.module.css'
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import {useId, useState} from "react";
import Link from "next/link";
import {RegistrationFormValidationSchema} from "@/components/RegistrationForm/RegistrationFormValidation";
import EyeOnIcon from '@/assets/icons/open-eye-icon.svg';
import EyeOffIcon from '@/assets/icons/close-eye-icon.svg';
import {useMutation} from "@tanstack/react-query";
import axios from "axios";

interface RegisterFormValues {
    email: string,
    name: string,
    password: string,
    confirmPassword: string
}

const initialValues: RegisterFormValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: ""
}

const RegistrationForm = () => {

    const fieldId = useId();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // const mutation = useMutation({
    //     mutationFn: async (newTodo) => {
    //         const res = await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo);
    //         return res.data;
    //     },
    //     onSuccess: () => {
    //         console.log("Todo added successfully");
    //     }
    // });

    // const handleCreateTodo = () => {
    //     // 3. Викликаємо mutate для того щоб виконати HTTP-запит
    //     mutation.mutate({
    //         title: "My new todo",
    //         completed: false
    //     })
    // };

    const handleSubmit = (
        values: RegisterFormValues,
        actions: FormikHelpers<RegisterFormValues>
    ) => {
        console.log("Order data:", values);
        actions.resetForm();
    };


    return (
        <div className={css.formCard}>
            <h1 className={css.formTitle}>Register</h1>
            <p className={css.formSubTitle}>Join our community of culinary enthusiasts, save your favorite recipes, and
                share your cooking
                creations</p>

            <Formik initialValues={initialValues} validateOnMount onSubmit={handleSubmit}
                    validationSchema={RegistrationFormValidationSchema}>
                {({isValid, dirty, isSubmitting}) => (
                    <Form className={css.form}>
                        <div className={css.formGroup}>
                            <label className={css.label} htmlFor={`${fieldId}-email`}>
                                Enter your email address
                            </label>
                            <Field
                                className={css.input}
                                type="email" name="email"
                                placeholder="email@gmail.com"
                                id={`${fieldId}-email`}/>
                            <ErrorMessage component="span" name="email" className={css.isError}/>
                        </div>

                        <div className={css.formGroup}>
                            <label className={css.label} htmlFor={`${fieldId}-name`}>
                                Enter your name
                            </label>
                            <Field
                                className={css.input}
                                type="name"
                                name="name"
                                id={`${fieldId}-name`}
                                placeholder="Max"/>
                            <ErrorMessage component="span" name="name" className={css.isError}/>
                        </div>

                        <div className={css.formGroup}>
                            <label className={css.label} htmlFor={`${fieldId}-password`}>
                                Create a strong password
                            </label>
                            <div className={css.passwordWrapper}>
                                <Field
                                    className={`${css.input} ${css.passwordInput}`}
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    id={`${fieldId}-password`}
                                    placeholder="*********"/>

                                <button
                                    type="button"
                                    className={css.eyeButton}
                                    onClick={() => setShowPassword(prev => !prev)}
                                    aria-label={showPassword ? 'Show password ' : 'Hide password'}
                                    aria-pressed={showPassword}
                                >
                                    {showPassword ? <EyeOnIcon/> : <EyeOffIcon/>}
                                </button>
                            </div>

                            <ErrorMessage component="span" name="password" className={css.isError}/>
                        </div>

                        <div className={css.formGroup}>
                            <label className={css.label} htmlFor={`${fieldId}-confirm-password`}>
                                Repeat your password
                            </label>
                            <div className={css.passwordWrapper}>
                                <Field
                                    className={`${css.input} ${css.passwordInput}`}
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    id={`${fieldId}-confirm-password`}
                                    placeholder="*********"/>

                                <button
                                    type="button"
                                    className={css.eyeButton}
                                    onClick={() => setShowConfirmPassword(prev => !prev)}
                                    aria-label={showConfirmPassword ? 'Hide password ' : 'Show password'}
                                    aria-pressed={showConfirmPassword}
                                >
                                    {showConfirmPassword ? <EyeOnIcon/> : <EyeOffIcon/>}
                                </button>
                            </div>
                            <ErrorMessage component="span" name="confirmPassword" className={css.isError}/>
                        </div>


                        <button type="submit" className={css.submitButton} disabled={!dirty || !isValid || isSubmitting}>
                            Create account
                        </button>
                    </Form>
                )}
            </Formik>

            <p className={css.redirectText}>
                Already have an account?
                <Link className={css.redirectLink} href="/auth/login">
                    Log In
                </Link>
            </p>

        </div>
    );
}


export default RegistrationForm