import React, { useEffect } from "react";
import { useAppContext } from '../libs/contextLib'
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
    const history = useHistory()
    const { isAuthenticated } = useAppContext()

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/watchlists')
        }
    }, [isAuthenticated,history])

    function renderLander() {
        return (
            <div className="lander">
                <h1>Trade Friend</h1>
                <p className="text-muted">Smart Chart Alerting</p>
                <div className="pt-3">
                    <Link to="/login" className="btn btn-info btn-lg mr-3">
                        Login
                    </Link>
                    <Link to="/signup" className="btn btn-success btn-lg">
                        Signup
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="Home">
            {!isAuthenticated && renderLander()}
        </div>
    );
}