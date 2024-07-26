import React, { useEffect, useState } from 'react';

import CheckoutCartCardTour from './CheckoutCartCardTour';
import CheckoutCartCardTransfer from './CheckoutCartCardTransfer';
import CheckoutCartCardTicket from './CheckoutCartCardTicket';

import styles from './CheckoutCartCard.module.css';
import useAppData from '@/data/hooks/useCartData';
import CheckoutCartCardComboOpen from './CheckoutCartCardComboOpen';
import CheckoutCartCardCombo from './CheckoutCartCardCombo';

export interface propFilter {
    item?: any;
    control?: any;
    errors?: any;
    alert?: any;
    index?: any;
    setUpdateCart: any;
    updateCart: any
}

const CheckoutCartCard: React.FC<propFilter> = ({
    item,
    control,
    errors,
    alert,
    index,
    setUpdateCart,
    updateCart
}) => {
    //const console = useConsoleLog;
    const { cart, updateDadosCart } = useAppData();

    const [pickupSelect, setPickupSelect] = useState<any>(null);

    const invertDate = (date: any) => {
        return date.split('-').reverse().join('/');
    };

    const addPickup = (objPickup: any, indexP: any, integration: any) => {
        setPickupSelect(objPickup.id);

        if (integration === true) {
            cart.dados[indexP].IdPickupDestino = objPickup.idPickupLocation;
            cart.dados[indexP].AntecedenciaPickupDestino = objPickup.minutesPrior;
            cart.dados[indexP].NomeListaPickupDestino = objPickup.nomeListaPickup;
            cart.dados[indexP].ListaPickupDestino = objPickup.pickupIdStranger;
            cart.dados[indexP].NomePickupDestino = objPickup.nomePickup;
        }

        cart.dados[indexP].pickup = objPickup.id;
        cart.dados[indexP].pickupInfo = objPickup;
        cart.dados[
            indexP
        ].meetingPoint = `${objPickup.name} - ${objPickup.address}`;

        updateDadosCart?.(cart.dados);
    };

    const addPickupCombo = (objPickup: any, indexP: any, comboObjectIndex: any) => {
        setPickupSelect(objPickup.id);

        cart.dados[indexP].comboObject[comboObjectIndex].idPickup = objPickup.id;
        cart.dados[indexP].comboObject[comboObjectIndex].pickupInfo = objPickup;
        cart.dados[indexP].comboObject[comboObjectIndex].meetingPoint = `${objPickup.name} - ${objPickup.address}`;

        updateDadosCart?.(cart.dados);
    };

    if (cart.dados.length < 1) {
        //Carrinho vazio
        return <>Vazio</>;
    } else {
        return (
            <div>
                {cart.dados.length > 0 ? (
                    cart.dados.map((item: any, index: any) => {

                        let amount: any =
                            item.sellingType === 2 && item.productType !== 2
                                ?
                                (item.adults * item.priceAdults) + (item.childs * item.priceChilds) + (item.infants * item.priceInfants)
                                :
                                item.sellingType === 1 && item.productType !== 2
                                    ?
                                    item.priceGlobalPeople
                                    :
                                    item.sellingType === 1 && item.productType === 2
                                        ?
                                        item.priceGlobalPeople
                                        :
                                        item.sellingType === 2 && item.productType === 2
                                            ?
                                            (item.globalPeople * item.priceGlobalPeople)
                                            :
                                            item.priceGlobalPeople

                        if (item.isCombo) amount = item.price
                        
                        return (
                            <>
                                <div className={`${styles.cart_card} mb-3`}>
                                    {item.isCombo ?
                                        item.isOpen === 0
                                            ?
                                            <CheckoutCartCardCombo
                                                item={item}
                                                invertDate={invertDate}
                                                addPickup={addPickupCombo}
                                                pickupSelect={pickupSelect}
                                                amount={amount}
                                                alert={alert}
                                                index={index}
                                                setUpdateCart={setUpdateCart}
                                                updateCart={updateCart}
                                            />
                                            :
                                            <CheckoutCartCardComboOpen
                                                item={item}
                                                invertDate={invertDate}
                                                addPickup={addPickupCombo}
                                                pickupSelect={pickupSelect}
                                                amount={amount}
                                                alert={alert}
                                                index={index}
                                                setUpdateCart={setUpdateCart}
                                                updateCart={updateCart}
                                            />
                                        : item.productType === 1 ? (
                                            <CheckoutCartCardTour
                                                item={item}
                                                invertDate={invertDate}
                                                addPickup={addPickup}
                                                pickupSelect={pickupSelect}
                                                amount={amount}
                                                alert={alert}
                                                index={index}
                                                setUpdateCart={setUpdateCart}
                                                updateCart={updateCart}
                                            />
                                        ) : item.productType === 4 ? (
                                            <CheckoutCartCardTicket
                                                item={item}
                                                invertDate={invertDate}
                                                addPickup={addPickup}
                                                pickupSelect={pickupSelect}
                                                amount={amount}
                                                setUpdateCart={setUpdateCart}
                                                updateCart={updateCart}
                                            />
                                        ) : (
                                            <CheckoutCartCardTransfer
                                                item={item}
                                                invertDate={invertDate}
                                                addPickup={addPickup}
                                                pickupSelect={pickupSelect}
                                                amount={amount}
                                                setUpdateCart={setUpdateCart}
                                                updateCart={updateCart}
                                            />
                                        )}
                                </div>
                            </>
                        );
                    })
                ) : (
                    <></>
                )}
            </div>
        );
    }
};

