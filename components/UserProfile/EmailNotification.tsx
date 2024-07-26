import React from 'react';


export default function EmailNotification(){
    return(
        <div className={`col-span-9`}>
            <div className={`border-b`}>
              <div className="">
                <h1 className="text-4xl font-bold">Notificações por e-mail</h1>
                <h2 className="mb-4">
                Decida quais notificações quer receber - e se descadastre do resto.
                </h2>
              </div>
              
            </div>
            <div className="border-b grid grid-cols-12 pt-5 pb-6 gap-2">
              <div className="col-span-2 leading-4">Preferências de e-mail</div>
              <div className="col-span-8 leading-4">
                <p className="mb-4">useremail@c2rio.travel</p>
                <p>
                Selecione &lsquo;Gerenciar&rsquo; para receber ou se descadastrar de avisos por e-mail sobre ofertas e recomendações.
                </p>
              </div>
              <div className="col-span-2 text-right leading-4">Gerenciar</div>
            </div>
            <div className="border-b grid grid-cols-12 pt-5 pb-6 gap-2">             
              <div className="col-start-3 col-span-8 leading-4">Pagar com novo cartão</div>
              <div className="col-span-2 text-right leading-4">Adicionar cartão</div>
            </div>           
          </div>
    )
};