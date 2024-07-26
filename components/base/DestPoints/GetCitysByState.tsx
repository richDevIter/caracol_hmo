import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styles from './DestPoints.module.css';

export interface propPlus {
  propsField: any,
  propsErrors: any,
  uf: any,
  defaultValue?: any,
  setValue?: any
};

const GetCitysByState: React.FC<propPlus> = ({
  propsField, propsErrors, uf, defaultValue = null, setValue
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

    async function listCities() {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/DropDown/GetCitysByState/${uf}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      const citiesResp = await resp.json();
      setInfo(citiesResp.data);
    }

    if (uf) {
      listCities();
    }
  }, [uf]);

  /* useEffect(() => {
    const token = localStorage.getItem('GroupId') || '{}';
    const config = {
      headers: { 'Authorization': `Bearer ${token}` },
    };
    async function listCity() {
      try {
        const { data } = await api.get(`/DropDown/GetCitysByState/${uf}`, config);
        if (data.status !== 400) {
          setInfo(data.data);
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          window.location.href = window.location.origin + '/';
        }
      }
    }

    if(uf !== undefined){
        listCity();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uf]); */

  useEffect(() => {
    if (info !== null && defaultValue !== null) {
      setValue('city', info.find((elem: any) => elem.description === defaultValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info, defaultValue])

  if (info !== null) {
    return (
      <>
        <div className={propsErrors.city !== undefined ? "endpoint-error" : ""}>
          <Select
            {...propsField}
            aria-labelledby="aria-label"
            inputId="aria-example-input"
            aria-invalid={propsErrors?.city ? "true" : ""}
            name="aria-live-color"
            onMenuOpen={onMenuOpen}
            onMenuClose={onMenuOpen}
            as="select"
            variant="standard"
            margin="normal"
            placeholder={'Cidade'}
            options={Array.from(info)}
            getOptionLabel={(option: any) => `${option.description}`}
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        <select className={`${styles.form_control} form-custom`}>
          <option value='' disabled></option>
        </select>
      </>
    )

  }
}

export default GetCitysByState;