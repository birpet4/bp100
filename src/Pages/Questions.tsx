import { useState } from 'react';
import aranyJanosUtca from "../assets/fortepan_82178_aranyjanosutca.jpg";
import bazilika from "../assets/fortepan_82346_bazilika.jpg";
import harmadikHaz from "../assets/fortepan_82129_BZS37.jpg";
import petofi from "../assets/petőfi.jpg";
import ady from "../assets/ady endre.jpg";
import jozsefattila from "../assets/józsef attila.jpg";
import s from "./Questions.module.scss";
import clsx from "clsx";

interface ImageAnswer {
    image: string;
    solution: boolean;
    id: number;
}

interface SimpleAnswer {
    id: number;
    solution: boolean;
    answer: string;
}

const QuestionImageAnswer = ({ question, answers, onNext }: { question: string, answers: ImageAnswer[], onNext: () => void }) => {
    const [wrongAnswer, setWronganswer] = useState<{ [x: number]: boolean }>({});
    const [solved, setSolved] = useState<boolean>(false);

    const onClick = (answer: ImageAnswer) => {
        if (answer.solution) {
            setSolved(true);
            onNext();
        } else {
            setWronganswer({ ...wrongAnswer, [answer.id]: true });
        }
    }

    return <div>
        <h4>{question}</h4>
        <div className={s.answers}>
            {answers.map((a, i) => {
                return <img src={a.image} key={i} className={clsx(s.image, { [s.wrongAnswer]: wrongAnswer[a.id], [s.rightAnswer]: solved && a.solution })} onClick={() => onClick(a)} />
            })}
        </div>
    </div>
}

const QuestionAnswer = ({ question, answers, onNext }: { question: string, answers: SimpleAnswer[], onNext: () => void }) => {
    const [wrongAnswer, setWronganswer] = useState<{ [x: number]: boolean }>({});
    const [solved, setSolved] = useState<boolean>(false);

    const onClick = (answer: SimpleAnswer) => {
        if (answer.solution) {
            setSolved(true);
            onNext();
        } else {
            setWronganswer({ ...wrongAnswer, [answer.id]: true });
        }
    }

    return <div>
        <h4>{question}</h4>
        <div className={s.simpleAnswer}>
            {answers.map(a => {
                return <div className={clsx(s.simpleAnswerBox, { [s.wrong]: wrongAnswer[a.id], [s.right]: solved && a.solution })} onClick={() => onClick(a)}>{a.answer}</div>
            })}
        </div>
    </div>
}

const Questions = () => {
    const [activeQuestion, setActiveQuestion] = useState<number>(1);
    const [isDone, setIsDone] = useState<boolean>(false);

    return <div className={s.questions}>
        {activeQuestion === 1 && <QuestionImageAnswer
            question={"Melyik a Bajcsy Zsilinszky 37-es szám alatt álló épület?"}
            answers={[{ id: 1, image: aranyJanosUtca, solution: false },
            { id: 2, image: bazilika, solution: false },
            { id: 3, image: harmadikHaz, solution: true }]}
            onNext={() => setTimeout(() => setActiveQuestion(2), 1000)} />}

        {activeQuestion === 2 && <QuestionImageAnswer
            question={"Melyik híres költőnk élt az épületben?"}
            answers={[{ id: 1, image: jozsefattila, solution: true },
            { id: 2, image: petofi, solution: false },
            { id: 3, image: ady, solution: false }]}
            onNext={() => setTimeout(() => setActiveQuestion(3), 1000)} />}

        {activeQuestion === 3 && <QuestionAnswer
            question={"Milyen stílusban épült?"}
            answers={[{ id: 1, answer: "kora historizmus", solution: true },
            { id: 2, answer: "klasszicista", solution: false },
            { id: 3, answer: "romantikus", solution: false }]}
            onNext={() => setTimeout(() => setActiveQuestion(4), 1000)} />}

        {activeQuestion === 4 && <QuestionAnswer
            question={"Ki tervezte az épületet?"}
            answers={[{ id: 1, answer: "Weber Antal", solution: true },
            { id: 2, answer: "Pucher József", solution: false },
            { id: 3, answer: "Diescher József", solution: false }]}
            onNext={() => setTimeout(() => setActiveQuestion(5), 1000)} />}

        {activeQuestion === 5 && <QuestionAnswer
            question={"Vagyonos építtető, akiről a ház a nevét kapta, közismert néven: A...-ház"}
            answers={[{ id: 1, answer: "Placht", solution: true },
            { id: 2, answer: "Weber", solution: false },
            { id: 3, answer: "Szerb", solution: false }]}
            onNext={() => { setTimeout(() => { setActiveQuestion(0); setIsDone(true); }, 1000) }} />}

        {isDone && <span>A megfejtés: fogalmam sincs</span>}
    </div>;
}

export default Questions;