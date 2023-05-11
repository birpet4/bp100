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
    const wrongAnswers = useMemo(() => Object.values(userAnswers).filter(u => u === false).length, [userAnswers]);

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

    useEffect(() => {
        if (wrongAnswers > 1) {
            setUserAnswers({});
        }
    }, [wrongAnswers])

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
            answers={[{ id: 1, answer: "Sarok homlokzat", solution: false },
            { id: 2, answer: "Oroszlános erkély", solution: false },
            { id: 3, answer: "Kariatidák tartják a párkányt", solution: true },
            { id: 4, answer: "Timpanon koronázás", solution: false }]}
            onNext={() => setTimeout(() => setActiveQuestion(3), 1000)} />}

        {activeQuestion === 3 && <QuestionAnswer
            imageQuestion={kep3}
            answers={[{ id: 1, answer: "Sarok homlokzat", solution: false },
            { id: 2, answer: "Oroszlános erkély", solution: false },
            { id: 3, answer: "Kariatidák tartják a párkányt", solution: false },
            { id: 4, answer: "Timpanon koronázás", solution: true }]}
            onNext={() => setTimeout(() => setActiveQuestion(4), 1000)} />}


        {activeQuestion === 4 && <QuestionAnswer
            imageQuestion={kep4}
            answers={[{ id: 1, answer: "Budapest, 1872 Pest belterületének városrendezési térképe", solution: false },
            { id: 2, answer: "Budapest, 1908 Budapest közigazgatási térképsorozata", solution: false },
            { id: 3, answer: "Budapest, 2023 Google maps térkép részlet", solution: true },
            { id: 4, answer: "", solution: false }]}
            onNext={() => setTimeout(() => { setActiveQuestion(0); setIsDone(true) }, 1000)} />}


        {isDone && <span className={s.solution}>A megfejtés: Disznó</span>}
    </div>;
}

export default PictureGuess;