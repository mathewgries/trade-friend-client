import React, { useState, useEffect } from 'react'
import Loader from '../../components/Loader'
import { getPrevClose } from '../../api/get'

export default function WatchlistItem(props) {
    const [prevClose, setPrevClose] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function load() {
            const data = await getPrevClose(props.ticker)
            setPrevClose(data.results[0])
            setIsLoading(false)
        }
        load()
    }, [props.ticker])

    function renderView() {
        return (
            <tr>
                <td className='table-name-column'>
                    {prevClose.T}
                </td>
                <td>
                    {prevClose.o}
                </td>
                <td>
                    {prevClose.c}
                </td>
                <td>
                    {prevClose.h}
                </td>
                <td>
                    {prevClose.l}
                </td>
                <td>
                    {prevClose.v}
                </td>
            </tr>
        )
    }

    if (isLoading) {
        return (
            <tr>
                <td className='loading-div' colSpan="6">
                    <Loader />
                </td>
            </tr>
        )
    }

    return !isLoading && renderView()
}