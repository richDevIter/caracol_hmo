import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styles from './DestPoints.module.css';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

export interface propPlus {
    propsField: any,
    propsErrors: any,
    setValue?: any,
    countryValue: any,
    defaultValue?: any
};

const GetStatesNext: React.FC<propPlus> = ({
    propsField, propsErrors, setValue, countryValue, defaultValue
}: propPlus) => {

   
    const [info, setInfo] = useState<any>(null);

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const onMenuOpen = () => {
        if (isMenuOpen === false) {
            setIsMenuOpen(true);
        } else {
            setIsMenuOpen(false);
        }
    }

    useEffect(() => {
        const data = {
            country: countryValue
        }

        async function listStates() {
            const resp = await fetch(`/api/states`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data)
            })
            const statesResp = await resp.json();
            setInfo(statesResp.states);
        }
        listStates();
    }, [countryValue]);

    useEffect(() => {
        if (info !== null) {
            setValue('state', info.find((elem: any) => elem.id === defaultValue));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [info])

    if (info !== null) {
        return (
            <>
                <Select
                    {...propsField}
                    aria-labelledby="aria-label"
                    id="FormControlInput1Estado"
                    inputId="aria-example-input"
                    //className={styles.form_control}
                    name="aria-live-color"
                    onMenuOpen={onMenuOpen}
                    onMenuClose={onMenuOpen}
                    aria-invalid={propsErrors?.state ? "true" : ""}
                    as="select"
                    variant="standard"
                    margin="normal"
                    placeholder="Estado"
                    options={Array.from(info)}
                    getOptionLabel={(option: any) => `${option.description}`}
                    getOptionValue={(option: any) => `${option.id}`}
                //className='form-control'
                />
            </>
        );
    } else {
        return (
            <>
                <select className={`${styles.form_control}`}>
                    <option value='' disabled></option>
                </select>
            </>
        )
    }
}

export default GetStatesNext;