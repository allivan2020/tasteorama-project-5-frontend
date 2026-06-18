import css from "./SearchBox.module.css";

export default function SearchBox() {
    return (
        <form className={css.form}>
            <input
                className={css.input}
                type="text"
                placeholder="Search recipes"
            />

            <button className={css.button} type="submit">
                Search
            </button>
        </form>
    );
}
