import React, { useEffect, useState } from 'react';
import Select from 'react-select';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import imgDirection from '../../assets/icons/bx_map.svg'
import { IconMap } from '../../../assets/icons';
import useAppData from '@/data/hooks/useCartData';

export interface propPlus {
  propsId: number;
  actionPickup: any;
  alert: any;
  index?: any;
  comboObjectIndex?: number | null;
}

const GetPickups: React.FC<propPlus> = ({
  propsId, actionPickup, alert, index, comboObjectIndex = null
}: propPlus) => {
  

  const { cart } = useAppData();

  const [info, setInfo] = useState<any>(null);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const [check, setCheck] = useState<any>(true);

  const onMenuOpen = () => {
    if (isMenuOpen === false) {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('GroupId') || '{}';

    async function listPickups() {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/Pickup/GetListByIdStrangerToCheckOutAsync/${propsId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
          })
          const pickupResp = await resp.json();
          setInfo(pickupResp.data);
    }
    listPickups();
  }, [propsId /*  */]);

  const handleChange = (options: any) => {
    if(comboObjectIndex !== null){ //combo
      actionPickup(options, index, comboObjectIndex);
    } else { //tour x ticket
      actionPickup(options, index);
    }
    //actionPickup(options, index, false);
    setCheck(false)
  };

  if (info !== null) {
    return (
      <>
        <div style={{ position: "relative" }}>
          {/* <img className="pickup-icon" src={imgDirection} alt="icon map" /> */}
          <span className="pickup-icon">{IconMap}</span>

          {
            cart.dados[index].pickupInfo === undefined
              ?
              <>
                <Select
                  aria-labelledby="aria-label"
                  inputId="aria-example-input"
                  className=""
                  name="aria-live-color"
                  placeholder="Selecione"
                  onMenuOpen={onMenuOpen}
                  onMenuClose={onMenuOpen}
                  onChange={handleChange}
                  options={Array.from(info)}
                  getOptionLabel={(option: any) => `${option.name}: ${option.address}`}
                />
                {
                  check === true
                    ?
                    alert
                    :
                    ""
                }
              </>
              :
              <Select
                aria-labelledby="aria-label"
                inputId="aria-example-input"
                className=""
                name="aria-live-color"
                placeholder="Selecione"
                onMenuOpen={onMenuOpen}
                onMenuClose={onMenuOpen}
                onChange={handleChange}
                options={Array.from(info)}
                getOptionLabel={(option: any) => `${option.name}: ${option.address}`}
                defaultValue={{
                  "id": cart.dados[index].pickup,
                  "name": `${cart.dados[index].pickupInfo.name}: ${cart.dados[index].pickupInfo.address}`
                }}
              />
          }
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
};

export default GetPickups;
