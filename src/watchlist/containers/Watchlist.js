import React, { useState, useEffect } from 'react'
import { useWatchlistContext } from '../../libs/contextLib'
import WatchlistItem from '../components/WatchlistItem'
import Loader from '../../components/Loader'
import NoData from '../../components/NoData'

export default function Watchlist(props) {
    const {
        watchlists,
        activeWatchlist,
    } = useWatchlistContext()
    const [isLoading, setIsLoading] = useState(props.isLoading)
    const [watchlist, setWatchlist] = useState({})

    useEffect(() => {
        if (!props.loading) {
            setWatchlist(activeWatchlist)
        }
        setIsLoading(props.loading)
    }, [props.loading, activeWatchlist])

    function renderWatchlist() {
        const { tickers } = watchlist
        return (
            !isLoading && tickers.map((ticker) => {
                return <WatchlistItem key={ticker} ticker={ticker} />
            })
        )
    }

    function renderNoDataMessage(text) {
        return (
            <tr>
                <td className='loading-div' colSpan="6">
                    <NoData text={text} />
                </td>
            </tr>
        )
    }

    function renderView() {
        if (watchlist.tickers.length > 0) {
            return renderWatchlist()
        } else {
            return renderNoDataMessage('Add Ticker')
        }
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

    return (
        watchlists.length > 0
            ? renderView()
            : renderNoDataMessage('Add Watchlist')
    )
}