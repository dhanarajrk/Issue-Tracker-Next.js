'use client'

import { Button, Flex } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams(); //to extract ReadOnly params string eg. "?page=3" ( but can make it edible using useURLParams() ) 

    const pageCount = Math.ceil(itemCount / pageSize)
    if (pageCount <= 1) return null //If total number of page turns out to be <=1 then, no need for pagination so return null instead of UI elements

    //function to update new page number and redirect to the new page:
    const changePage = (newPageNumber: number) => {
        const params = new URLSearchParams(searchParams); //URLSearchParams() will create an object that contains converted seperate params feilds ?page=3 --> {"page" : "3"} which is Editable 
        params.set("page", newPageNumber.toString()) //convert newPageNumber to string and set {"page" : "newPageNumber"} -> {"page" : "4"}
        router.push(`/issues/list?${params.toString()}`) //concatenate updated page params as string to redirect to "/issues/list?page=4"
    }

    return (
        <div>
            <Flex gap='2' align='center'>

                <Button variant='soft' disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
                    <FaChevronLeft />
                    Previous
                </Button>

                <span>Page {currentPage} of {pageCount}</span>

                <Button variant="soft" disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)}>
                    Next
                    <FaChevronRight />
                </Button>
                
            </Flex>
        </div>
    )
}

export default Pagination