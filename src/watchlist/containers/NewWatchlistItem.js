import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { getDetails } from '../../api/get'
import { useWatchlistContext } from '../../libs/contextLib'
import Form from "react-bootstrap/Form";
import LoaderButton from "../../components/LoaderButton";
import { onError } from "../../libs/errorLib";

export default function NewWatchlistItem(props) {
    const {
        watchlists,
        setWatchlists,
        activeWatchlist,
        setActiveWatchlist
    } = useWatchlistContext()
    const [ticker, setTicker] = useState('')
    const [isLoading, setIsLoading] = useState(props.loading);

    useEffect(() => {
        setIsLoading(props.loading)
    }, [props.loading])

    function validateForm() {
        return ticker.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        const results = await loadTickerData()
        if (results.status === 'OK') {
            await loadWatchlistItem()
        } else {
            onError(results.message)
            setTicker('')
            setIsLoading(false)
            return
        }
    }

    async function loadTickerData() {
        return await Promise.all([
            await getDetails(ticker)
        ])
            .then((values) => {
                if (values[0].error) {
                    throw new Error()
                }
                return { status: 'OK' }
            })
            .catch((error) => {
                return { status: 'ERROR', message: 'Could not find symbol' }
            })
    }

    async function loadWatchlistItem() {
        const data = {
            watchlistName: activeWatchlist.watchlistName,
            tickers: [...activeWatchlist.tickers, ticker]
        }

        try {
            await createWatchlistItem(data);
            const updatedWatchlist = { ...activeWatchlist, tickers: data.tickers }
            setActiveWatchlist(updatedWatchlist)
            setWatchlists(watchlists.map((wl) => wl.watchlistId === activeWatchlist.watchlistId ? updatedWatchlist : wl))
            setTicker('')
        } catch (e) {
            onError(e);
        } finally {
            setIsLoading(false);
        }
    }

    function createWatchlistItem(data) {
        return API.put("watchlists", `/watchlists/${activeWatchlist.watchlistId}`, {
            body: data
        });
    }

    function renderView() {
        return (
            <Form onSubmit={handleSubmit} className="new-watchlist-item">
                <Form.Group controlId='ticker' size='sm'>
                    <Form.Control
                        autoFocus
                        type="text"
                        placeholder={'Add ticker to watchlist...'}
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size='sm'>
                    <LoaderButton
                        hidden={true}
                        block
                        type="submit"
                        variant="primary"
                        isLoading={isLoading}
                        disabled={!validateForm()}
                    >
                        {!isLoading ? 'Add' : ''}
                    </LoaderButton>
                </Form.Group>
            </Form>
        )
    }

    return (
        watchlists.length > 0
            ? renderView()
            : null
    )

}