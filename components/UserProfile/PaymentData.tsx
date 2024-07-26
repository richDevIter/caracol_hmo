import React from 'react';


export default function PaymentData(){
    return(
        <div className={`col-span-9`}>
            <div className={`border-b`}>
              <div className="">
                <h1 className="text-4xl font-bold">Dados de pagamento</h1>
                <h2 className="mb-4">
                Adicione ou exclua formas de pagamento para facilitar o processo de compra.
                </h2>
              </div>
              
            </div>
            <div className="border-b grid grid-cols-12 pt-5 pb-6 gap-2">
              <div className="col-span-2 leading-4">Cartões de pagamento</div>
              <div className="col-start-4 col-span-7 leading-4 grid grid-cols-2">
                <div className="col-span-1">......5790</div>
                <div className="col-span-1">01/2027</div>
              </div>
              <div className="col-span-2 text-right leading-4">Excluir</div>
            </div>
            <div className="border-b grid grid-cols-12 pt-5 pb-6 gap-2">             
              <div className="col-start-3 col-span-8 leading-4">Pagar com novo cartão</div>
              <div className="col-span-2 text-right leading-4">Adicionar cartão</div>
            </div>           
          </div>
    )
};