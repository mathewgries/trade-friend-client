import React from 'react'


export default function WatchlistHeader() {
    return (
        <thead className='watchlist-header'>
            <tr>
                <th className={'header-item'}>Ticker</th>
                <th className={'header-item'}>Price</th>
                <th className={'header-item'}>High</th>
                <th className={'header-item'}>Low</th>
                <th className={'header-item'}></th>
            </tr>
        </thead>
    )
}