import React from 'react';

export interface props {
  tourResponse: any;
}

const DiscountRulesES: React.FC<props> = ({ tourResponse }: props) => {
  return (
    <>
      <div>
        <h5>GRATUIDAD</h5>

        <p>
          Los siguientes públicos tienen acceso gratuito al Parque do Caracol.
          Estación Sonho Vivo y Observatorio Panorámico no están incluidos en
          este beneficio.
        </p>

        <ul>
          <li>
            <span>RESIDENTES DE CANELA</span>
            <p>
              Comprobante de residencia en su nombre (recibo de agua, gas, luz,
              celular, internet, tarjeta o teléfono) y documento de
              identificación oficial con foto (digital o impreso).
            </p>
          </li>
          <li>
            <span>NIÑOS HASTA 5 AÑOS</span>
            <p>
              Están exentos del pago mediante la presentación de un certificado
              de nacimiento original (o copia) o documento oficial de
              identificación con foto (o copia certificada).
            </p>
          </li>
          <li>
            <span>USUARIOS DE SILLA DE RUEDAS</span>
          </li>
        </ul>
      </div>

      {tourResponse.productCode !== process.env.REACT_APP_GAUCHO ? (
        <div className="mt-3">
          <h5>MEDIA ENTRADA</h5>

          <ul>
            <li>
              <span>NIÑOS DE 6 A 11 AÑOS</span>
              <p>
                Presentación del certificado de nacimiento original (o copia) o
                documento oficial de identificación con foto (o copia
                certificada).
              </p>
            </li>
            <li>
              <span>RESIDENTES DE GRAMADO</span>
              <p>
                Comprobante de residencia en su nombre (recibo de agua, gas,
                luz, celular, internet, tarjeta o teléfono) y documento de
                identificación oficial con foto (digital o impreso).
              </p>
            </li>
            <li>
              <span>
                ID JOVEM - JÓVENES ENTRE 15 Y 29 AÑOS INSCRITOS EN EL REGISTRO
                ÚNICO PARA PROGRAMAS SOCIALES DEL GOBIERNO FEDERAL BRASILEÑO
              </span>
              <p>
                Presentación de ID Jovem, acompañada de documento oficial de
                identificación con foto (o copia autenticada).
              </p>
            </li>
            <li>
              <span>ESTUDIANTES</span>
              <p>
                Escuela Primaria, Escuela Secundaria, Graduación, Posgrado, MBA,
                Maestrías y Doctorados: original o copia autenticada de la
                Cartera Nacional de Identificación Estudiantil (CNIE) dentro del
                plazo de validez o:
              </p>

              <ul>
                <li>
                  <p>
                    Red Particular: presentación del documento oficial de
                    identificación con foto (o copia autenticada) acompañado de:
                    boleto de pago a la institución del mes actual o documento
                    que compruebe la matrícula de estudiante dentro del plazo de
                    validez.
                  </p>
                </li>
                <li>
                  <p>
                    Extranjeros: presentar identificación de estudiante con
                    foto.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <span>60+ AÑOS</span>
              <p>
                A partir de 60 años con documento oficial de identificación con
                foto (o copia certificada).
              </p>
            </li>
            <li>
              <span>PCD Y ACOMPAÑANTE</span>
              <p>
                Presentación del documento oficial de identificación con foto (o
                copia certificada) acompañado de Cartão Especial, Vale Social,
                Passe Federal, CRAS o informe médico (original o copia
                certificada) emitido por el organismo público de salud. El
                descuento se limita a 1 acompañante por PCD.
              </p>
            </li>
          </ul>
        </div>
      ) : (
        <div className="mt-3">
          <h5>BILLETE MATEANDO NA CASCATA</h5>
          <p>
            Los descuentos se aplican para nacidos o residentes del Estado de
            Rio Grande do Sul, mediante la presentación individual de los
            siguientes documentos en original (o copia autenticada), en digital
            o impreso.
          </p>
          <ul>
            <li>
              <p>
                <b>Adultos Residentes:</b> Comprobante de residencia en su
                nombre (agua, gas, luz, celular, internet, tarjeta o teléfono
                fijo) y documento de identidad oficial con foto (digital o
                impreso).
              </p>
            </li>
            <li>
              <p>
                <b>Adultos Nacidos en RS:</b> Documento de identidad oficial con
                foto, (digital o impreso).
              </p>
            </li>
            <li>
              <p>
                <b>Niños Residentes (6 a 11 años):</b> Certificado de nacimiento
                original (o copia autenticada), o documento de identidad oficial
                con foto, que acredite la filiación del titular de la residencia
                (digital o impreso).
              </p>
            </li>
            <li>
              <p>
                <b>Niños Nacidos en RS (6 a 11 años):</b> Certificado de
                nacimiento original (o copia certificada) o documento de
                identidad oficial con foto (digital o impreso).
              </p>
            </li>
            <li>
              <p>
                <b>Cónyuge:</b> Presentación del certificado de matrimonio o
                unión estable original (o copia autenticada), documento de
                identidad oficial con foto (o copia autenticada) y comprobante
                de residencia en propiedad del cónyuge (digital o impreso).
              </p>
            </li>
          </ul>

          <p>* Los descuentos son personales e intransferibles.</p>

          <p>
            * La empresa se reserva el derecho de suspender las promociones en
            días de eventos en el parque; en caso de aforo máximo; por motivos
            de mantenimiento o por fuerza mayor. Promoción válida hasta agotar
            existencias.
          </p>
        </div>
      )}
    </>
  );
};

export default DiscountRulesES;
