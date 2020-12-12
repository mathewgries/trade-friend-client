import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useAppContext, WatchlistContext } from "../../libs/contextLib";
import { onError } from "../../libs/errorLib";
import { useHistory } from "react-router-dom";
import NewWatchlist from './NewWatchlist'
import WatchlistSelector from './WatchlistSelector'
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
            <div>
                <div>
                    <NewWatchlist />
                </div>
                <div>
                    <WatchlistSelector />
                </div>
                <div>
                    <Watchlist/>
                </div>
            </div>
        )
    }

    return (
        <div className="watchlist-container">
            <WatchlistContext.Provider
                value={{
                    watchlists,
                    isLoading,
                    activeWatchlist,
                    setActiveWatchlist
                }}
            >
                {isAuthenticated ? renderWatchlists() : renderLander()}
            </WatchlistContext.Provider>
        </div>
    );

}