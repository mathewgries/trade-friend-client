import React from 'react'
import { useWatchlistContext } from '../../libs/contextLib'
import WatchlistItem from '../components/WatchlistItem'

export default function Watchlist(props) {
    const { isLoading, activeWatchlist } = useWatchlistContext()


    function renderWatchlist() {
        const { tickers } = activeWatchlist
        return (
            <div>
                {tickers.map((val) => {
                    return <WatchlistItem ticker={val} />
                })}
            </div>
        )
    }

    return (
        <div>
            {!isLoading && renderWatchlist()}
        </div>
    )
}