'use client'
import dynamic from 'next/dynamic';
import Image from 'next/image'
import Link from 'next/link';
import React, { Suspense, useState } from 'react'

import { IconBars, IconHelp, IconNext, IconSearch } from '@/assets/icons';


import styles from './HeaderAffiliate.module.css';
import useWindowSize from '@/data/hooks/useWindowSize';
import { DropDownLanguageSkeleton } from '@/app/[lng]/(overview)/ui/skeletons';
import HeaderDropdownLanguage from '../HeaderDropdownLanguage/HeaderDropdownLanguageNew';

export interface propCartHeader {
    messageCart?: any,
}

const HeaderAffiliate: React.FC<propCartHeader> = ({
    messageCart = false
}) => {
    const [isVisible, setIsVisible] = useState<any>(false);
    const [openCart, setOpenCart] = useState(false);
    const [open, setOpen] = useState(false);

    const size = useWindowSize();

    return (
        <>
            <header className={`${styles.nav_header} flex items-center justify-between px-4`}>
                <div className='container mx-auto grid grid-cols-12 items-center justify-between md:justify-start'>
                    <div className='col-span-4 md:col-span-2'>
                        <Link className='' href='/'>
                            <Image
                                alt={`${process.env.NEXT_PUBLIC_CLIENT_NAME}`}
                                src={`${process.env.NEXT_PUBLIC_CLIENT_LOGO}`}
                                width={180}
                                height={100}
                                loading="eager"
                            />
                        </Link>
                    </div>
                    <div className='col-span-8 md:col-span-10 flex items-center justify-end gap-6'>
                        <div
                            className={`${styles.nav_item_c2} hidden lg:flex`}
                            style={{ width: '96.9px' }}
                        >
                            <Suspense fallback={<DropDownLanguageSkeleton />}>
                                <HeaderDropdownLanguage />
                            </Suspense>
                        </div>
                        <div className={`${styles.nav_item_c2} ${styles.dropdownHeader} flex gap-2`}>
                            <Link href={`${process.env.NEXT_PUBLIC_SERVER_SIG_URL}`}>
                                Seja um parceiro
                            </Link>
                            <span>{IconNext("#034C43", 16, 16)}</span>
                        </div>
                    </div>

                </div>

            </header>
        </>
    )
}

export default HeaderAffiliate