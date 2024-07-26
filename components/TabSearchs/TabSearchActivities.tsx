import React, { useEffect, useState } from 'react';
import { IconArrowDown, IconMap } from '@/assets/icons';

import styles from './TabSearchs.module.css';

import TagManager from "react-gtm-module";
import { getDictionary } from '@/dictionaries';
import { useParams, useRouter } from 'next/navigation';
import TabSearchRepository from '@/core/TabSearchRepository';
import TabSearchCollection from '@/core/TabSearch';
import IdChannelRepository from '@/core/IdChannelRepository';
import IdChannelCollection from '@/core/IdChannel';
import { parseCookies, setCookie } from 'nookies';

const TabSearchActivities = () => {
  const repo: TabSearchRepository = new TabSearchCollection;
  const repoChannel: IdChannelRepository = new IdChannelCollection();

  const cookies = parseCookies();

  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [tours, setTours] = useState<any>(null);
  const [locations, setLocations] = useState<any>('');
  const [isOpen, setIsOpen] = useState<any>(false);
  const [searchValue, setSearchValue] = useState<any>('');
  const [valueSelect, setValueSelect] = useState<any>(null);
  const [dic, setDic] = useState<any>(null);
  const searchParams = useParams();

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'tabSearchs');
      setDic(dictionary);
    };

    fetchDictionary();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function searchTours(channel: number) {
    const lng = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : "BR";

    repo.getTabSearch(searchTerm, lng, channel).then((result) => {
      if (result instanceof Error) {
        const message = JSON.parse(result.message)
        //setConectionError(true);
        //setErrorMessage(message?.errors.length > 0 ? message?.errors.length : ['Erro desconhecido - Entre em contato com o Suporte'])
      } else {
        if (tours === null) {
          setTours(result.data);
          getLocations(result.data);
          setIsOpen(true);
        }
      }
    });
  }

  const handleIdChannel = () => {
    if (!cookies.idCanal) {
      repoChannel.getFiltered('site').then((result:any) => {
        if (result instanceof Error) {
          const message = JSON.parse(result.message)
          //setConectionError(true);
          //setErrorMessage(message?.errors.length > 0 ? message?.errors.length : ['Erro desconhecido - Entre em contato com o Suporte'])
        } else {
          setCookie(null, 'idCanal', result.data, {
            maxAge: (60 * 10), //expira em 10 minutos (60 * 10)
            path: '/',
          });
          searchTours(result.data);
        }
      });
    } else {
      searchTours(+cookies.idCanal);
    }
  }

  function getLocations(data: any) {
    var aux: any = [];

    data?.forEach((element: any) => {
      if (!aux.includes(element.eventLocation)) {
        aux.push(element.eventLocation);
      }
    });

    setLocations(aux);
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
      handleIdChannel();
    } else if (searchValue.length < 3) {
      setIsOpen(false)
      setValueSelect(null)
    } else {
      ///momento do click
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const handleClickSearch = (city: any) => {
    if (valueSelect?.type === "tour") {
      if (valueSelect?.typeSearch === "TOUR") {
        router.push(`/tour/${valueSelect.slug}`);
      } else if (valueSelect?.typeSearch === "TICKET") {
        router.push(`/ticket/${valueSelect.slug}`);
      } else {
        router.push(`/combo/${valueSelect.code}`);
      }

      /* Tratar Ticket */
    } else if (valueSelect?.type === "city") {
      router.push(`/atividades/${valueSelect.slug}`);
    }
  };

  const clickEvent = () => { // Search Evento
    TagManager.dataLayer({
      dataLayer: {
        event: 'search',
        search_term: searchValue,
      }
    });
  }

  return (
    <div className={`block w-full px-5`} id="link1">
      <div className="grid grid-cols-12">
        {/*  Col 9 */}
        <div className="col-span-12 md:col-span-9 px-0 md:px-3">
          <div className={styles.input_group}>
            <div className={styles.input_group_prepend}>
              <span className={`${styles.input_group_text} py-0 py-md-2`}>
                {IconMap}
              </span>
            </div>
            <input
              type="text"
              value={searchValue}
              className={`${styles.input_search_text} form-control text-left py-1 py-md-2`}
              placeholder={dic?.activPlaceholder}
              data-input="search"
              aria-label="Destino"
              aria-describedby="tourDestino"
              autoComplete="off"
              id="tourDestino"
              onChange={handleChange}
              onFocus={handleFocus}
            />
            <div className={styles.input_group_append}>
              <span className={`${styles.input_group_text} py-0 py-md-2`}>
                {IconArrowDown}
              </span>
            </div>
            <div
              id="search-menu"
              style={{
                position: 'absolute',
                top: '100%',
                left: '0px',
                zIndex: 10,
                backgroundColor: '#fff',
                padding: '10px',
                width: '100%',
                color: '#000',
              }}
              className={
                isOpen === true
                  ? `${styles.bg_tab_search_menu} block`
                  : 'hidden'
              }
            >
              <div id="search-dataset-allCitys">
                <h5 className="league-name" style={{ fontSize: '16px' }}>
                  {dic?.cities}
                </h5>
                {locations?.length > 0
                  ? locations?.map((city: any, index: any) => (
                    <p
                      key={index}
                      onClick={handleClickCity}
                      style={{ cursor: 'pointer' }}
                      className="chooice tt-suggestion tt-selectable"
                      data-busca="city"
                      data-input="search"
                      //data-value="{city}"
                      data-city={city}
                    >
                      <span
                        className="result-info city"
                        style={{ fontSize: '18px' }}
                        data-city={city}
                        data-busca="city"
                      >
                        {city}
                      </span>
                    </p>
                  ))
                  : ''}
              </div>
              <div id="search-dataset-allTourNames">
                <h5 className="league-name" style={{ fontSize: '16px' }}>
                  {dic?.tour}
                </h5>
                {tours?.length > 0
                  ? tours?.map((tours: any, index: any) => (
                    <p
                      key={index}
                      onClick={handleClickTour}
                      style={{ cursor: 'pointer' }}
                      className="chooice tt-suggestion tt-selectable"
                      data-busca="tour"
                      data-input="search"
                      data-code={tours.productCode}
                      data-tour={tours.description}
                      data-slug={tours.slug}
                      data-type={tours.productType}
                    >
                      <span
                        className="content-text"
                        style={{ pointerEvents: 'none' }}
                      >
                        <span
                          className="result-info"
                          style={{ fontSize: '18px', pointerEvents: 'none' }}
                        >
                          <strong>{tours.description}</strong>
                        </span>
                        <div className="price-search">
                          {' '}
                          <small>a partir de</small>:{' '}
                          <span style={{ fontSize: '18px' }}>
                            R$ {tours?.price?.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </span>
                    </p>
                  ))
                  : ''}
              </div>
            </div>
          </div>
        </div>

        {/*  Col 3 */}
        <div className="col-span-12 md:col-span-3 px-0 md:px-1">
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
  );
};

export default TabSearchActivities;
