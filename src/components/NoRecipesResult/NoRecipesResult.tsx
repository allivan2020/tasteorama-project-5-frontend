import styles from "./NoRecipesResult.module.css";

const NoRecipesResult = () => {
    return (
        <div className={styles.noResultDiv}>
            <p className={styles.noResultText }>We’re sorry! We were not able to find a match.</p>
            <div className={styles.noResultSpanDiv }>
                <span className={styles.noResultSpan }>Reset serach and filters</span>
            </div>
        </div>
    );
};

export default NoRecipesResult;