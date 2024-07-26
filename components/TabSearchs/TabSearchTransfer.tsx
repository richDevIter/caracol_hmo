import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { IconArrowDown, IconCalendar, IconMap } from '@/assets/icons';
import styles from './TabSearchs.module.css';


import AutoComplete from "react-google-autocomplete";
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { getDictionary } from '@/dictionaries';
import { useParams, usePathname, useRouter } from 'next/navigation';

const DynamicSingleCalendarTime = dynamic(
  () => import('../Calendar/SingleCalendarTime'),
  {
    ssr: true,
  }
);

const DynamicAutoComplete = dynamic(() => import('react-google-autocomplete'), {
    ssr: true,
  })

const TabSearchTransfer = (props: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useParams();

  const transferC2: any = localStorage.getItem("transferC2");
  const transferItemJSON = JSON.parse(transferC2);

  const [error, setError] = useState<boolean>(false);

  const [time, setTime] = useState<any>(pathname === "/transfers" ? `${transferItemJSON?.date} ${transferItemJSON?.time}` : "");

  const [num, setNum] = useState<any>(pathname === "/transfers" ? transferItemJSON?.numPeople : 1);
  const [origin, setOrigin] = useState<any>(pathname === "/transfers" ? transferItemJSON?.origin : "");
  const [destiny, setDestiny] = useState<any>(pathname === "/transfers" ? transferItemJSON?.destine : "");
  const [latOrigin, setLatOrigin] = useState<any>(pathname === "/transfers" ? transferItemJSON?.latOrigem : "");
  const [longOrigin, setLongOrigin] = useState<any>(pathname === "/transfers" ? transferItemJSON?.lngOrigem : "");
  const [latDestiny, setLatDestiny] = useState<any>(pathname === "/transfers" ? transferItemJSON?.latDestino : "");
  const [longDestiny, setLongDestiny] = useState<any>(pathname === "/transfers" ? transferItemJSON?.lngDestino : "");

  const [dic, setDic] = useState<any>(null);

  useEffect(() => {


    const fetchDictionary = async () => {
        const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'tabSearchs');
        setDic(dictionary);
    };

    fetchDictionary();

}, [searchParams.lng])

  function SetTransfersItem(item: any) {
    const getTransfers = localStorage.getItem("transferC2");
    let transfer = JSON.parse(getTransfers || '{}');
    transfer = item;
    localStorage.setItem("transferC2", JSON.stringify(transfer));

    router.push(`/${searchParams.lng}/transfers`);
    
    return true;
  }

  const addToTransfers = (itemOption: any) => {
    if(props.searchState !== undefined) {
      props.setSearchState(!props.searchState);
    }
    
    if (destiny === "" || origin === "") {
      setError(true)

    } else {
      const item = {
        date: time?.split(' ')[0],
        destine: destiny,
        latDestino: latDestiny,
        latOrigem: latOrigin,
        lngDestino: longDestiny,
        lngOrigem: longOrigin,
        numPeople: num,
        origin: origin,
        time: time?.split(' ')[1]
      }

      SetTransfersItem(item);
    }
  }

  function less() {
    if (num > 1) {
      setNum(num - 1)
    }
  }

  function more() {
    setNum(num + 1)
  }

  const destinyTransfer = () => {
    return(
    <DynamicAutoComplete
      className={`${styles.bg_tab_autocomplete} `}
      options={{
        types: ["establishment"],
        fields: ["name"],
      }}
      defaultValue={destiny}
      apiKey="AIzaSyBv2aZ2YO_aW4PIEmXoxHgxC8Ps8DB0o-s"
      onPlaceSelected={(place) => {
        setDestiny(place.name);
        setError(false);
        // eslint-disable-next-line no-lone-blocks
        {
          geocodeByAddress(`${place.name}`)
            .then((results) =>
              getLatLng(results[0])
            )
            .then(({ lat, lng }) => {
              setLatDestiny(lat);
              setLongDestiny(lng);
            });
        }
      }}
    />
    )
  }

  const originTransfer = () => {
    return(
    <AutoComplete
      className={`${styles.bg_tab_autocomplete} `}
      options={{
        types: ["establishment"],
        fields: ["name"],
      }}
      defaultValue={origin}
      //placeholder={dic.selectOrigin}
      apiKey="AIzaSyBv2aZ2YO_aW4PIEmXoxHgxC8Ps8DB0o-s"
      onPlaceSelected={(place) => {
        setOrigin(place.name);
        setError(false);
        // eslint-disable-next-line no-lone-blocks
        {
          geocodeByAddress(`${place.name}`)
            .then((results) =>
              getLatLng(results[0])
            )
            .then(({ lat, lng }) => {
              setLatOrigin(lat);
              setLongOrigin(lng);
            });
        }
      }}
    />
    )
  }

  return (
    <div className={'block w-full px-5'} id="link2">
      <div className="grid grid-cols-12 md:gap-6 lg:gap-0">
        {/*  Col 9 */}
        <div className="col-span-12 lg:col-span-6">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 px-0 md:px-3">
              <div className={styles.input_group}>
                <div className={styles.input_group_prepend}>
                  <span className={`${styles.input_group_text} py-0 py-md-2`}>
                    {IconMap}
                  </span>
                </div>
                {originTransfer()}
                <div className={styles.input_group_append}>
                  <span className={`${styles.input_group_text} py-0 py-md-2`}>
                    {IconArrowDown}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 px-0 md:px-3">
              <div className={styles.input_group}>
                <div className={styles.input_group_prepend}>
                  <span className={`${styles.input_group_text} py-0 py-md-2`}>
                    {IconMap}
                  </span>
                </div>
                {destinyTransfer()}
                <div className={styles.input_group_append}>
                  <span className={`${styles.input_group_text} py-0 py-md-2`}>
                    {IconArrowDown}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-10 lg:col-span-4">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-8 px-0 md:px-3">
              <div className={styles.input_group}>
                <div className={styles.input_group_prepend}>
                  <span className={`${styles.input_group_text} py-0 py-md-2`}>
                    {IconCalendar('#034C43', '24px', '24px')}
                  </span>
                </div>
                <DynamicSingleCalendarTime setTime={setTime} />
                <div className={styles.input_group_append}>
                  <span className={`${styles.input_group_text} py-0 py-md-2`}>
                    {IconArrowDown}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 px-0 md:px-3">
              <div className={styles.input_group}>
                <div className={styles.input_group_prepend}>
                  <button
                    className={`${styles.bg_tab_btn_count} btn btn-less`}
                    type="button"
                    onClick={less}
                  >
                    -
                  </button>
                </div>
                {/* <div className={`${styles.bg_tab_icon_male}`}>
                              {IconMale}
                            </div> */}
                <input
                  type="text"
                  className={`${styles.bg_tab_count} py-1 py-md-2 px-4`}
                  placeholder=""
                  aria-label="Username"
                  value={num}
                  disabled
                />
                <div className={styles.bg_tab_btn_count_append}>
                  <button
                    className={`${styles.bg_tab_btn_count} btn btn-more`}
                    type="button"
                    onClick={more}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  Col 3 */}
        <div className="col-span-12 md:col-span-2 px-0 md:px-1">
          <div className="px-0 px-md-3">
            <button
              type="button"
              data-btn="search"
              id="button-search"
              className={`${styles.bg_tab_search_btn} btn btn-primary btn-default rounded-full`}
              onClick={addToTransfers}
            >
              {dic?.fndTransfer}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabSearchTransfer;
