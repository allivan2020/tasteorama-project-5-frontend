"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRecipesQueryParamsStore } from "@/lib/store/recipesQueryParamsStore";
import css from "./SearchBox.module.css";

const SearchSchema = Yup.object({
    search: Yup.string().trim().max(16, "Search must be 16 characters or less"),
});

export default function SearchBox() {
    const { setSearch } = useRecipesQueryParamsStore();

    return (
        <Formik
            initialValues={{ search: "" }}
            validationSchema={SearchSchema}
            onSubmit={(values) => {
                console.log("SEARCH VALUE:", values.search.trim());
                setSearch(values.search.trim());
            }}
        >
            <Form className={css.form}>
                <Field
                    className={css.input}
                    type="text"
                    name="search"
                    placeholder="Search recipes"
                />

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
