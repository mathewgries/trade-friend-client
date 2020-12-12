import React from 'react'
import { useWatchlistContext } from '../../libs/contextLib'
import WatchlistItem from '../components/WatchlistItem'
import Loader from '../../components/Loader'
import NoData from '../../components/NoData'

export default function Watchlist(props) {
    const {
        isLoading,
        watchlists,
        activeWatchlist
    } = useWatchlistContext()


    function renderWatchlist() {
        const { tickers } = activeWatchlist
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
        if(activeWatchlist.tickers.length > 0){
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