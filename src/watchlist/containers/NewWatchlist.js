import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useWatchlistContext } from "../../libs/contextLib";
import Form from "react-bootstrap/Form";
import LoaderButton from "../../components/LoaderButton";
import { onError } from "../../libs/errorLib";

export default function NewWatchlist(props) {
    const {
        watchlists,
        setWatchlists,
        setActiveWatchlist
    } = useWatchlistContext()
    const [watchlistName, setWatchlistName] = useState('');
    const [isLoading, setIsLoading] = useState(props.loading)

    useEffect(() => {
        setIsLoading(props.loading)
    },[props.loading])

    function validateForm() {
        return watchlistName.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const newWatchlist = await createWatchlist(watchlistName);
            setActiveWatchlist(newWatchlist)
            setWatchlists([...watchlists, newWatchlist])
        } catch (e) {
            onError(e);
        } finally {
            setWatchlistName('')
            setIsLoading(false);
        }
    }

    function createWatchlist(watchlistName) {
        return API.post("watchlists", "/watchlists", {
            body: { watchlistName }
        });
    }

    return (
        <Form onSubmit={handleSubmit} className="new-watchlist">
            <Form.Group controlId='watchlistName' size='sm'>
                <Form.Control
                    autoFocus
                    type="text"
                    value={watchlistName}
                    onChange={(e) => setWatchlistName(e.target.value)}
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