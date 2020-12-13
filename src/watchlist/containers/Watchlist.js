import React, { useState, useEffect } from 'react'
import { useWatchlistContext } from '../../libs/contextLib'
import WatchlistItem from '../components/WatchlistItem'
import Loader from '../../components/Loader'
import NoData from '../../components/NoData'

export default function Watchlist(props) {
    const {
        watchlists,
        activeWatchlist,
        setActiveWatchlist
    } = useWatchlistContext()
    const [isLoading, setIsLoading] = useState(props.isLoading)
    const [watchlist, setWatchlist] = useState({})

    useEffect(() => {
        if(!props.loading){
            setWatchlist(activeWatchlist)
        }
        setIsLoading(props.loading)
    },[props.loading, activeWatchlist])

    function renderWatchlist() {
        const { tickers } = watchlist
        return (
            <div>
                <div>
                    {!isLoading && tickers.map((val) => {
                        return (
                            <div key={val}>
                                <WatchlistItem ticker={val} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    function renderNoDataMessage(){
        return <NoData text={'Add Ticker'}/>
    }

    function renderView(){
        if(watchlist.tickers.length > 0){
            return renderWatchlist()
        }else{
            return renderNoDataMessage()
        }
    }

    if(isLoading){
        return <Loader/>
    }

    return (
        <div>
            {
                watchlists.length > 0
                    ? renderView()
                    : <NoData text={'Add Watchlist'} />
            }
        </div>
    )
}