"use client";

import { Formik, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { useRecipesQueryParamsStore } from "@/lib/store/recipesQueryParamsStore";
import css from "./SearchBox.module.css";

const SearchSchema = Yup.object({
    search: Yup.string()
        .trim()
        .max(16, "Search query must be 16 characters or fewer"),
});

const SearchInput = () => {
    const [field, meta] = useField("search");
    const hasError = Boolean(meta.touched && meta.error);

    return (
        <input
            {...field}
            className={`${css.input} ${hasError ? css.inputError : ""}`}
            type="text"
            placeholder="Search recipes"
        />
    );
};

export default function SearchBox() {
    const { search, setSearch } = useRecipesQueryParamsStore();

    return (
        <Formik
            initialValues={{ search }}
            enableReinitialize
            validationSchema={SearchSchema}
            onSubmit={(values) => {
                setSearch(values.search.trim());
            }}
        >
            <Form className={css.form}>
                <SearchInput />

                <button className={css.button} type="submit">
                    Search
                </button>

                <ErrorMessage
                    name="search"
                    component="p"
                    className={css.error}
                />
            </Form>
        </Formik>
    );
}
