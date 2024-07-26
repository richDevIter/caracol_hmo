import React, { useEffect, useState } from "react";
import Select from 'react-select';
/* import api from "../../services/api";
import Select from 'react-select'; */

export interface propPlus {
  propsField: any;
  propsLabel: any;
  propsErrors: any;
}

const GetCountrys: React.FC<propPlus> = ({
  propsField,
  propsLabel,
  propsErrors,
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

    async function listCountries() {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/DropDown/GetCountrysWithShortName`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      const countiesResp = await resp.json();
      setInfo(countiesResp.data);
    }
    listCountries();
  }, []);

  if (info !== null) {
    return (
      <>
        <div className={propsErrors.city !== undefined ? "endpoint-error" : "endpoint"}>
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
            placeholder={'País'}
            options={Array.from(info)}
            getOptionLabel={(option: any) => `${option.description}`}
            getOptionValue={(option: any) => `${option.id}`}
          />
        </div>
        {/* <Form.Select
          //defaultValue={"BR"}
          style={{ padding: "8px 12px" }}
          {...propsField}
          required>
          <option value="" disabled>
            Selecione
          </option>
          {info.length > 0
            ? info.map((info: any, index: Key) => (
              <option key={index} value={info.id}>
                {info.description}
              </option>
            ))
            : ""}
        </Form.Select> */}
      </>
    );
  } else {
    return (
      <>
        <select>
          <option value="" disabled></option>
        </select>
      </>
    );
  }
};

export default GetCountrys;