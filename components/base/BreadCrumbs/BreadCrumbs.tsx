import { IconArrowRight } from '@/assets/icons';
import React from 'react';

import styles from './BreadCrumbs.module.css'
import Link from 'next/link';

export interface propBread {
    tourResponse: any;
}

const Breadcrumb: React.FC<propBread> = ({
    tourResponse,
}: propBread) => {    
    return (
        <>
            <div className={`${styles.breadcrumbs} flex items-center` }>
                <Link style={{textDecoration: 'none'}} href="/">
                <span>Home</span>
                </Link>
                <span className="px-2 block" style={{width: '22px'}}>
                    {IconArrowRight}
                </span> 
                <Link style={{textDecoration: 'none'}} href={`/atividades/${tourResponse.eventLocation.split(',')[0].toLowerCase().replaceAll(' ', '-')}`}>
                <span>{tourResponse.eventLocation.split(',')[0]}</span>
                </Link>               
                <span className="px-2 block" style={{width: '22px'}}>
                    {IconArrowRight}
                </span>
                <span>{tourResponse.productName.split(',')[0]}</span>
            </div>
        </>
    )
}

export default Breadcrumb;