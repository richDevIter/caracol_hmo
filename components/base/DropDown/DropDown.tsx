"use client"

import React, { useState } from 'react'

import style from './DropDown.module.css'


const DropDown = (props: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [head, ...tail] = React.Children.toArray(props.children);
    return (
        <div
            className={`${style.menu} `}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div className={`flex items-center text-base font-medium ${props?.styleHeader}`}>
            {head}
            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
            </div>
            {isOpen &&
                <div className={`${style.open} ${props?.style}`}>
                    <>
                        {tail.map((cItem: any, index: any) => {
                            return (
                                <div key={index} className={`${style.item}`} onClick={cItem.onClick}>
                                    {cItem}
                                </div>
                            )
                        })
                        }
                    </>

                </div>
            }
            
        </div>
    )
}

export default DropDown