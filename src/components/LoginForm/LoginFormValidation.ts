import * as Yup from "yup";

export const LoginFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Incorrect email format!")
    .max(128, "Email too long! Maximum 128 characters allowed.")
    .required("Email is required!"),
  password: Yup.string()
    .min(6, "Password too short. Minimum 6 characters required.")
    .max(128, "Password too long. Maximum 128 characters allowed.")
    .required("Password is required!"),
});
