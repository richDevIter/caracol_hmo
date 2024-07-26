'use client'

import dynamic from 'next/dynamic';
import Image from 'next/image'
import styles from './Header.module.css';

import Link from 'next/link';
import { Suspense, useState } from 'react';
import useWindowSize from '@/data/hooks/useWindowSize';
import { IconBars, IconBarsHeader, IconHelp, IconSearch, IconSingleUser } from '@/assets/icons';
import HeaderDropdownLanguage from '@/components/HeaderDropdownLanguage/HeaderDropdownLanguageNew';
import { DropDownLanguageSkeleton } from './skeletons';
import HeaderDropDownCart from '@/components/HeaderDropDownCart/HeaderDropDownCart';
import MenuSideBar from '@/components/MenuSidebar/MenuSideBar';

export interface propCartHeader {
  messageCart?: any,
  lng: any
}


const DynamicCartSideBar = dynamic(() => import('@/components/CartSideBar/CartSideBar'), {
  ssr: false,
})

const Header: React.FC<propCartHeader> = ({
  messageCart = false, lng
}) => {
  const help: string = lng === "pt" ? "Ajuda" : lng === "en" ? "Help" : lng === "es" ? "Ayuda" : 'Ajuda';
  const createAccount: string = lng === "pt" ? "Criar Conta" : lng === "en" ? "Create Account" : lng === "es" ? "Crea una Cuenta" : 'Criar Conta';

  const [isVisible, setIsVisible] = useState<any>(false);
  const [openCart, setOpenCart] = useState(false);
  const [open, setOpen] = useState(false);

  const size = useWindowSize();

  return (
    <>
      <header
        className={`${styles.nav_header} flex items-center justify-between px-0`}
      >
        <div className="container-page mx-auto grid grid-cols-12 items-center justify-between md:justify-start">
          <div className='col-span-2 sm:col-span-1 lg:col-span-1'>
            <div className={`${styles.bg_icon_bars}`} onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
              {IconBarsHeader('42px', '28px', '#FFFFFF')}
            </div>
          </div>
          <div className="col-span-4 sm:col-span-4 lg:col-span-2">
            <a className="w-auto" href="/">
              <Image
                alt={`${process.env.NEXT_PUBLIC_CLIENT_NAME}`}
                src={`${process.env.NEXT_PUBLIC_CLIENT_LOGO}`}
                width={180}
                height={100}
                loading="eager"
              />
            </a>
          </div>
          <div className="col-span-6 sm:col-span-7 lg:col-span-9 flex items-center justify-end">
            <div
              className={`${styles.nav_item_c2} hidden lg:flex`}
              style={{ width: '96.9px' }}
            >
              <Suspense fallback={<DropDownLanguageSkeleton />}>
                <HeaderDropdownLanguage />
              </Suspense>
            </div>

            <div
              className={`${styles.nav_item_c2}  ${styles.nav_item_help} hidden lg:flex font-medium gap-2`}
            >
              {IconSingleUser('#000000', '20', '20')}
              <a href={`/login`} title="Login">
                Login
              </a>
            </div>

            <div
              className={`${styles.nav_item_c2} flex`}
              style={{ width: '101.922px' }}
            >
              {size.width > 991 ? (
                <HeaderDropDownCart messageCart={messageCart} />
              ) : (
                <>
                  <DynamicCartSideBar
                    open={openCart}
                    setOpen={setOpenCart}
                    messageCart={messageCart}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <MenuSideBar open={open} setOpen={setOpen} />
    </>
  );

}

export default Header