import React from 'react';

export interface props {
  tourResponse: any;
}

const DiscountRulesPT: React.FC<props> = ({ tourResponse }: props) => {
  return (
    <>
      <div>
        <h5>GRATUIDADE</h5>

        <p>
          Os seguintes públicos têm gratuidade no acesso ao Parque do Caracol.
          Estação Sonho Vivo e Observatório Panorâmico não estão contemplados
          neste benefício.
        </p>

        <ul>
          <li>
            <span>CANELENSES</span>
            <p>
              Comprovante de residência em seu nome (água, gás, luz, celular,
              internet, cartão ou telefone) e documento de identificação oficial
              com foto (digital ou impresso).
            </p>
          </li>
          <li>
            <span>CRIANÇAS DE ATÉ 5 ANOS</span>
            <p>
              Estão isentas de pagamento mediante a apresentação de certidão de
              nascimento original (ou cópia) ou documento oficial de
              identificação com foto (ou cópia autenticada).
            </p>
          </li>
          <li>
            <span>CADEIRANTES</span>
          </li>
        </ul>
      </div>

      {tourResponse.productCode !== process.env.REACT_APP_GAUCHO ? (
        <div className="mt-3">
          <h5>MEIA-ENTRADA</h5>
          <ul>
            <li>
              <span>CRIANÇAS DE 6 A 11 ANOS </span>
              <p>
                Apresentação de certidão de nascimento original (ou cópia) ou
                documento oficial de identificação com foto (ou cópia
                autenticada).
              </p>
            </li>
            <li>
              <span>GRAMADENSES</span>
              <p>
                Comprovante de residência em seu nome (água, gás, luz, celular,
                internet, cartão ou telefone) e documento de identificação
                oficial com foto (digital ou impresso).
              </p>
            </li>
            <li>
              <span>
                ID JOVEM - JOVENS COM IDADE ENTRE 15 E 29 ANOS INSCRITOS NO
                CADASTRO ÚNICO PARA PROGRAMAS SOCIAIS DO GOVERNO FEDERAL
              </span>
              <p>
                Apresentação da ID Jovem, acompanhada de documento oficial de
                identificação com foto (ou cópia autenticada).
              </p>
            </li>
            <li>
              <span>ESTUDANTES</span>
              <p>
                Ensino Fundamental, Ensino Médio, Graduação, Pós-graduação, MBA,
                Mestrados e Doutorados: original ou cópia autenticada da
                Carteira Nacional de Identificação Estudantil (CNIE) dentro do
                prazo de validade ou:
              </p>

              <ul>
                <li>
                  <p>
                    Rede particular: apresentação do documento oficial de
                    identificação com foto (ou cópia autenticada) acompanhado
                    de: boleto de pagamento à instituição do mês vigente ou
                    documento que comprove a matrícula de estudante dentro do
                    prazo de validade.
                  </p>
                </li>
                <li>
                  <p>
                    Estrangeiros: apresentar carteira de identificação
                    estudantil com foto.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <span>MELHOR IDADE (ACIMA DE 60 ANOS)</span>
              <p>
                A partir de 60 anos com documento oficial de identificação com
                foto (ou cópia autenticada).
              </p>
            </li>
            <li>
              <span>PCD E ACOMPANHANTE</span>
              <p>
                Apresentação do documento oficial de identificação com foto (ou
                cópia autenticada) acompanhado de Cartão Especial, Vale Social,
                Passe Federal, CRAS ou laudo médico (original ou cópia
                autenticada) emitido por órgão público de saúde. O desconto se
                limita a 1 acompanhante por PcD.
              </p>
            </li>
          </ul>
        </div>
      ) : (
        <div className="mt-3">
          <h5>BILHETE MATEANDO NA CASCATA</h5>
          <p>
            Os descontos são concedidos para nascidos ou moradores do Estado do
            Rio Grande do Sul, mediante apresentação individual dos seguintes
            documentos originais (ou cópia autenticada), digital ou impresso.
          </p>
          <ul>
            <li>
              <p>
                <b>Adultos Moradores:</b> Comprovante de residência em seu nome
                (água, gás, luz, celular, internet, cartão ou telefone) e
                documento de identificação oficial com foto (digital ou
                impresso).
              </p>
            </li>
            <li>
              <p>
                <b>Adultos Nascidos:</b> Documento de identificação oficial com
                foto, (digital ou impresso).
              </p>
            </li>
            <li>
              <p>
                <b>Crianças Moradoras (6 a 11 anos):</b> Certidão de nascimento
                original (ou cópia autenticada), ou documento oficial de
                identificação com foto, que comprove a filiação do titular da
                residência, (digital ou impresso).
              </p>
            </li>
            <li>
              <p>
                <b>Crianças Nascidas (6 a 11 anos):</b> Certidão de nascimento
                original (ou cópia autenticada) ou documento oficial de
                identificação com foto, (digital ou impresso).
              </p>
            </li>
            <li>
              <p>
                <b>Cônjuge:</b> Apresentação da certidão de casamento ou união
                estável original (ou cópia autenticada), documento oficial de
                identificação com foto (ou cópia autenticada) e comprovante de
                residência em titularidade do cônjuge (digital ou impresso).
              </p>
            </li>
          </ul>

          <p>* Os descontos são pessoais e intransferíveis.</p>

          <p>
            * A empresa se reserva no direito de suspender as promoções em dias
            de evento no parque, em caso de lotação esgotada, por motivos de
            manutenção ou força maior. Promoção válida enquanto durarem os
            estoques.
          </p>
        </div>
      )}
    </>
  );
};

export default DiscountRulesPT;
