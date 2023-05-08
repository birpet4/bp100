import { useState } from 'react';
import s from "./Pairing.module.scss";
import clsx from 'clsx';

const Pairing = () => {
    const [selection, setSelection] = useState<number>();
    // const [solutions, setSolutions] = useState<number[]>([]);
    const [errors, setErrors] = useState<{ [id: number]: boolean }>({});
    const [solved, setSolved] = useState<{ [id: number]: boolean }>({});


    const onClick = (id: number) => {
        if (selection === id) {
            setSolved({ ...solved, [id]: true });
            setSelection(undefined);
            setErrors({});
        } else if (!selection) {
            setSelection(id);
        } else {
            setErrors({ ...errors, [id]: true });
        }
    }

    return <div className={s.container}>
        <div className={s.column}>
            <div onClick={() => onClick(1)} className={clsx({ [s.selected]: selection === 1, [s.wrong]: errors[1], [s.color1]: solved[1] })}>Kőfaragó</div>
            <div>műlakatos</div>
            <div>ács</div>
            <div>tartószerkezet</div>
            <div>önöttvas szerkezet</div>
            <div>színesüveg</div>
            <div>műasztalos</div>
        </div>
        <div className={s.column}>
            <div>MÁVAG</div>
            <div onClick={() => onClick(1)} className={clsx({ [s.selected]: selection === 1, [s.wrong]: errors[1], [s.color1]: solved[1] })}>Sóskúti Rt.</div>
            <div>Forgó István</div>
            <div>Neuschlosz K. és fia</div>
            <div>Westermayer A.</div>
            <div>Árkay S.</div>
            <div>Schlick</div>
        </div>
    </div>;
}

export default Pairing;