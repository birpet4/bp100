import { Link } from "react-router-dom";
import s from "./Home.module.scss";

const Home = () => {
    return <div className={s.container}>
        <Link to={"questions"} className={s.link}>Questions game</Link>
        <Link to={"trueorfalse"} className={s.link}>True or false game</Link>
        <Link to={"pair"} className={s.link}>Pairing game</Link>
        <Link to={"pictures"} className={s.link}>Picture guessing game</Link>
        <Link to={"picturespair"} className={s.link}>Pictures pairing game</Link>
    </div>
}

export default Home;