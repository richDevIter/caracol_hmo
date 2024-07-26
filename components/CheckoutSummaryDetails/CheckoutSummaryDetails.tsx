
import React, { Key, useEffect, useState } from 'react'
import SimpleAlert from '../base/SimpleAlert/SimpleAlert';
import CheckoutCupom from '../CheckoutCupom/CheckoutCupom';

import styles from './CheckoutSummaryDetails.module.css';
import { IconTimes } from '@/assets/icons';
import useAppData from '@/data/hooks/useCartData';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

// useRouter
import { useRouter } from 'next/navigation'
export interface propFilter {
  setAlert?: any;
}

const CheckoutSummaryDetails: React.FC<propFilter> = ({
  setAlert
}: propFilter) => {

  const { cart, removeCupomCart } = useAppData();

  const [dic, setDic] = useState<any>(null);
  const searchParams = useParams();

  useEffect(() => {
      const fetchDictionary = async () => {
          const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'cart');
          setDic(dictionary);
      };
  
      fetchDictionary();
  
  }, [searchParams.lng])

  const lng = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : 'BR';

  let totalCart: any = 0;
  const router = useRouter()

  function ActionCheckout() {
    var vali = true;
    // eslint-disable-next-line array-callback-return
    cart.dados.map((cItem: any, index: any) => {
      if (cItem.productType === 1) {
        if (cItem.typePickup === "1") {
          if (cItem.pickup === 0) {
            vali = false
          }
        }
      }
    });

    if (vali === true) {
      //window.location.href = '/checkout';
      router.push('/checkout');
      setAlert(null)
    } else {
      setAlert(
        <SimpleAlert alertType={"danger py-1 px-2 my-1"}>
          {dic?.boardingLocalAlert}
        </SimpleAlert>
      )
      setTimeout(() => setAlert(null), 2000);
    }
  }

  return (
    <div className="payment-details bg-white rounded-xl p-6">
      <div>
        {cart?.dados.length > 0 ?
          cart?.dados.map((item: any, index: Key) => {
            let priceProduct = (
              (Number(item.adults) * Number(item.priceAdults))
              + (Number(item.childs) * Number(item.priceChilds))
              + (Number(item.infants) * Number(item.priceInfants))
              + (Number(item.elders) * Number(item.priceElders))
              + (Number(item.student) * Number(item.priceStudent))
              + (Number(item.globalPeople)) * (Number(item.priceGlobalPeople))
            );

            totalCart = Number(totalCart) + (priceProduct - (priceProduct * (item.discount / 100)));

            return (
              <>
                <div className='map-unit' key={index}>
                  <div className="flex justify-between mb-2">
                    <div className={styles.product_name}>
                      <h6>
                        {
                          lng === "BR"
                            ?
                            item.productNameBR
                            :
                            lng === "EN"
                              ?
                              item.productNameEN
                              :
                              lng === "ES"
                                ?
                                item.productNameES
                                :
                                item.productName
                        }
                      </h6>
                    </div>
                    <div>
                      <h6>{`${Number(priceProduct).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}</h6>
                    </div>
                  </div>
                </div>
              </>
            )
          })
          :
          <></>
        }
        <div className='grid grid-cols-12'>
          <div className='col-span-12'>
            <div className="border-b my-3"></div>
          </div>
        </div>
        <div className='flex w-full'>
          <div className="text-primary w-full">
            <CheckoutCupom />
          </div>
        </div>
        <div className='grid grid-cols-12'>
          <div className='col-span-12'>
            <div className="border-b mt-3 mb-0"></div>
          </div>
        </div>
        <div className=''>
          <div>
            {
              cart?.cupom?.type === 2
                ?
                <>
                  <div className="bg-cupom-value">
                    <div className="flex justify-between w-100">
                      <small className="flex justify-between align-items-center">
                        <p className='mb-0'>
                          {cart.cupom.codeName}
                        </p>
                      </small>
                      <small className='flex items-center text-right'>
                        <span className='mb-0'>
                          {cart.cupom.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                        </span>
                        <span className='exclude-cupom'
                          onClick={() => removeCupomCart?.()}
                        >
                          <span style={{ marginLeft: "6px" }} className='flex'>{IconTimes("16px", "16px")}</span>
                        </span>
                      </small>
                    </div>
                  </div>
                  <div className={`${styles.bg_cart_price_total} pt-0`}>
                    <div>
                      <p>{dic?.subtotal}</p>
                    </div>
                    <div>
                      <p>
                        R$
                        <b>{Number(cart.totalCart).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).split('R$')[1]}</b>
                      </p>
                    </div>
                  </div>
                </>
                :
                cart?.cupom?.type === 4
                  ?
                  <>
                    <div className="flex justify-between my-3">
                      <small className="flex place-between items-center">
                        <p className='mb-0'>
                          {cart.cupom.codeName}
                        </p>
                      </small>
                      <small className='flex items-center text-right'>
                        <span className='mb-0'>{cart.cupom.value}%</span>
                        <span className='exclude-cupom' style={{ cursor: "pointer" }}
                          onClick={() => removeCupomCart?.()}
                        >
                          <span style={{ marginLeft: "6px" }} className='flex'>{IconTimes("16px", "16px")}</span>
                        </span>
                      </small>
                    </div>
                    <div className={`${styles.bg_cart_price_total} pt-0`}>
                      <div>
                        <p>{dic?.subtotal}</p>
                      </div>
                      <div>
                        <p>
                          R$
                          <b>{Number(cart.totalCart).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).split('R$')[1]}</b>
                        </p>
                      </div>
                    </div>
                  </>
                  :
                  <div className={`${styles.bg_cart_price_total} flex justify-between `}>
                    <div>
                      <p>{dic?.subtotal}</p>
                    </div>
                    <div>
                      <p>
                        R$
                        <b>{Number(cart.totalCart).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).split('R$')[1]}</b>
                      </p>
                    </div>
                  </div>
            }
          </div>
        </div>
        <div className='grid grid-cols-12'>
          <div className="col-span-12 mt-3">
            <div>
              <button className="btn btn-primary w-full text-light" onClick={ActionCheckout}>
                {dic?.purchaseFinal}
              </button>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-12'>
          <div className='col-span-12'>
            <div className="border-b my-3"></div>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-2">
          <div className='col-span-12'>
            <div className="cancel-summary">
              <h6>{dic?.freeCancel}</h6>
              <p>{dic?.twentyFourHours}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSummaryDetails