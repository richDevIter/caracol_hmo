'use client'

import React, { useEffect, useState } from 'react';
import Card from '../base/Card/Card';

import styles from './ActivitiesCard.module.css';

import NotImage from '../../assets/img/no-image-default.png';

import {
  IconCalendar,
  IconCheckCircle,
  IconClock,
  IconMapMarkerAlt,
  IconVerticalEllipsis,
  IconXMark,
} from '@/assets/icons';

import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';


export interface propActivity {
  concluded?: any;
  item?: any;
  getVoucher?: any;
  cancelReservation?: any;
  setModalShow?: any;
  setReservation?: any;
}

const ActivitiesCard: React.FC<propActivity> = ({
  concluded = false,
  item,
  getVoucher,
  cancelReservation,
  setModalShow,
  setReservation,
}: propActivity) => {


    const searchParams = useParams();

    const lang = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : "BR";

    const [dic, setDic] = useState<any>(null);

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'myActivities');
            setDic(dictionary);
        };
        fetchDictionary();
    }, [searchParams.lng])


  const [isOpen, setIsOpen] = useState<boolean>(false);

    function convertDate(cell: any, isHour: any = false) {
    
      var date = cell.split('T')[0].split("-").reverse().join("/")
      var hours = cell.split('T')[1].slice(0, 5)
    
      if (isHour === true) {
        return <>{hours}</>;
      } else {
        return <>{date}</>;
      }
    }

    function isConfirmedOrCanceled(tour:any){
      if(tour?.status === 1){
        return dic?.card.confirmed
      }else{
        return <span style={{color: "black"}} >{dic?.card.canceled}</span>
      }
    }
 
    return (
      <>
        <Card>
          <div className={styles.header}>
            <div className="grid md:grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-2">
                <div
                  className={styles.photo}
                  style={{ backgroundImage: `url(${NotImage.src})` }}
                ></div>
              </div>
              <div className={`col-span-10`}>
                <div className={`flex ${styles.maped}`}>
                  {IconMapMarkerAlt('#034C43', 24, 24)}
                  <p className="ml-2">Rio de Janeiro</p>
                </div>
                <div className={`${styles.description} grid grid-cols-12 gap-4`}>
                  <div className="col-span-12 md:col-span-9">
                    <h4 className="">{item.productName}</h4>
                    <div className="grid grid-cols-12">
                      <div
                        className={`flex mr-6 items-center col-span-12 min-[520px]:col-span-6 md:col-span-5`}
                      >
                        {IconCalendar('#034C43', 24, 24)}
                        <span>
                          {dic?.card.date} {convertDate(item.startTimeLocal)}
                        </span>
                      </div>
                      <div className="flex items-center sm:justify-end col-span-12 min-[520px]:col-span-6 md:col-span-5">
                        {IconClock('#034C43', 24, 24)}
                        <span>
                          {dic?.card.activityStart}{' '}
                          {convertDate(item.startTimeLocal, true)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`col-span-12 md:col-span-3 flex justify-between md:justify-start md:flex-col`}
                  >
                    <div className={`${styles.price}`}>
                      <span className="mr-4">
                        {item.amount.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </span>
                      {!concluded && (
                        <>
                          <span
                            className="btn p-0"
                            onClick={() => setIsOpen(!isOpen)}
                          >
                            {IconVerticalEllipsis}
                          </span>
                          {isOpen && (
                            <div className="relative inline-block text-left">                            
                              <div
                              style={{backgroundColor: "#F6F5F8"}}
                                className={
                                  isOpen === true
                                    ? 'absolute right-0 z-10 mt-4 mr-3 w-max origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                                    : 'hidden'
                                }
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="menu-button"
                                tabIndex={-1}
                              >
                                <div className="font-semibold" role="none" >
                                  <button
                                    className="text-gray-700 block mx-4 my-3 text-sm"
                                    role="menuitem"
                                    tabIndex={-1}
                                    id="menu-item-0"
                                    onClick={() => { getVoucher(item.idNewItems) }}
                                  >
                                    Download Voucher
                                  </button>
                                  {item.status === 1 ?
                                  <button
                                    className="text-gray-700 block mx-4 my-3 text-sm"
                                    role="menuitem"
                                    tabIndex={-1}
                                    id="menu-item-1"
                                    onClick={() => 
                                      {
                                        setModalShow(true)
                                        setReservation(item)
                                        cancelReservation(item)
                                      }
                                    }
                                  >
                                    Cancelar
                                  </button>
                                  :
                                  <></>}
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    <div
                      className={
                        concluded === false
                          ? `${styles.checked} md:text-right order-first md:order-last`
                          : `${styles.concluded} md:text-right order-first md:order-last`
                      }
                    >
                      <span className="md:align-text-bottom">
                        {item.status === 1 ? 
                          <>{IconCheckCircle}</>
                        :
                          <>{IconXMark(30,30)}</>
                        }
                      </span>
                      <span className="text-right mr-4">
                        {concluded === true
                          ? `${dic?.card.concluded}`
                          : isConfirmedOrCanceled(item)
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <p style={{ color: '#2A2146' }}>
              <strong>{dic?.card.cancellation}</strong>
            </p>
            <p>
              {dic?.card.upTo} <strong>{dic?.card.refund}</strong>.
            </p>
          </div>
        </Card>
      </>
    );
};

export default ActivitiesCard;
