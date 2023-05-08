import { useState } from 'react';
import s from "./TrueOrFalse.module.scss";
import clsx from 'clsx';

const Question = ({ solution, question, onNext, disabled }: { solution: boolean, question: string, onNext: () => void, disabled: boolean }) => {
    const [solved, setSolved] = useState<boolean | undefined>(undefined);
    const onClick = (answer: boolean) => {
        if (disabled) {
            return;
        }
        if (answer === solution) {
            setSolved(true);
            onNext();
        } else {
            setSolved(false);
        }
    }
    return <div className={s.questionContainer}>
        <div>{question}</div>
        <div className={s.trueOrFalseContainer}>
            <button className={clsx({ [s.solved]: solution && solved && solved !== undefined, [s.failed]: !solution && !solved && solved !== undefined, [s.disabled]: disabled })} onClick={() => onClick(true)}>Igaz</button>
            <button className={clsx({ [s.solved]: !solution && solved && solved !== undefined, [s.failed]: solution && !solved && solved !== undefined, [s.disabled]: disabled })} onClick={() => onClick(false)}>Hamis</button>
        </div>
    </div >
}

const TrueOrFalse = () => {
    const [solved, setSolved] = useState<number[]>([]);
    return solved.length !== 5 ? <div className={s.container}>
        <Question question={"Egy történet szerint a ház valójában szanatóriumként működött és csak később lett lakóház"} solution={true} onNext={() => setSolved([...solved, 1])} disabled={solved.includes(1)} />
        <Question question={"A ház máig őrzi a háborúk nyomait, sok helyen hiányoznak cserép darabok."} solution={false} onNext={() => setSolved([...solved, 2])} disabled={solved.includes(2)} />
        <Question question={"A lépcsőházat végig vörös szőnyeg borította."} solution={true} onNext={() => setSolved([...solved, 3])} disabled={solved.includes(3)} />
        <Question question={"A bejárattal szemben egy szobor várta az arra járókat."} solution={false} onNext={() => setSolved([...solved, 4])} disabled={solved.includes(4)} />
        <Question question={"Az épületben régen férfi kollégium is működött."} solution={false} onNext={() => setSolved([...solved, 5])} disabled={solved.includes(5)} />
    </div> : <span>A megoldás: nem tudom</span>
}

export default TrueOrFalse;