import { Link } from "react-router-dom";
import s from "./Home.module.scss";

const Home = () => {
    return <div className={s.container}>
        <h4>Játékok a Bajcsy-Zsilinszky út 37 házhoz a BP100 kiállítás keretein belül</h4>
        <Link to={"questions"} className={s.link}>Questions game</Link>
        <Link to={"trueorfalse"} className={s.link}>True or false game</Link>
        <Link to={"pair"} className={s.link}>Pairing game</Link>
        <Link to={"multiple"} className={s.link}>Picture guessing game</Link>
        <Link to={"pictureguess"} className={s.link}>Pictures pairing game</Link>
    </div>
}

export default Home;