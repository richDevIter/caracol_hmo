import React, { useEffect, useState } from 'react';

export interface propPage {
    totalRows: any;
    pageCount: number;
    setPageCount: any;
}

const ActivitiesPagination: React.FC<propPage> = ({
    totalRows, pageCount, setPageCount
}: propPage) => {

    const [numberOfPages, setNumberOfPages] = useState<any>([]);

    const paginateFoward = () => {
        setPageCount(pageCount + 1);
    }

    const paginateBack = () => {
        setPageCount(pageCount - 1);
    }

    useEffect(() => {
        if (totalRows) {
            setNumberOfPages(Object.keys(new Array(Math.ceil((totalRows / 5))).fill(null)).map((elem: any) => Number(elem) + 1));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalRows])

    return (
        <div className="flex justify-end my-4">
            <div className="flex justify-between">

                <div className="flex items-center">

                    {/* {
                    pageCount > 3
                        ?
                        <button className='pagination-btn' onClick={paginateBack}>{
                            <FontAwesomeIcon
                                icon={["fal", "chevron-left"]}
                                size="1x"
                                style={{ fontSize: "16px" }}
                            />
                        }</button>
                        :
                        ''
                } */}

                    {
                        pageCount > 3 &&
                        <>
                            <button className={`pagination-btn ${Number(pageCount) === 1 ? 'active' : ''}`} type='button' onClick={() => { setPageCount(1) }}>{1}</button>
                            <span>...</span>
                        </>
                    }

                    {numberOfPages.slice(pageCount > 3 ? Number(pageCount) - 3 : 0, pageCount > 3 ? Number(pageCount) + 2 : 5).map((elem: any, index: any) => {
                        return (
                            <div key={index}>
                                <button className={`pagination-btn ${Number(pageCount) === elem ? 'active' : ''}`} type='button' onClick={() => { setPageCount(elem) }}>{elem}</button>
                            </div>
                        );
                    })}

                    {
                        numberOfPages.length > 5 && pageCount + 2 < numberOfPages.length &&
                        <>
                            <span>...</span>
                            <button className={`pagination-btn ${Number(pageCount) === numberOfPages.length ? 'active' : ''}`} type='button' onClick={() => { setPageCount(numberOfPages.length) }}>{numberOfPages.length}</button>
                        </>
                    }

                    {/* {
                    (totalRows > (rowsPerPage * pageCount))
                        ?
                        <button className="pagination-btn" onClick={paginateFoward}>{
                            <FontAwesomeIcon
                                icon={["fal", "chevron-right"]}
                                size="1x"
                                style={{  fontSize: "16px" }}
                            />
                        }
                        </button>
                        :
                        ''
                } */}
                </div>
            </div>
        </div>
    )
}

export default ActivitiesPagination;