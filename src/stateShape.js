const { default: Loader } = require("./components/Loader")
const { default: Watchlists } = require("./watchlist/containers/WatchlistSelector")

const watchlists = {
    id: '123',
    name: 'MyWatchlist',
    tickers: ['AAPL','NIO','CHGG'],
    created: Date.now(),
    modified: Date.now(),
}

const ticker = {
    name: 'Apple Inc.',
    logo: '',
    symbol: 'AAPL',
    exchange: '',
    marketcap: '',
    prevClose: {
        o: 115.55,
        c: 115.97,
        h: 117.59,
        l: 114.13,
    },
    active: true,
}