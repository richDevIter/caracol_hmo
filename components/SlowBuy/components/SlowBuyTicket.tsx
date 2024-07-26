import { useEffect, useState } from 'react';

import useAppData from '@/data/hooks/useCartData';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import DoubleCalendarTicket from '@/components/Calendar/DoubleCalendarTicket';
import DropdownHours from '@/components/DropdownHours/DropdownHours';
import SimpleAlert from '@/components/base/SimpleAlert/SimpleAlert';
import Modal from '@/components/base/Modal/Modal';

import styles from './../SlowBuy.module.css';

export interface propOptions {
    tourResponse: any,
    lng: any,
    dic: any
}

const SlowBuyTicket: React.FC<propOptions> = ({ tourResponse, lng, dic }: propOptions) => {
    const { cart, addItemCart, removeTotalCart, removeItemCart, removeCupomCart } = useAppData();

    const searchParams = useParams();

    const url = window.location.href;
    const codeUrl = url.split('/');
    const slugUrl = codeUrl[codeUrl.length - 1].split('?')[0];
    const isTrilha = codeUrl[4].split('?')[2];

    const [numberAdults, setNumberAdults] = useState<number>(0);
    const [numberChilds, setNumberChilds] = useState<number>(0);
    const [numberInfants, setNumberInfants] = useState<number>(0);
    const [numberStudent, setNumberStudent] = useState<number>(0);
    const [numberElders, setNumberElders] = useState<number>(0);
    const [numberPrivate, setNumberPrivate] = useState<number>(0);
    const [numberTotal, setNumberTotal] = useState<number>(1);
    const [numberStockTotal, setNumberStockTotal] = useState<number>(0);
    const [dateTour, setDateTour] = useState<any>([]);
    const [price, setPrice] = useState<any>([]);
    const [numberPeople, setNumberPeople] = useState<any>(null);
    const [showDropdown, setShowDropdown] = useState<any>(false);
    const [showCalendar, setShowCalendar] = useState<any>(false);
    const [showHours, setShowHours] = useState<any>(false);
    const [modalityNumber, setModalityNumber] = useState<any>(0);
    const [alert, setAlert] = useState<any>(false);
    const [alertPromo, setAlertPromo] = useState<any>(false);
    const [enableCart, setEnableCart] = useState<any>(false);
    const [alertMessage, setAlertMessage] = useState<any>('');

    const [ranges, setRanges] = useState<any>(null);

    const [lang, setLang] = useState<any>();

    const [isIntegration, setIsIntegration] = useState<any>(false);

    const [boxInfo, setBoxInfo] = useState<boolean>();

    useEffect(() => {
        if (lng === 'BR') {
            setLang(tourResponse.slugBR);
        } else if (lng === 'EN') {
            setLang(tourResponse.slugEN);
        } else {
            setLang(tourResponse.slugES);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tourResponse]);

    const handleClick = (controll: string, faixa: string) => {
        let stateNumber: any;

        if (faixa === 'Adult') {
            stateNumber = numberAdults;
        } else if (faixa === 'Child') {
            stateNumber = numberChilds;
        } else if (faixa === 'Infant') {
            stateNumber = numberInfants;
        } else if (faixa === 'Elders') {
            stateNumber = numberElders;
        } else if (faixa === 'Student') {
            stateNumber = numberStudent;
        } else {
            stateNumber = numberPrivate;
        }

        let newNumber = numberAdults;

        if (controll === 'sub') {
            if (stateNumber === 0) {
                return false;
            } else {
                newNumber = stateNumber - dateTour[modalityNumber]?.ranges[`increment${faixa}`];
                if (dateTour[modalityNumber]?.ranges[`flagStock${faixa}`] === 1) {
                    setNumberStockTotal(numberStockTotal - dateTour[modalityNumber]?.ranges[`increment${faixa}`]);
                }
            }
        }
        if (controll === 'plus') {
            if (dateTour[modalityNumber]?.ranges[`flagStock${faixa}`] === 1) {
                if (
                    (numberStockTotal + dateTour[modalityNumber]?.ranges[`increment${faixa}`] <=
                        dateTour[modalityNumber].maxStockNumber) && (numberStockTotal + dateTour[modalityNumber]?.ranges[`increment${faixa}`] <= 6)
                ) {
                    newNumber = stateNumber + dateTour[modalityNumber]?.ranges[`increment${faixa}`];
                    setNumberStockTotal(numberStockTotal + dateTour[modalityNumber]?.ranges[`increment${faixa}`]);
                } else {
                    return false;
                }
            } else {
                newNumber = stateNumber + dateTour[modalityNumber]?.ranges[`increment${faixa}`];
            }
        }

        if (faixa === 'Adult') {
            return setNumberAdults(newNumber);
        } else if (faixa === 'Child') {
            return setNumberChilds(newNumber);
        } else if (faixa === 'Infant') {
            return setNumberInfants(newNumber);
        } else if (faixa === 'Elders') {
            return setNumberElders(newNumber);
        } else if (faixa === 'Student') {
            return setNumberStudent(newNumber);
        } else {
            return setNumberPrivate(newNumber);
        }
    };

    function changePriceDateTour(obj: any) {
        setShowHours(true);
        setPrice(obj);
        setDateTour(obj);
        setNumberPeople({
            adults: '1',
            childs: '0',
            infants: '0',
            elders: '0',
            student: '0',
            globalPeople: '1',
        });
    }

    useEffect(() => {
        var aux: any = [];
        for (var i = 0; i < tourResponse.modalities.length; i++) {
            aux.push({
                adult: 0,
                child: 0,
                infant: 0,
            });
        }
        setDateTour(aux);
    }, [tourResponse.modalities]);

    useEffect(() => {
        setNumberTotal(
            numberAdults +
            numberChilds +
            numberInfants +
            numberElders +
            numberStudent +
            numberPrivate,
        );
    }, [
        numberAdults,
        numberChilds,
        numberInfants,
        numberElders,
        numberStudent,
        numberPrivate,
    ]);

    const addToCart = (itemOption: any, productCode: any) => {
        var repeatedItem: any = false; //impede de adicionar produto repetido no carrinho

        cart.dados.forEach((elem: any) => {
            if (elem.productCode === productCode) {
                repeatedItem = true;
            }
        });

        if (repeatedItem === true) {
            setAlertMessage(dic?.alertRepeatedItem);
            setAlert(true);
        } else {
            const item = {
                productName: tourResponse.productName,
                productNameBR: tourResponse.productNameBR,
                productNameEN: tourResponse.productNameEN,
                productNameES: tourResponse.productNameES,
                imagesBaseUrl: tourResponse.imagesBaseUrl,
                imgCart: tourResponse.images[0],
                price: itemOption?.tarif?.price,

                idTarif: itemOption.idTarif,
                idPickup: itemOption.idPickup,

                priceAdults: itemOption.priceAdults,
                priceChilds: itemOption.priceChilds,
                priceInfants: itemOption.priceInfants,
                priceElders: itemOption.priceElders,
                priceStudent: itemOption.priceStudent,
                priceGlobalPeople: itemOption.priceGlobalPeople,
                reservationSystem: tourResponse.reservationSystem,

                ranges: ranges,
                hours: dateTour[modalityNumber].hours,

                sellingType: tourResponse.type === 'PRIVATIVO' ? 1 : 2,
                adults: itemOption.adults,
                childs: itemOption.childs,
                infants: itemOption.infants,
                elders: itemOption.elders,
                student: itemOption.student,

                globalPeople: itemOption.globalPeople,
                totalPeople: itemOption.totalPeople,

                productType: 4,
                productCode: tourResponse.productCode,
                productModCode: dateTour[modalityNumber].prodModUniqueCode,

                /* productSlug: slugUrl, */
                slugBR: tourResponse.slugBR,
                slugEN: tourResponse.slugEN,
                slugES: tourResponse.slugES,
                time: itemOption.time,
                date: itemOption.date,
                supplier: tourResponse.supplier,
                typePickup: itemOption.embarkingType,
                meetingPoint:
                    itemOption.embarkingType === '0' ? itemOption.meetingPoint : '',
                pickupListId:
                    itemOption.embarkingType === '0' ? 0 : itemOption.pickupListId,
                pickup: 0,

                discount: 0,
                customValueNet: 0,
                customValueSell: 0,
                goingSource: 'null',
                commingSource: 'null',
                latOrigem: 'null',
                lngOrigem: 'null',
                latDestino: 'null',
                lngDestino: 'null',
                cia: 'null',
                voo: 'null',
                smallSuitcase: 0,
                bigSuitcase: 0,
                internalNotes: ' ',
                idVeiculo: 0,
                passengers: [],

                channel: isTrilha === 'trilha' ? 7 : undefined,
            };

            //SetCartItem(item);
            addItemCart?.(item);
            window.location.href = window.location.origin + '/cart';
        }
    };

    const verifyItens = (option: any) => {
        if (
            numberAdults +
            numberChilds +
            numberInfants +
            numberElders +
            numberStudent +
            numberPrivate >
            0
        ) {
            auth(option);
        } else {
            setEnableCart(false);
            setAlertMessage(dic?.alertSelectAPerson);
            setAlert(true);
        }
    };

    const auth = (option: any) => {
        if (numberPeople === null || dateTour.length < 1) {
            setAlertMessage(dic?.alertFillAllData);
            setAlert(true);
        } else {
            option.adults = numberAdults;
            option.childs = numberChilds;
            option.infants = numberInfants;
            option.elders = numberElders;
            option.student = numberStudent;

            option.globalPeople =
                dateTour[modalityNumber].idSellingType === 1
                    ? 1
                    : numberAdults +
                    numberChilds +
                    numberInfants +
                    numberElders +
                    numberStudent +
                    numberPrivate;
            option.totalPeople =
                dateTour[modalityNumber].idSellingType === 1
                    ? numberPrivate
                    : undefined;

            /* option.date = (document.getElementById(`date-hidden`) as HTMLInputElement).value.split('/').reverse().join('-'); */
            option.date = (
                document.getElementById(`date-${option.id}`) as HTMLInputElement
            ).value
                .split('/')
                .reverse()
                .join('-');
            option.time = dateTour[modalityNumber].time;

            /* const selectedDate = JSON.parse((document.getElementById(`date-hidden`) as HTMLInputElement).dataset.object || '{}'); */
            const selectedDate = JSON.parse(
                (document.getElementById(`date-${option.id}`) as HTMLInputElement)
                    .dataset.object || '{}',
            );

            option.idTarif = selectedDate.idTarif;
            /* option.idPickup = (document.getElementById(`pickup`) as HTMLInputElement).value; */
            option.idPickup = '';

            option.priceAdults = selectedDate.priceAdultFinal;
            option.priceChilds = selectedDate.priceChildFinal;
            option.priceInfants = selectedDate.priceInfantFinal;
            option.priceElders = selectedDate.priceEldersFinal;
            option.priceStudent = selectedDate.priceStudentFinal;
            option.priceGlobalPeople = selectedDate.priceGlobalFinal;

            if (
                numberAdults +
                numberChilds +
                numberInfants +
                numberElders +
                numberStudent +
                numberPrivate >
                0
            ) {
                addToCart(option, tourResponse.productCode);
            } else {
                setAlertMessage(dic?.alertSelectAPerson);
                setAlert(true);
            }
        }
    };

    const handleChangeModalities = (value: any) => {
        setShowDropdown(false);
        setModalityNumber(Number(value));
        setShowCalendar(false);
        setShowHours(false);

        setTimeout(() => {
            setShowCalendar(true);
        }, 100);
    };

    useEffect(() => {
        let date = new Date().toLocaleString('pt-BR');
        let dateNow = date
            .split(' ')[0]
            .split('/')
            .reverse()
            .join('')
            .replaceAll(',', '');

        const newSlug =
            searchParams.lng === 'pt'
                ? tourResponse.slugBR
                : searchParams.lng === 'en'
                    ? tourResponse.slugEN
                    : searchParams.lng === 'es'
                        ? tourResponse.slugES
                        : tourResponse.slugBR;

        if (
            slugUrl !== newSlug.split(' ').join('%20').split('í').join('%C3%AD') &&
            newSlug !== undefined
        ) {
            window.location.href =
                window.location.origin + '/compra-rapida/' + newSlug + '?type=ticket';
        } else { }

        if (`${dateNow}` <= '20240101') {
            setBoxInfo(true);
        } else {
            setBoxInfo(false);
        }

        if (`${dateNow}` <= '20240101') {
            setBoxInfo(true);
        } else {
            setBoxInfo(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams.lng]);

    useEffect(() => {
        setNumberAdults(0);
        setNumberChilds(0);
        setNumberInfants(0);
        setNumberStudent(0);
        setNumberElders(0);
        setNumberPeople(0);
        setNumberStockTotal(0);
        setNumberTotal(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateTour[modalityNumber]?.time, dateTour[modalityNumber]?.data, modalityNumber]);

    return (
        <>
            <div className={`${styles.bg_slow_buy} container-page`}>
                <h2 className={`${styles.slow_buy_title}`}>{tourResponse.productName}</h2>

                <div className={`${styles.fast_buy_content} grid grid-cols-12`}>
                    <div className={`${styles.slow_buy_description} col-span-12 md:col-span-5`}>
                        <span
                            id="description"
                            dangerouslySetInnerHTML={{
                                __html: tourResponse.productInfo,
                            }}
                        ></span>
                        <Link
                            href={
                                tourResponse.typeProduct === 'TOUR'
                                    ? `/tour/${lang}`
                                    : `/ticket/${lang}`
                            }
                            className="mt-3"
                            style={{ color: '#000' }}
                        >
                            {dic.ticket.moreDetails}
                        </Link>
                    </div>
                    <div className={`${styles.slow_buy_people} col-span-12 md:col-span-7`}>
                        <h4 className="text-primary">Escolha sua opção</h4>
                        <div>
                            <div className="">
                                <div className="panel-dropdown-content right active">
                                    <div className={`${styles.select_date}`}>
                                        <div className="mb-10">
                                            <p style={{ fontSize: '18px', color: '#707070' }}>
                                                <strong>Passo 01:</strong>{' '}
                                                Escolha sua opção
                                            </p>
                                            <select
                                                onChange={(e: any) => {
                                                    handleChangeModalities(e.target.value);
                                                }}
                                                className={`${styles.modality_input} form-control py-2`}
                                                style={{ borderRadius: 0 }}
                                                name="modalities"
                                                id="modalities"
                                            >
                                                <option value="" disabled selected>
                                                    Selecione
                                                </option>
                                                {tourResponse.modalities.length > 0
                                                    ? tourResponse.modalities.map(
                                                        (item: any, index: any) => {
                                                            return (
                                                                <>
                                                                    <option value={index}>
                                                                        {item.modalityName}
                                                                    </option>
                                                                </>
                                                            );
                                                        },
                                                    )
                                                    : ''}
                                            </select>
                                        </div>
                                        <div className={`${styles.calendar_input} mb-8`}>
                                            {showCalendar === true ? (
                                                <>
                                                    <p style={{ fontSize: '18px', color: '#707070' }}>
                                                        <strong>Passo 02:</strong>{' '}
                                                        Selecione a Data
                                                    </p>
                                                    <DoubleCalendarTicket
                                                        modalityID={
                                                            tourResponse.modalities[modalityNumber].id
                                                        }
                                                        product={tourResponse.modalities[modalityNumber]}
                                                        productCode={tourResponse.productCode}
                                                        changePriceDateTour={changePriceDateTour}
                                                        dateTour={dateTour}
                                                        index={modalityNumber}
                                                        //setRanges={setRanges}
                                                        //isIntegration={isIntegration}
                                                        setIsIntegration={setIsIntegration}
                                                    ></DoubleCalendarTicket>
                                                </>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                        <div className={`${styles.calendar_input}`}>
                                            {showHours === true ? (
                                                <DropdownHours
                                                    changePriceDateTour={changePriceDateTour}
                                                    dateTour={dateTour}
                                                    index={modalityNumber}
                                                    setPeopleDisponible={setShowDropdown}
                                                    isIntegration={isIntegration}
                                                    info={tourResponse}
                                                    isDetailsProduct={true}
                                                />
                                            ) : (
                                                ''
                                            )}
                                            {showDropdown === true ? (
                                                <>
                                                    <p
                                                        style={{
                                                            fontSize: '18px',
                                                            color: '#707070',
                                                            marginTop: '2rem',
                                                        }}
                                                    >
                                                        <strong>
                                                            {dateTour[modalityNumber]?.hours?.length !== 1
                                                                ? 'Passo 04:'
                                                                : 'Passo 03:'}
                                                        </strong>{' '}
                                                        Selecione os ingressos
                                                    </p>

                                                    {dateTour[modalityNumber]?.ranges?.labelsRealSorted.map(
                                                        (faixa: any, index: any) => {
                                                            let stateNumber: any;

                                                            if (faixa === 'Adult') {
                                                                stateNumber = numberAdults;
                                                            } else if (faixa === 'Child') {
                                                                stateNumber = numberChilds;
                                                            } else if (faixa === 'Infant') {
                                                                stateNumber = numberInfants;
                                                            } else if (faixa === 'Elders') {
                                                                stateNumber = numberElders;
                                                            } else if (faixa === 'Student') {
                                                                stateNumber = numberStudent;
                                                            } else {
                                                                stateNumber = numberPrivate;
                                                            }

                                                            return (
                                                                <>
                                                                    {dateTour[modalityNumber]?.ranges[`isActive${faixa}`] === true ? (
                                                                        <div className={`${styles.qtyButtons}`}>
                                                                            <div className={`${styles.flex_ajuste}`}>
                                                                                <label>{dateTour[modalityNumber]?.ranges[`label${faixa}`]}</label>
                                                                                <small id="idade-crianca" style={{ fontSize: '10px', color: "#707070" }}> {(dateTour[modalityNumber][`${faixa.toLowerCase()}Text`])}</small>
                                                                            </div>
                                                                            <div className="flex">
                                                                                <button
                                                                                    className={`${styles.qtyDec}`}
                                                                                    onClick={() =>
                                                                                        handleClick('sub', faixa)
                                                                                    }
                                                                                >
                                                                                    <span>-</span>
                                                                                </button>
                                                                                <input
                                                                                    type="text"
                                                                                    name="qtyInput"
                                                                                    value={stateNumber}
                                                                                    id="numero-adulto"
                                                                                />
                                                                                <button
                                                                                    className={`${styles.qtyInc}`}
                                                                                    onClick={() =>
                                                                                        handleClick('plus', faixa)
                                                                                    }
                                                                                >
                                                                                    <span>+</span>
                                                                                </button>
                                                                            </div>
                                                                            <div className={`${styles.price}`}>
                                                                                {faixa === 'Private' ? (
                                                                                    <span
                                                                                        className="price-dropdown text-dark font-weight-bold w-full block"
                                                                                        id="valor-adulto-sm"
                                                                                    >
                                                                                        R${' '}
                                                                                        {price[modalityNumber].global
                                                                                            .toFixed(2)
                                                                                            .split('.')
                                                                                            .join(',')}
                                                                                    </span>
                                                                                ) : (
                                                                                    <span
                                                                                        className="price-dropdown text-dark font-weight-bold w-full block"
                                                                                        id="valor-adulto-sm"
                                                                                    >
                                                                                        R${' '}
                                                                                        {price[modalityNumber][
                                                                                            `${faixa.toLowerCase()}`
                                                                                        ]
                                                                                            ?.toFixed(2)
                                                                                            ?.split('.')
                                                                                            ?.join(',')}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <></>
                                                                    )}
                                                                </>
                                                            );
                                                        },
                                                    )}
                                                    {(numberStockTotal >=
                                                        dateTour[modalityNumber].maxStockNumber) || (numberStockTotal >= 6) ? (
                                                        <SimpleAlert alertType="danger py-3">
                                                            {dic?.ticket.limit}
                                                        </SimpleAlert>
                                                    ) : (
                                                        ''
                                                    )}
                                                    <hr />
                                                    <div className={`${styles.flex_ajuste} ${styles.subtotal} flex`} style={{ flexDirection: "row" }}>
                                                        <h5>Subtotal</h5>
                                                        <span
                                                            className="price-dropdown text-dark font-weight-bold block"
                                                            id="valor-subtotal-sm"
                                                        >
                                                            {' '}
                                                            R${' '}
                                                            {(
                                                                price[modalityNumber].adult * numberAdults +
                                                                price[modalityNumber].child * numberChilds +
                                                                price[modalityNumber].infant * numberInfants +
                                                                price[modalityNumber].elders * numberElders +
                                                                price[modalityNumber].student * numberStudent +
                                                                (numberPrivate < 1 ? 0 : price[0].global)
                                                            )
                                                                .toFixed(2)
                                                                .split('.')
                                                                .join(',')}
                                                        </span>
                                                    </div>
                                                    {
                                                        tourResponse.productCode !== process.env.REACT_APP_GAUCHO
                                                            ?
                                                            <>
                                                                <div>
                                                                    <small>
                                                                        {dic?.ticket.otherTextCaracol}
                                                                    </small>
                                                                </div>
                                                                <div className='mb-4'>
                                                                    <small>
                                                                        {dic?.ticket.otherTextCaracol2}
                                                                    </small>
                                                                </div>
                                                            </>
                                                            :
                                                            <>
                                                                <div>
                                                                    <small>
                                                                        {dic?.ticket.alertGaucho}
                                                                    </small>
                                                                </div>
                                                                <div className='mb-4'>
                                                                    <small>
                                                                        {dic?.ticket.otherTextCaracol2}
                                                                    </small>
                                                                </div>
                                                            </>
                                                    }
                                                    <div className={`${styles.warning}`}>
                                                        <p>{dic?.ticket.alert}</p>
                                                    </div>
                                                </>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.buy_button}`}>
                            {numberPeople !== null ? (
                                <div className="flex flex-col items-center">
                                    <button
                                        title=""
                                        className="btn btn-primary btn-block btn-add-cart link-add mb-1"
                                        id=""
                                        onClick={() =>
                                            verifyItens(tourResponse.modalities[modalityNumber])
                                        }
                                    /* disabled={
                                      (tourResponse.reservationSystem === 99 &&
                                        cart?.isProductBdB === true) ||
                                        (tourResponse.reservationSystem === 0 &&
                                          cart?.isProductC2Rio === true)
                                        ? true
                                        : false
                                    } */
                                    >
                                        Comprar
                                    </button>
                                    {/* {(tourResponse.reservationSystem === 99 &&
                        cart?.isProductBdB === true) ||
                        (tourResponse.reservationSystem === 0 &&
                          cart?.isProductC2Rio === true) ? (
                            <div className="bg-danger-custom">
                            <small className="text-center" style={{ fontSize: ".6em" }}>
                              {t("slowBuy.tour.textOperator")}
                            </small>
                          </div>
                      ) : (
                        ''
                      )} */}
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    
                    <Modal
                        className="modal-confirm"
                        show={alert}
                        onHide={() => {
                            setAlert(false);
                        }}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                    >
                        <div className="modal-body text-center">
                            <div>
                                {/* <FontAwesomeIcon
                      icon={['fal', 'times-circle']}
                      size="5x"
                      style={{ fontSize: '7.5em', color: '#1f6a5d' }}
                    /> */}
                            </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: alertMessage,
                                }}
                                className="px-md-5"
                                style={{ padding: '0 3rem' }}
                            ></div>
                            <div>
                                <button
                                    type="submit"
                                    className="btn btn-primary form-button px-4 py-2"
                                    onClick={
                                        enableCart === true
                                            ? () => auth(tourResponse.modalities[modalityNumber])
                                            : () => setAlert(false)
                                    }
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </Modal>

                    <Modal
                        className="modal-confirm"
                        show={alertPromo}
                        onHide={() => {
                            setAlertPromo(false);
                        }}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                    >
                        <div className="modal-body text-center">
                            <div>
                                {/* <FontAwesomeIcon
                      icon={['fal', 'times-circle']}
                      size="5x"
                      style={{ fontSize: '7.5em', color: '#1f6a5d' }}
                    /> */}
                            </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: alertMessage,
                                }}
                                className="px-md-5"
                                style={{ padding: '0 3rem' }}
                            ></div>

                            <div>
                                <button
                                    type="submit"
                                    className="btn btn-primary form-button px-4 py-2"
                                    onClick={() => setAlertPromo(false)}
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default SlowBuyTicket;