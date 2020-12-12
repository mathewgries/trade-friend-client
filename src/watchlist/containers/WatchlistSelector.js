import React from "react";
import { useWatchlistContext } from "../../libs/contextLib";
import WatchlistSelectorItem from '../components/WatchlistSelectorItem'
import Loader from '../../components/Loader'
import NoData from '../../components/NoData'

export default function Watchlists(props) {
    const {
        isLoading,
        watchlists,
        setActiveWatchlist
    } = useWatchlistContext()

    if (isLoading) {
        return <Loader />
    }

    function getSelectorList() {
        return (
            <div>
                {!isLoading && watchlists.map((val) => {
                    return (
                        <div
                            key={val.watchlistId}
                            onClick={() => setActiveWatchlist(val)}
                        >
                            <WatchlistSelectorItem watchlist={val} />
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div>
            {watchlists.length > 0 ? getSelectorList() : <NoData text={'Add Watchlist'}/>}
        </div>
    )
}