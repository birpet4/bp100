import { useEffect, useState } from 'react';
import s from "./Pairing.module.scss";
import clsx from 'clsx';
import { shuffleArray } from '../helpers/helper';

type Pair = {
    id: number;
    word: string;
    pair: string;
    selected?: PairColumn;
};

const initialPairs: Pair[] = [
    { id: 1, word: 'kőfaragó', pair: 'Sóskúti Rt.' },
    { id: 2, word: 'műlakatos', pair: 'Árkay S.' },
    { id: 3, word: 'ács', pair: 'Neuschlosz K. és fia' },
    { id: 4, word: 'tartószerkezet', pair: 'Schlick' },
    { id: 5, word: 'öntöttvas szerkezet', pair: 'MÁVAG' },
    { id: 6, word: 'színesüveg', pair: 'Forgó István' },
    { id: 7, word: 'műasztalos', pair: 'Westermayer A.' },
];

interface Answer {
    id: number;
    column: PairColumn
}

enum PairColumn {
    Left = "left",
    Right = "right"
}

const Pairing = () => {// Shuffle the array before initializing the state
    const shuffledPairsLeft = shuffleArray([...initialPairs]);
    const shuffledPairsRight = shuffleArray([...initialPairs]);
    const [pairs, setPairs] = useState<Pair[]>(shuffledPairsLeft);
    const [left, setLeft] = useState<Pair[]>(shuffledPairsRight);

    const [solved, setSolved] = useState<boolean>(false);

    const [selectedPair, setSelectedPair] = useState<Pair>();
    const [wrong, setWrong] = useState<Answer>();
    const [right, setRight] = useState<number>();

    const LOCAL_STORAGE_NAME = "pairingGame_BP100";

    useEffect(() => {
        if (solved) {
            localStorage.setItem(LOCAL_STORAGE_NAME, "true");
        }
    }, [solved])

    useEffect(() => {
        if (localStorage.getItem(LOCAL_STORAGE_NAME) === "true") {
            setSolved(true);
        }
    }, [])

    const reset = () => {
        localStorage.setItem(LOCAL_STORAGE_NAME, "false");
        setSolved(false);
        setPairs(shuffledPairsLeft);
        setLeft(shuffledPairsRight);
    }

    const selectPair = (pair: Pair, column: PairColumn) => {
        // If there is a selected pair, check if the new selection is a match
        if (selectedPair) {
            if (pair.id === selectedPair.id) {
                // Remove the matched pair from the list
                setRight(pair.id);
                setTimeout(() => {
                    if (pairs.filter((p) => p.id !== pair.id).length === 0) {
                        setSolved(true);
                    }
                    setPairs(pairs.filter((p) => p.id !== pair.id));
                    setLeft(left.filter((p) => p.id !== pair.id));
                    setRight(undefined);
                    setSelectedPair(undefined);
                }, 1000);
            } else {
                setWrong({ id: pair.id, column: column });
                setTimeout(() => {
                    setWrong(undefined);
                    setSelectedPair(undefined);
                }, 1000);
            }
        } else {
            setSelectedPair({ ...pair, selected: column });
        }
    };

    return (<>
        {!solved && <h4 className={s.header}>Párosítsa össze a szakágakat a megfelelő tervezővel!</h4>}
        <div className={s.container}>
            {!solved ?
                <>
                    <div className={s.column}>
                        <h4>Szakágak</h4>
                        {pairs.map((pair) => (
                            <button key={pair.id} className={clsx({ [s.wrong]: wrong && (wrong?.id === pair.id && wrong.column === PairColumn.Left || selectedPair?.id === pair.id && selectedPair.selected === PairColumn.Left), [s.right]: right === pair.id && selectedPair?.id === pair.id })} onClick={() => selectPair(pair, PairColumn.Left)}>
                                {pair.word}
                            </button>
                        ))}
                    </div>
                    <div className={s.column}>
                        <h4>Tervezők</h4>
                        {left.map((pair) => (
                            <button key={pair.id} className={clsx({ [s.wrong]: wrong && (wrong?.id === pair.id && wrong.column === PairColumn.Right || selectedPair?.id === pair.id && selectedPair.selected === PairColumn.Right), [s.right]: right === pair.id && selectedPair?.id === pair.id })} onClick={() => selectPair(pair, PairColumn.Right)}>
                                {pair.pair}
                            </button>
                        ))}
                    </div></>
                :
                <div className={s.solutionContainer}>
                    <span className={s.solution}>Információ a végső megoldáshoz:<br />
                        - 5/2 -<br /><br /> <strong>Családi és politikai okokból összetűzésbe került egy parasztpolitikussal, akit lelőttek.</strong><br /><br />
                        További infó a következő játéknál! :)</span>
                    <button onClick={reset}>Újra</button>
                </div>}
        </div>
    </>);
}

export default Pairing;