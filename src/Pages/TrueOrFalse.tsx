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
    return <div className={s.container}>
        {solved.length !== 5 ?
            <>
                <Question question={"Egy történet szerint a ház valójában szanatóriumként működött és csak később lett lakóház"} solution={true} onNext={() => setTimeout(() => setSolved([...solved, 1]))} disabled={solved.includes(1)} />
                <Question question={"A ház máig őrzi a háborúk nyomait, sok helyen hiányoznak cserép darabok."} solution={false} onNext={() => setTimeout(() => setSolved([...solved, 2]))} disabled={solved.includes(2)} />
                <Question question={"A lépcsőházat végig vörös szőnyeg borította."} solution={true} onNext={() => setTimeout(() => setSolved([...solved, 3]))} disabled={solved.includes(3)} />
                <Question question={"A bejárattal szemben egy szobor várta az arra járókat."} solution={false} onNext={() => setTimeout(() => setSolved([...solved, 4]))} disabled={solved.includes(4)} />
                <Question question={"Az épületben régen férfi kollégium is működött."} solution={false} onNext={() => setTimeout(() => setSolved([...solved, 5]), 1000)} disabled={solved.includes(5)} />
            </> :
            <span className={s.solution}>A megoldás: Nikiiii</span>}
    </div>
}

export default TrueOrFalse;