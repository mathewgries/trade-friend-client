import React from 'react'

const WatchlistItem = (props) => {

    return (
        <div className={'watchlist-item'}>
            {props.ticker}
        </div>
    )
}

export default WatchlistItem