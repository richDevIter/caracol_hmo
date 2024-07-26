import React, { useEffect, useState } from 'react';
import Select from 'react-select';
/* import api from '../../services/api'; */


import styles from "./DestPoints.module.css";

export interface propPlus {
    propsField: any,
    propsLabel: any,
    propsErrors: any,
};


const GetBanks: React.FC<propPlus> = ({
    propsField, propsLabel, propsErrors
}: propPlus) => {
    //const { t } = useTranslation();

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
        const token = localStorage.getItem('GroupId') || '{}';

        async function listBanks() {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/DropDown/GetBanks`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            const bankResp = await resp.json();
            setInfo(bankResp.data);
        }
        listBanks();
    }, []);

    if (info !== null) {
        return (
            <>
                <div className={propsErrors.codBank !== undefined ? "endpoint-error" : "endpoint"}>
                    <Select
                        aria-labelledby="aria-label"
                        inputId="aria-example-input"
                        name="aria-live-color"
                        onMenuOpen={onMenuOpen}
                        onMenuClose={onMenuOpen}
                        {...propsField}
                        aria-invalid={propsErrors?.codBank ? "true" : ""}
                        label={propsLabel}
                        as="select"
                        variant="standard"
                        margin="normal"
                        placeholder="Selecione"
                        options={Array.from(info)}
                        getOptionLabel={(option: any) => `${option.description}`}
                    />
                </div>
            </>
        );
    } else {
        return (
            <>
                <select>
                    <option value='' disabled></option>
                </select>
            </>
        )

    }
}

export default GetBanks;