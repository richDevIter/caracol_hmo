import React, { useEffect, useState } from 'react'
import { IconMap, IconArrowDown, IconCalendar, IconSearchActivity, IconSearchTransfer, IconMale } from '@/assets/icons';
import Script from "next/script"


import TagManager from "react-gtm-module";

import AutoComplete from "react-google-autocomplete";
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

import styles from './TabSearchs.module.css';
import dynamic from 'next/dynamic';
import useWindowUrl from '@/data/hooks/useWindowUrl';
import useWindowSize from '@/data/hooks/useWindowSize';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

const DynamicSingleCalendarTime = dynamic(() => import('../Calendar/SingleCalendarTime'), {
  ssr: true,
})

const DynamicAutoComplete = dynamic(() => import('react-google-autocomplete'), {
  ssr: true,
})


const TabSearchs = (props:any) => {
  return (
      <Tabs setSearchState={props.setSearchState} searchState={props.searchState}/>
  )
}

const Tabs = (props:any) => {
  const router = useRouter();

  const transferC2: any = localStorage.getItem("transferC2");
  const transferItemJSON = JSON.parse(transferC2);

  const [openTab, setOpenTab] = React.useState(1);
  const [dic, setDic] = useState<any>(null);

  const url = useWindowUrl();

  const searchParams = useParams();
  const pathname = usePathname();

  const size = useWindowSize();

  useEffect(() => {
      const fetchDictionary = async () => {
          const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'tabSearchs');
          setDic(dictionary);
      };
  
      fetchDictionary();
  
  }, [searchParams.lng])

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tours, setTours] = useState<any>("");
  const [locations, setLocations] = useState<any>("");
  const [isOpen, setIsOpen] = useState<any>(false);
  const [searchValue, setSearchValue] = useState<any>('');
  const [valueSelect, setValueSelect] = useState<any>(null);

  const [error, setError] = useState<boolean>(false);

  const [num, setNum] = useState<any>(pathname === "/transfers" ? transferItemJSON?.numPeople : 1);
  const [origin, setOrigin] = useState<any>(pathname === "/transfers" ? transferItemJSON?.origin : "");
  const [destiny, setDestiny] = useState<any>(pathname === "/transfers" ? transferItemJSON?.destine : "");
  const [latOrigin, setLatOrigin] = useState<any>(pathname === "/transfers" ? transferItemJSON?.latOrigem : "");
  const [longOrigin, setLongOrigin] = useState<any>(pathname === "/transfers" ? transferItemJSON?.lngOrigem : "");
  const [latDestiny, setLatDestiny] = useState<any>(pathname === "/transfers" ? transferItemJSON?.latDestino : "");
  const [longDestiny, setLongDestiny] = useState<any>(pathname === "/transfers" ? transferItemJSON?.lngDestino : "");

  const [time, setTime] = useState<any>(pathname === "/transfers" ? `${transferItemJSON?.date} ${transferItemJSON?.time}` : "");

  function getLocations(data: any) {
    var aux: any = [];

    data?.forEach((element: any) => {
      if (!aux.includes(element.eventLocation)) {
        aux.push(element.eventLocation);
      }
    });

    setLocations(aux);
  }

  async function searchTours() {
    const lng = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : "BR";
    const data = {
      term: searchTerm,
      channel: 3,
      lang: lng,
      ProductType: 0,
    }

    const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/Products/SearchByChannel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    })
    const serachResp = await resp.json();
    setTours(serachResp.data);
    getLocations(serachResp.data);
    setIsOpen(true);
  }

  const handleFocus = () => {
    if (searchValue.length >= 2) {
      setIsOpen(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    setSearchTerm(newValue);
  };

  const convertToSlug = (text: any) => {
    const a = 'àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
    const b = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return text?.toString().toLowerCase().trim()
      .replace(p, (c: any) => b.charAt(a.indexOf(c))) // Replace special chars
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[\s\W-]+/g, '-') // Replace spaces, non-word characters and dashes with a single dash (-)
  }

  const handleClickCity = (event: React.MouseEvent<HTMLElement>) => {
    var element = (event.target as HTMLButtonElement).dataset.city;
    var typeE = (event.target as HTMLButtonElement).dataset.busca;
    setSearchValue(element);
    const tourSelect = {
      slug: convertToSlug(element?.split(",")[0].split("-")[0]),
      type: typeE
    };

    setValueSelect(tourSelect);
    setIsOpen(false);
  };

  const handleClickTour = (event: React.MouseEvent<HTMLElement>) => {
    var element = (event.target as HTMLButtonElement).dataset.tour;
    var slug = (event.target as HTMLButtonElement).dataset.slug;
    var type = (event.target as HTMLButtonElement).dataset.type;
    var typeE = (event.target as HTMLButtonElement).dataset.busca;
    var codeE =
      (event.target as HTMLButtonElement).dataset.busca === "tour"
        ? (event.target as HTMLButtonElement).dataset.code
        : null;

    setSearchValue(element);
    const tourSelect = {
      slug: slug,
      type: typeE,
      code: codeE,
      typeSearch: type
    };
    setValueSelect(tourSelect);
    setIsOpen(false);
  };

  useEffect(() => {
    if (searchValue.length >= 3 && valueSelect === null) {
      searchTours();
    } else if (searchValue.length < 3) {
      setIsOpen(false)
      setValueSelect(null)
    } else {
      ///momento do click
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  function less() {
    if (num > 1) {
      setNum(num - 1)
    }
  }

  function more() {
    setNum(num + 1)
  }

  /*   const clickEvent = () => { // Search Evento
  
      TagManager.dataLayer({
        dataLayer: {
          event: 'search',
          search_term: searchValue,
        }
      });
    } */

  const handleClickSearch = (city: any) => {
    if (valueSelect?.type === "tour") {
      /* Tratar Ticket */

      if (valueSelect?.typeSearch === "TOUR") {
          router.push(`/tour/${valueSelect.slug}`);
      } else if (valueSelect?.typeSearch === "TICKET") {
          router.push(`/ticket/${valueSelect.slug}`);
      }

      /* Tratar Ticket */
    } else if (valueSelect?.type === "city") {
        router.push(`/atividades/${valueSelect.slug}`);
    }
  };

  useEffect(() => {
    if (url.split("/")[4] === "transfers") {
      setOpenTab(2);
    }
  }, [url])

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

  const clickEvent = () => { // Search Evento
    TagManager.dataLayer({
      dataLayer: {
        event: 'search',
        search_term: searchValue,
      }
    });
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
      //placeholder={`${t('activPlaceholder')}`}
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
      //placeholder={`${t('selectOrigin')}`}
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
      <div className="w-full px-3 md:px-0">
        <div
          className={` ${styles.nav_tabs} "flex mb-0 list-none flex-wrap flex-row`}         
        >
          <div className="last:mr-0 flex-auto text-center h-full">
            <a
              className={
                `${styles.bg_tab_options_activity} h-full px-5 py-3 leading-normal flex items-center justify-center ` +
                (openTab === 1
                  ? "bg-white"
                  : "bg-slate-200")
              }
              onClick={e => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#link1"
            >
              <span>
                {size.width > 767 ? (
                  <>
                    {IconSearchActivity("#000000", "24px", "24px")}
                  </>
                ) : (
                  ""
                )}
                {dic?.activity}
              </span>
            </a>
          </div>
          <div className="-mb-px mr-2 last:mr-0 flex-auto text-center h-full">
            <a
              className={
                `${styles.bg_tab_options_transfer} h-full px-5 py-3 leading-normal flex items-center justify-center ` +
                (openTab === 2
                  ? "bg-white"
                  : "bg-slate-200")
              }
              onClick={e => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle="tab"
              href="#link2"
            >
              <span>
                {size.width > 767 ? (
                  <>
                    {IconSearchTransfer}
                  </>
                ) : (
                  ""
                )}
                {dic?.transfers}
              </span>
            </a>
          </div>
        </div>
        <div className={`${styles.bg_tab_options_content} relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded`}>
          <div className="flex-auto">
            <div className={` ${styles.tab_space} flex items-center w-full`}>
              <div className={openTab === 1 ? `block w-full px-5` : "hidden w-full"} id="link1">
                <div className="grid grid-cols-12">
                  {/*  Col 9 */}
                  <div className='col-span-12 md:col-span-9 px-0 md:px-3'>
                    <div className={styles.input_group}>
                      <div className={styles.input_group_prepend}>
                        <span
                          className={`${styles.input_group_text} py-0 py-md-2`}
                        >
                          {IconMap}
                        </span>
                      </div>
                      <input
                        type="text"
                        value={searchValue}
                        className={`${styles.input_search_text} form-control text-left py-1 py-md-2`}
                        //placeholder={`${t( "activPlaceholder")}`}
                        data-input="search"
                        aria-label="Destino"
                        aria-describedby="tourDestino"
                        autoComplete="off"
                        id="tourDestino"
                        onChange={handleChange}
                        onFocus={handleFocus}
                      />
                      <div className={styles.input_group_append}>
                        <span
                          className={`${styles.input_group_text} py-0 py-md-2`}
                        >
                          {IconArrowDown}
                        </span>
                      </div>
                      <div
                        id="search-menu"
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "0px",
                          zIndex: 10,
                          backgroundColor: "#fff",
                          padding: "10px",
                          width: "100%",
                          color: "#000",
                        }}
                        className={isOpen === true ? `${styles.bg_tab_search_menu} block` : "hidden"}
                      >
                        <div id="search-dataset-allCitys">
                          <h5
                            className="league-name"
                            style={{ fontSize: "16px" }}
                          >
                            {dic?.cities}
                          </h5>
                          {locations?.length > 0
                            ? locations?.map((city: any, index: any) => (
                              <p
                                key={index}
                                onClick={handleClickCity}
                                style={{ cursor: "pointer" }}
                                className="chooice tt-suggestion tt-selectable"
                                data-busca="city"
                                data-input="search"
                                //data-value="{city}"
                                data-city={city}
                              >
                                <span
                                  className="result-info city"
                                  style={{ fontSize: "18px" }}
                                  data-city={city}
                                  data-busca="city"
                                >
                                  {city}
                                </span>
                              </p>
                            ))
                            : ""}
                        </div>
                        <div id="search-dataset-allTourNames">
                          <h5
                            className="league-name"
                            style={{ fontSize: "16px" }}
                          >
                            {dic?.tour}
                          </h5>
                          {tours?.length > 0
                            ? tours?.map((tours: any, index: any) => (
                              <p
                                key={index}
                                onClick={handleClickTour}
                                style={{ cursor: "pointer" }}
                                className="chooice tt-suggestion tt-selectable"
                                data-busca="tour"
                                data-input="search"
                                data-code={tours.productCode}
                                data-tour={tours.description}
                                data-slug={tours.slug}
                                data-type={tours.productType}
                              >
                                <span className="content-text" style={{ pointerEvents: "none" }}>
                                  <span
                                    className="result-info"
                                    style={{ fontSize: "18px", pointerEvents: "none" }}

                                  >
                                    <strong>
                                      {tours.description}
                                    </strong>
                                  </span>
                                  <div className="price-search">
                                    {" "}
                                    <small>a partir de</small>:{" "}
                                    <span
                                      style={{ fontSize: "18px" }}
                                    >
                                      R${" "}
                                      {tours.price
                                        .toFixed(2)
                                        .replace(".", ",")}
                                    </span>
                                  </div>
                                </span>
                              </p>
                            ))
                            : ""}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*  Col 3 */}
                  <div className='col-span-12 md:col-span-3 px-0 md:px-1'>
                    <div className="px-0 md:px-1">
                      <button
                        type="button"
                        data-btn="search"
                        id="button-search-activities"
                        className={`${styles.bg_tab_search_btn} btn btn-primary btn-default rounded-full`}
                        onClick={(e: any) => {
                          clickEvent();
                          handleClickSearch(e);
                        }}
                      >
                        {dic?.fndActiv}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={openTab === 2 ? "block w-full px-5" : "hidden w-full"} id="link2">
                <div className="grid grid-cols-12">
                  {/*  Col 9 */}
                  <div className='col-span-12 md:col-span-6'>
                    <div className="grid grid-cols-12">
                      <div className='col-span-12 md:col-span-6 px-0 md:px-3'>
                        <div className={styles.input_group}>
                          <div className={styles.input_group_prepend}>
                            <span
                              className={`${styles.input_group_text} py-0 py-md-2`}
                            >
                              {IconMap}
                            </span>
                          </div>
                          {originTransfer()}
                          <div className={styles.input_group_append}>
                            <span
                              className={`${styles.input_group_text} py-0 py-md-2`}
                            >
                              {IconArrowDown}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='col-span-12 md:col-span-6 px-0 md:px-3'>
                        <div className={styles.input_group}>
                          <div className={styles.input_group_prepend}>
                            <span
                              className={`${styles.input_group_text} py-0 py-md-2`}
                            >
                              {IconMap}
                            </span>
                          </div>
                          {destinyTransfer()}
                          <div className={styles.input_group_append}>
                            <span
                              className={`${styles.input_group_text} py-0 py-md-2`}
                            >
                              {IconArrowDown}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='col-span-12 md:col-span-4'>
                    <div className="grid grid-cols-12">
                      <div className='col-span-12 md:col-span-8 px-0 md:px-3'>
                        <div className={styles.input_group}>
                          <div className={styles.input_group_prepend}>
                            <span
                              className={`${styles.input_group_text} py-0 py-md-2`}
                            >
                              {IconCalendar("#034C43", "24px", "24px")}
                            </span>
                          </div>
                          <DynamicSingleCalendarTime setTime={setTime} />
                          <div className={styles.input_group_append}>
                            <span
                              className={`${styles.input_group_text} py-0 py-md-2`}
                            >
                              {IconArrowDown}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='col-span-12 md:col-span-4 px-0 md:px-3'>
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
                  <div className='col-span-12 md:col-span-2 px-0 md:px-1'>
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
            </div>
          </div>
        </div>
      </div>
  )
}

export default TabSearchs