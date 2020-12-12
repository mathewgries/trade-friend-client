import React from 'react'

const WatchlistSelectorItem = (props) => {
    const { watchlist } = props

    return (
        <div className={'watchlist-selector-item'}>
            {watchlist.watchlistName}
        </div>
    )
}

export default WatchlistSelectorItem