export default CheckoutCartCard;

// import useAppData from "data/hooks/useCartData";
// import dynamic from "next/dynamic";
// import React, { useState } from "react";
// import CheckoutCartCardTour from "./CheckoutCartCardTour";

// //style

// //backgroung
// //import RioDeJaneiro from "../../../../../src/assets/img/rio-de-janeiro.png";
// //backgroung

// // import CartCardTour from "./components/CartCardTour";
// // import CartCardTicket from "./components/CartCardTicket";
// // import CartCardTransfer from "./components/CartCardTransfer";

// export interface propFilter {
//   item: any;
//   control?: any;
//   errors?: any;
//   alert?: any;
//   index?: any;
// }

// const CartCard: React.FC<propFilter> = ({
//   item,
//   control,
//   errors,
//   alert,
//   index
// }) => {

//   let amount: any =
//     item.sellingType === 2 && item.productType !== 2
//       ?
//       (item.adults * item.priceAdults) + (item.childs * item.priceChilds) + (item.infants * item.priceInfants)
//       :
//       item.sellingType === 1 && item.productType !== 2
//         ?
//         item.priceGlobalPeople
//         :
//         item.sellingType === 1 && item.productType === 2
//           ?
//           item.priceGlobalPeople
//           :
//           item.sellingType === 2 && item.productType === 2
//             ?
//             (item.globalPeople * item.priceGlobalPeople)
//             :
//             item.priceGlobalPeople

//   const [pickupSelect, setPickupSelect] = useState<any>(null);

//   const { cart, updateDadosCart } = useAppData();

//   //const cartCaracolCart: any = useAppSelector((state: any) => state.cart);

//   const invertDate = (date: any) => {
//     return date.split('-').reverse().join('/');
//   }

//   const addPickup = (objPickup: any) => {
//     setPickupSelect(objPickup.id);

//     cart.dados[index].pickup = objPickup.id;
//     cart.dados[index].pickupInfo = objPickup;
//     cart.dados[index].meetingPoint = `${objPickup.name} - ${objPickup.address}`;

//     updateDadosCart?.(cart.dados);
//   };

//   return (
//     <div className="cart-card mb-3">
//       {
//         item.productType === 1
//           ?
//           <CheckoutCartCardTour
//             item={item}
//             invertDate={invertDate}
//             addPickup={addPickup}
//             pickupSelect={pickupSelect}
//             amount={amount}
//             alert={alert}
//             index={index}
//           />
//           :
//           item.productType === 4
//             ?
//             // <CartCardTicket
//             //   item={item}
//             //   invertDate={invertDate}
//             //   addPickup={addPickup}
//             //   pickupSelect={pickupSelect}
//             //   amount={amount}
//             //   dispatch={dispatch}
//             // />
//             <div></div>
//             :
//             // <CartCardTransfer
//             //   item={item}
//             //   invertDate={invertDate}
//             //   addPickup={addPickup}
//             //   pickupSelect={pickupSelect}
//             //   amount={amount}
//             //   dispatch={dispatch}
//             // />
//             <div></div>
//       }
//     </div>
//   );
// };

// export default CartCard;
