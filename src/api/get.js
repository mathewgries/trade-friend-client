const requestHandler = require('./requestHandler.js')

// https://api.polygon.io/v1/open-close/AAPL/2020-10-14?apiKey=VvY5VBdSwesmpbxpx4hCEzxBl3bkGpXh
async function getDetails(ticker){
    const req = '/v1/meta/symbols/'+ticker+'/company?'
    return await requestHandler(req)
}

// v2/aggs/ticker/AAPL/range/1/day/2020-10-01/2020-10-31?sort=asc&limit=10&apiKey=eCahHWlyNG0rOGbTSDjy_rG0tV1_2MQ7
async function getChartData(data){
    const {ticker, multiplier, timespan, startDate, endDate } = data
    const uri = `/v2/aggs/ticker/${ticker}/range/${multiplier}/${timespan}/${startDate}/${endDate}?sort=asc&limit=50000&`
    return await requestHandler(uri)
}

async function getPrevClose(ticker){
    const uri = `/v2/aggs/ticker/${ticker}/prev?`
    return await requestHandler(uri)
}

module.exports = {
    getDetails,
    getChartData,
    getPrevClose,
}

{/*
    Ticker Details
    https://api.polygon.io/v1/meta/symbols/AAPL/company?apiKey=VvY5VBdSwesmpbxpx4hCEzxBl3bkGpXh

    Previous Close - single ticker
    https://api.polygon.io/v2/aggs/ticker/AAPL/prev?apiKey=VvY5VBdSwesmpbxpx4hCEzxBl3bkGpXh

    Previous Close - All tickers
    https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2020-10-14?apiKey=VvY5VBdSwesmpbxpx4hCEzxBl3bkGpXh
*/}