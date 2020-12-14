import React from 'react'

const WatchlistSelectorItem = (props) => {
    const { watchlist } = props

    return (
        <div className={'list-item'}>
            {watchlist.watchlistName}
        </div>
    )
}

export default WatchlistSelectorItem