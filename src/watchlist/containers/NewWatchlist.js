import React, { useState } from "react";
import { API } from "aws-amplify";
import Form from "react-bootstrap/Form";
import LoaderButton from "../../components/LoaderButton";
import { onError } from "../../libs/errorLib";

export default function NewWatchlist(props) {
    const [watchlistName, setWatchlistName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return watchlistName.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
            await createWatchlist(watchlistName);
        } catch (e) {
            onError(e);
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