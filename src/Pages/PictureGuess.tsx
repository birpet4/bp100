import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import s from "./PictureGuess.module.scss";
import kep1 from "../assets/Bp 1867-73.JPG";
import kep2 from "../assets/Bp 1878.JPG";
import kep3 from "../assets/Bp 1895.JPG";
import kep4 from "../assets/Bp napjaink.JPG";

interface SimpleAnswer {
    id: number;
    solution: boolean;
    answer: string;
}

const QuestionAnswer = ({ imageQuestion, answers, onNext }: { imageQuestion: string, answers: SimpleAnswer[], onNext: () => void }) => {
    const [userAnswers, setUserAnswers] = useState<{ [x: number]: boolean }>({});
    const correctAnswers = answers.filter(a => a.solution).length;
    const solvedAnswers = useMemo(() => Object.values(userAnswers).filter(u => u === true).length, [userAnswers]);

    const onClick = (answer: SimpleAnswer) => {
        if (answer.solution) {
            setUserAnswers({ ...userAnswers, [answer.id]: true });
        } else {
            setUserAnswers({ ...userAnswers, [answer.id]: false });
        }
    }

    useEffect(() => {
        if (correctAnswers === solvedAnswers) {
            onNext();
        }
    }, [solvedAnswers, correctAnswers, onNext])

    return <div>
        <img src={imageQuestion} />
        <div className={s.simpleAnswer}>
            {answers.map(a => {
                return <div className={clsx(s.simpleAnswerBox, { [s.wrong]: userAnswers[a.id] === false, [s.right]: userAnswers[a.id] === true })} onClick={() => onClick(a)}>{a.answer}</div>
            })}
        </div>
    </div>
}


const PictureGuess = () => {
    const [activeQuestion, setActiveQuestion] = useState<number>(1);
    const [isDone, setIsDone] = useState<boolean>(false);

    const LOCAL_STORAGE_NAME = "pictureGuessGame_BP100";

    useEffect(() => {
        if (isDone) {
            localStorage.setItem(LOCAL_STORAGE_NAME, "true");
        }
    }, [isDone])

    useEffect(() => {
        if (localStorage.getItem(LOCAL_STORAGE_NAME) === "true") {
            setIsDone(true);
            setActiveQuestion(0);
        }
    }, [])

    const reset = () => {
        localStorage.setItem(LOCAL_STORAGE_NAME, "false");
        setIsDone(false);
        setActiveQuestion(1);
    }

    return <div className={s.questions}>
        {!isDone && <h4>Melyik térkép részlet melyik korszakhoz tartozik?</h4>}
        {activeQuestion === 1 && <QuestionAnswer
            imageQuestion={kep1}
            answers={[{ id: 1, answer: "Budapest, 1878 Budapest méter rendszerben készült kataszteri jellegű térképe", solution: false },
            { id: 2, answer: "Budapest, 1872 Pest kataszteri térképsorozata", solution: true },
            { id: 3, answer: "Budapest, 1833 Pest - Buda térkép", solution: false }]}
            onNext={() => setTimeout(() => setActiveQuestion(2), 1000)} />}

        {activeQuestion === 2 && <QuestionAnswer
            imageQuestion={kep2}
            answers={[{ id: 1, answer: "Budapest, 1854 Pest - Buda belterületének várostérképe", solution: false },
            { id: 2, answer: "Budapest, 1878 Budapest méter rendszerben készült kataszteri jellegű térképe", solution: true },
            { id: 3, answer: "Budapest, 2023 Google maps térkép részlet", solution: false }]}
            onNext={() => setTimeout(() => setActiveQuestion(3), 1000)} />}

        {activeQuestion === 3 && <QuestionAnswer
            imageQuestion={kep3}
            answers={[{ id: 1, answer: "Budapest, 1895 Budapest közigazgatási térképsorozata", solution: true },
            { id: 2, answer: "Budapest, 1903 Budapest bel- és külterület térképe", solution: false },
            { id: 3, answer: "Budapest, 1918-46 Budapest kataszteri térképsorozata", solution: false }]}
            onNext={() => setTimeout(() => setActiveQuestion(4), 1000)} />}

        {activeQuestion === 4 && <QuestionAnswer
            imageQuestion={kep4}
            answers={[{ id: 1, answer: "Budapest, 1872 Pest belterületének városrendezési térképe", solution: false },
            { id: 2, answer: "Budapest, 1908 Budapest közigazgatási térképsorozata", solution: false },
            { id: 3, answer: "Budapest, 2023 Google maps térkép részlet", solution: true }]}
            onNext={() => setTimeout(() => { setActiveQuestion(0); setIsDone(true) }, 1000)} />}


        {isDone && <div className={s.solutionContainer}>
            <span className={s.solution}>Információ a végső megoldáshoz:
                - 5/4 -<br />  <br /> <strong>Aktívan részt vett a földalatti mozgalomban.</strong><br /> <br />
                További infó a következő játéknál! :)</span>
            <button onClick={reset}>Újra</button>
        </div>}
    </div>;
}

export default PictureGuess;