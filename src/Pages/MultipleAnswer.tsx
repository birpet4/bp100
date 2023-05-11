import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import s from "./MultipleAnswer.module.scss";
import { shuffleArray } from "../helpers/helper";

interface SimpleAnswer {
    id: number;
    solution: boolean;
    answer: string;
}

const QuestionAnswer = ({ question, answers, onNext }: { question: string, answers: SimpleAnswer[], onNext: () => void }) => {
    const [userAnswers, setUserAnswers] = useState<{ [x: number]: boolean }>({});
    const [shuffledArray, setShuffledArray] = useState<SimpleAnswer[]>(answers);
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
            setShuffledArray(shuffleArray(answers));
        }
    }, [wrongAnswers, answers])

    return <div>
        <h4>{question}</h4>
        <div className={s.simpleAnswer}>
            {shuffledArray.map(a => {
                return <div className={clsx(s.simpleAnswerBox, { [s.wrong]: userAnswers[a.id] === false, [s.right]: userAnswers[a.id] === true })} onClick={() => onClick(a)}>{a.answer}</div>
            })}
        </div>
    </div>
}


const MultipleAnswer = () => {
    const [activeQuestion, setActiveQuestion] = useState<number>(1);
    const [isDone, setIsDone] = useState<boolean>(false);

    return <div className={s.questions}>
        {activeQuestion === 1 && <QuestionAnswer
            question={"A mai Bajcsy Zsilinszky út ezt a nevet csak 1945-től viseli, hogy hívták előtte?"}
            answers={[{ id: 1, answer: "Váci körút", solution: true },
            { id: 2, answer: "Szerb utca", solution: false },
            { id: 3, answer: "Vilmos császár út", solution: true },
            { id: 4, answer: "Váci út", solution: true },
            { id: 5, answer: "Mehmed szultán út", solution: false },
            { id: 6, answer: "Károly körút", solution: false }]}
            onNext={() => setTimeout(() => setActiveQuestion(2), 1000)} />}

        {activeQuestion === 2 && <QuestionAnswer
            question={"Az épület homlokzatát mi jellemzi?"}
            answers={[{ id: 1, answer: "Sarok homlokzat", solution: true },
            { id: 2, answer: "Oroszlános erkély", solution: false },
            { id: 3, answer: "Kariatidák tartják a párkányt", solution: true },
            { id: 4, answer: "Timpanon koronázás", solution: true },
            { id: 5, answer: "Szimetrikus megjelenés", solution: false },
            { id: 6, answer: "Zöld gerébtokos nyílászárók", solution: false }]}
            onNext={() => setTimeout(() => { setActiveQuestion(3); setIsDone(true); }, 1000)} />}

        {isDone && <span>A megfejtés: fogalmam sincs</span>}
    </div>;
}

export default MultipleAnswer;