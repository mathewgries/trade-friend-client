import React, { useState } from "react";
import { API } from "aws-amplify";
import { useWatchlistContext } from '../../libs/contextLib'
import Form from "react-bootstrap/Form";
import LoaderButton from "../../components/LoaderButton";
import { onError } from "../../libs/errorLib";

export default function NewWatchlistItem(props) {
    const {
        watchlists,
        activeWatchlist,
        setActiveWatchlist
    } = useWatchlistContext()
    const [ticker, setTicker] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return ticker.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        const data = {
            watchlistName: activeWatchlist.watchlistName,
            tickers: [...activeWatchlist.tickers, ticker]
        }

        try {
            await createWatchlistItem(data);
            setActiveWatchlist({ ...activeWatchlist, ...data })
            setTicker('')
        } catch (e) {
            onError(e);
        }finally{
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
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size='sm'>
                    <LoaderButton
                        block
                        type="submit"
                        variant="primary"
                        isLoading={isLoading}
                        disabled={!validateForm()}
                    >
                        Add
                </LoaderButton>
                </Form.Group>
            </Form>
        )
    }

    return (
        <div>
            {
                watchlists.length > 0
                    ? renderView()
                    : null
            }
        </div>
    )

}