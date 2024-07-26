'use client'
import { createContext, useEffect, useState } from "react";

interface CartContextProps {
  cart?: any,
  addItemCart?: (state: any) => void,
  removeTotalCart?: (state: any) => void,
  removeItemCart?: (state: any) => void,
  updateDadosCart?: (state: any) => void,
  addCheckoutStepBook?: (state: any) => void,
  addCheckoutStepData?: (state: any) => void,
  addCheckoutStepPayment?: (state: any) => void,
  updateCupomCart?: (state: any) => void,
  removeCupomCart?: () => void
}

const CartContext = createContext<CartContextProps>({})

export function CartProvider(props: any) {

  const dados: Array<string> = []

  const [cart, setCart] =
    typeof window !== 'undefined' ?
      useState(
        localStorage.getItem('cartCaracol') === null ? {
          Country: "BR",
          agent: "CPA3120",
          discount: "0",
          foreign: 2,
          language: 1,
          resellerReference: "",
          source: "site",
          totalCart: "0",
          dados: [],
          payments: [],
          cupom: {
            type: 0
          }

        }
          :
          JSON.parse(localStorage.getItem('cartCaracol') || '{}')
      )
      :
      useState({
        Country: "BR",
        agent: "CPA3120",
        discount: "0",
        foreign: 2,
        language: 1,
        resellerReference: "",
        source: "site",
        totalCart: "0",
        dados,
        payments: [],
        cupom: {
          type: 0
        }
      })



  function addItemCart(state: any) {
    var tempCart = cart;
    tempCart.dados = [...tempCart.dados, state]
    const tempTotalCart = updateTotalCart(tempCart);
    tempCart.totalCart = String(tempTotalCart);
    saveToLocalStorage(tempCart);

    setCart(tempCart);

    return true;

  }

  function removeTotalCart() {
    var tempCart = cart;
    tempCart.dados = [];
    tempCart.payments = [];
    tempCart.cupom = {
      type: 0
    };
    tempCart.address = undefined;
    tempCart.city = undefined;
    tempCart.state = undefined;
    tempCart.discount = '0';
    tempCart.tourCode = undefined;
    tempCart.agent = 'CPA3120';
    const tempTotalCart = "0";
    tempCart.totalCart = tempTotalCart;
    tempCart.Country = 'BR';
    saveToLocalStorage(tempCart);

  }

  function removeItemCart(state: any) {

    var tempCart = cart;
    tempCart.dados = tempCart.dados.filter((item: any) => item.controlCart !== state.controlCart);
    //Renan quem fez
    if (tempCart.dados.length === 0) {
      tempCart.cupom = {
        type: 0
      };
    }
    const tempTotalCart = updateTotalCart(tempCart);
    tempCart.totalCart = tempTotalCart;
    saveToLocalStorage(tempCart);

  }

  function updateDadosCart(state: any,) {
    var tempCart = cart;
    tempCart.dados = [...state]
    const tempTotalCart = updateTotalCart(tempCart);
    tempCart.totalCart = tempTotalCart;
    saveToLocalStorage(tempCart);
  }

  function addCheckoutStepBook(state: any,) {
    var tempCart = cart;
    tempCart.dados = [...state]
    const tempTotalCart = updateTotalCart(tempCart);
    tempCart.totalCart = tempTotalCart;
    saveToLocalStorage(tempCart);
  }

  function addCheckoutStepData(state: any,) {
    var tempCart = cart;
    tempCart.Country = state.Country
    tempCart.municipioId = state.municipioId
    tempCart.city = state.city
    tempCart.state = state.state
    tempCart.stateDesc = state.stateDesc
    tempCart.address = state.address
    tempCart.number = state.number
    tempCart.complement = state.complement
    tempCart.zipCode = state.zipCode
    tempCart.foreign = state.Country === "BR" ? 2 : 1

    saveToLocalStorage(tempCart);
  }

  function addCheckoutStepPayment(state: any,) {
    var tempCart = cart;
    tempCart.payments = state;

    saveToLocalStorage(tempCart);
  }

  function updateCupomCart(state: any) {
    var tempCart = cart;
    tempCart.cupom = state;

    // tempCart.TourCode = {
    //   code: state.codeName
    // }

    if (state.type !== 3) {
      tempCart.dados.forEach((element: any) => {
        element.discount = 0;
        element.discountBool = false;
      });
    }

    const tempTotalCart = updateTotalCart(tempCart);
    tempCart.totalCart = tempTotalCart;
    saveToLocalStorage(tempCart);

    window.location.reload();
  }

  function removeCupomCart() {
    // state.cart-= 1
    var tempCart = cart;
    tempCart.cupom = {
      type: 0
    };
    const tempTotalCart = updateTotalCart(tempCart);
    tempCart.totalCart = tempTotalCart;
    saveToLocalStorage(tempCart);

    window.location.reload();
  }

  function saveToLocalStorage(state: any) {
    try {
      const serialisedState = JSON.stringify(state);
      localStorage.setItem("cartCaracol", serialisedState);

    } catch (e) {
      //console.warn(e);
    }
  }

  function updateTotalCart(state: any) {
    let totalCart = 0;
    try {
      let cartTemp = JSON.stringify(state);
      let cartObj = JSON.parse(cartTemp);
      let priceProduct = 0;
      // eslint-disable-next-line array-callback-return
      cartObj.dados.map((cItem: any, index: any) => {
        if (cItem.sellingType === "2") {
          priceProduct = (
            (Number(cItem.priceGlobalPeople) * Number(cItem.globalPeople))
          );
        } else {
          priceProduct = (
            (Number(cItem.adults) * Number(cItem.priceAdults))
            + (Number(cItem.childs) * Number(cItem.priceChilds))
            + (Number(cItem.infants) * Number(cItem.priceInfants))
            + (Number(cItem.elders) * Number(cItem.priceElders))
            + (Number(cItem.student) * Number(cItem.priceStudent))
            + (Number(cItem.globalPeople) * Number(cItem.priceGlobalPeople))
          );
        }
        if (cItem.discountBool === true && cartObj.cupom.type === 3) {
          priceProduct = priceProduct - ((priceProduct * (cItem.discount / 100)));
        }

        if (cItem.isCombo) {
          priceProduct = cItem.price;
        }
        totalCart = Number(totalCart) + (priceProduct);

      });
      if (cartObj.cupom.type === 2) {
        totalCart = Number(totalCart) - (cartObj.cupom.value);
      } else if (cartObj.cupom.type === 4) {
        totalCart = Number(totalCart) - ((totalCart * (cartObj.cupom.value / 100)));
      }

      return String(totalCart);


    } catch (e) {
      //console.warn(e);
    }

  }

  return (
    <CartContext.Provider value={{
      cart,
      addItemCart,
      removeTotalCart,
      removeItemCart,
      updateDadosCart,
      addCheckoutStepBook,
      addCheckoutStepData,
      addCheckoutStepPayment,
      updateCupomCart,
      removeCupomCart
    }}>
      {props.children}
    </CartContext.Provider>
  )

}

export default CartContext

export const CartConsumer = CartContext.Consumer