import React from 'react';

export interface props {
  tourResponse: any;
}

const DiscountRulesEN: React.FC<props> = ({ tourResponse }: props) => {
  return (
    <>
      <div>
        <h5>GRATUITY</h5>

        <p>
          The following audiences have free access to Parque do Caracol. Sonho
          Vivo Station and Panoramic Observatory are not included in this
          benefit.
        </p>

        <ul>
          <li>
            <span>PEOPLE WHO LIVE IN CANELA</span>
            <p>
              Proof of residence with your name (water, gas, electricity, mobile
              phone, internet, card, or telephone bill) and an official
              identification document with photo (digital or printed).
            </p>
          </li>
          <li>
            <span>CHILDREN UP TO 5 YEARS </span>
            <p>
              They are exempt from payment upon presentation of the original
              birth certificate (or copy) or an official photo identification
              document (or certified copy).
            </p>
          </li>
          <li>
            <span>WHEELCHAIR USERS</span>
          </li>
        </ul>
      </div>
      {tourResponse.productCode !== process.env.REACT_APP_GAUCHO ? (
        <div className="mt-3">
          <h5>HALF-PRICE ENTRY:</h5>

          <ul>
            <li>
              <span>CHILDREN FROM 6 TO 11 YEARS</span>
              <p>
                Presentation of original birth certificate (or copy) or official
                identification document with a photo (or certified copy).
              </p>
            </li>
            <li>
              <span>PEOPLE WHO LIVE IN GRAMADO</span>
              <p>
                Proof of residence with your name (water, gas, electricity,
                mobile phone, internet, card, or telephone bill) and an official
                identification document with photo (digital or printed).
              </p>
            </li>
            <li>
              <span>
                ID JOVEM – YOUNG PEOPLE AGED BETWEEN 15 AND 29 YEARS ENROLLED IN
                THE UNIFIED REGISTRY FOR SOCIAL PROGRAMS OF THE BRAZILIAN
                FEDERAL GOVERNMENT
              </span>
              <p>
                Presentation of the ID JOVEM together with an official
                identification document with a photo (or certified copy).
              </p>
            </li>
            <li>
              <span>STUDENTS</span>
              <p>
                Elementary School, High School, Undergraduate, Postgraduate,
                MBA, Masters, and Doctorates: original or certified copy of the
                National Student Identification Card (CNIE) within the expiry
                date or:
              </p>

              <ul>
                <li>
                  <p>
                    Private School System: presentation of the official
                    identification document with a photo (or certified copy)
                    together with: a payment proof to the institution of the
                    current month or a document proving student enrollment
                    within the validity period.
                  </p>
                </li>
                <li>
                  <p>Foreigners: present the student ID card with a photo.</p>
                </li>
              </ul>
            </li>
            <li>
              <span>WELLDERLY (OVER 60 YEARS)</span>
              <p>
                People aged 60 years or more, with an official identification
                document with a photo (or certified copy).
              </p>
            </li>
            <li>
              <span>PWD AND CARER</span>
              <p>
                Presentation of the official identification document with photo
                (or certified copy) together with the Cartão Especial, Vale
                Social, Passe Federal, CRAS, or medical report (original or
                certified copy) issued by a public health agency. The discount
                is limited to 1 carer per PWD.
              </p>
            </li>
          </ul>
        </div>
      ) : (
        <div className="mt-3">
          <h5>TICKET MATEANDO NA CASCATA</h5>
          <p>
            Discounts are granted to those who are born at or residents of the
            State of Rio Grande do Sul, upon individual presentation of the
            following original documents (or certified copy), digital or
            printed.
          </p>
          <ul>
            <li>
              <p>
                <b>Resident Adults:</b> Proof of residence in your name (water,
                gas, light, mobile phone, internet, card, or telephone) and
                official identification document with photo (digital or
                printed).
              </p>
            </li>
            <li>
              <p>
                <b>Adults Born in RS:</b> Official identification document with
                photo (digital or printed).
              </p>
            </li>
            <li>
              <p>
                <b>Resident Children (6 to 11 years):</b> Original birth
                certificate (or certified copy), or official identification
                document with photo, which proves the affiliation of the holder
                of residence (digital or printed).
              </p>
            </li>
            <li>
              <p>
                <b>Children Born in RS (6 to 11 years):</b> Original birth
                certificate (or certified copy) or identification document with
                photo (digital or printed).
              </p>
            </li>
            <li>
              <p>
                <b>Spouse:</b> Presentation of the original marriage or stable
                marriage certificate (or certified copy), official
                identification document with photo (or certified copy) and proof
                of residence held by the spouse (digital or printed).
              </p>
            </li>
          </ul>

          <p>* Discounts are personal and non-transferable.</p>

          <p>
            * The company reserves the right to suspend promotions on days of
            event at the park; if the tickets get sold out; for reasons of
            maintenance or force majeure. The promotions are only valid while
            the stocks last.
          </p>
        </div>
      )}
    </>
  );
};

export default DiscountRulesEN;
