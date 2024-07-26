import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styles from './DestPoints.module.css';

export interface propPlus {
  propsField: any,
  propsLabel?: any,
  propsErrors: any,
  defaultValue?: any,
  setValue?: any
};

const GetStates: React.FC<propPlus> = ({
  propsField, propsLabel, propsErrors, defaultValue = null, setValue
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
    const token = localStorage.getItem('GroupId') || '{}';

    async function listStates() {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/DropDown/GetStates`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
          })
          const statesResp = await resp.json();
          setInfo(statesResp.data);
    }
    listStates();
  }, []);

  useEffect(()=>{
    if(info !== null){
      setValue('state', info.find((elem: any) => elem.id === defaultValue));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[info])
  
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
            placeholder={'Estado'}
            options={Array.from(info)}
            getOptionLabel={(option: any) => `${option.description}`}
            getOptionValue={(option: any) => `${option.id}`}
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

export default GetStates;