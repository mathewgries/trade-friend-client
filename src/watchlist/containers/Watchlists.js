import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useAppContext, WatchlistContext } from "../../libs/contextLib";
import { onError } from "../../libs/errorLib";
import { useHistory } from "react-router-dom";
import NewWatchlist from './NewWatchlist'
import WatchlistSelector from './WatchlistSelector'
import NewWatchlistItem from './NewWatchlistItem'
import WatchlistHeader from '../components/WatchlistHeader'
import Watchlist from './Watchlist'
import '../style.css'

export default function Watchlists(props) {
    const history = useHistory()
    const { isAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(true);
    const [watchlists, setWatchlists] = useState([]);
    const [activeWatchlist, setActiveWatchlist] = useState({})

    useEffect(() => {
        async function onLoad() {
            if (!isAuthenticated) {
                return;
            }

            try {
                const watchlists = await loadWatchlists();
                setWatchlists(watchlists);
                setActiveWatchlist(watchlists[0])
            } catch (e) {
                onError(e);
            }

            setIsLoading(false);
        }

        onLoad();
    }, [isAuthenticated]);

    function loadWatchlists() {
        return API.get("watchlists", "/watchlists");
    }

    function renderLander() {
        return history.push('/')
    }

    function renderWatchlists() {
        return (
            <div className='view-container row'>
                <div className='inner-view-container col-3'>
                    <div>
                        <NewWatchlist loading={isLoading} />
                    </div>
                    <div>
                        <WatchlistSelector loading={isLoading} />
                    </div>
                </div>
                <div className='inner-view-container col-9'>
                    <table className='watchlist-table'>
                        <caption>
                            {watchlists.length > 0 ? activeWatchlist.watchlistName : null}
                        </caption>
                        <thead>
                            <WatchlistHeader />
                        </thead>
                        <tbody>
                            <Watchlist loading={isLoading} />
                        </tbody>
                    </table>
                    <div>
                        <NewWatchlistItem loading={isLoading} />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <WatchlistContext.Provider
                value={{
                    watchlists,
                    setWatchlists,
                    activeWatchlist,
                    setActiveWatchlist
                }}
            >
                {isAuthenticated ? renderWatchlists() : renderLander()}
            </WatchlistContext.Provider>
        </div>
    );

}