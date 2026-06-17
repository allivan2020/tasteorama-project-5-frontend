import SearchBox from "../SearchBox/SearchBox";
import css from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={css.hero}>
            <div className={css.container}>
                <h1 className={css.title}>
                    Plan, Cook, and
                    <br />
                    Share Your Flavors
                </h1>

                <SearchBox />
            </div>
        </section>
    );
}
