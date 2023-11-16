import axios from 'axios'

export const GET_HOLDING_BEGIN = "GET_HOLDING_BEGIN"
export const GET_HOLDING_SUCCESS = "GET_HOLDING_SUCCESS"
export const GET_HOLDING_FALIURE = "GET_HOLDING_FALIURE"
export const GET_COIN_MARKET_BEGIN = "GET_COIN_MARKET_BEGIN"
export const GET_COIN_MARKET_SUCCESS = "GET_COIN_MARKET_SUCCESS"
export const GET_COIN_MARKET_FALUIRE = "GET_COIN_MARKET_FALUIRE"
//Holdings
export const getHoldingsBegin = () => ({
    type: GET_HOLDING_BEGIN
})

export const getHoldingsSuccess = (myHoldings: any) => ({
    type: GET_HOLDING_SUCCESS,
    payload: { myHoldings }
})

export const getHoldingsFaliure = (error: any) => ({
    type: GET_HOLDING_FALIURE,
    payload: { error }
})

export function getHoldings(holdings = [], currency = "usd", orderBy = "market_cap_desc"
    , sparkline = true, priceChangePerc = "7d", perPage = 10, page = 1) {

    return dispatch => {
        dispatch(getHoldingsBegin())

        let ids = holdings.map((item: any) => { return item.id }).join(",")

        let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&
        order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}
        &price_change_percentage=${priceChangePerc}&ids=${ids}`

        const config = {
            headers: { Accept: 'application/json' }
        }

        return axios.get(apiUrl, config)
            .then((response) => {
                if (response.status == 200) {
                    const myHoldings = response.data.map((item: any) => {
                        const coin: any = holdings.find(a => a.id === item.id);

                            const price7d = item.current_price / (1 + item.price_change_percentage_7d_in_currency * 0.01);

                            const sparklinePrices = item.sparkline_in_7d?.price || [];

                            return {
                                id: item.id,
                                name: item.name,
                                symbol: item.symbol,
                                image: item.image,
                                current_price: item.current_price,
                                qty: coin.qty,
                                total: coin.qty * item.current_price,
                                price_change_percentage_7d_in_currency: item.price_change_percentage_7d_in_currency,
                                holding_value_change_7d: (item.current_price - price7d) * coin.qty,
                                sparkline_in_7d: {
                                    value: sparklinePrices.map((price) => {
                                        return price * coin.qty;
                                    }),
                                },
                            };
                        
                    }) 
                    console.log("myHoldings", JSON.stringify(myHoldings));
                    dispatch(getHoldingsSuccess(myHoldings));
                } else {
                    dispatch(getHoldingsFaliure(response.data));
                }
            })
            .catch((error) => {
                console.error("API request error:", error);
                dispatch(getHoldingsFaliure(error));
            });
    }
}

//Coin Market

export const getCoinMarketBegin = () => ({
    type: GET_COIN_MARKET_BEGIN
})

export const getCoinMarketSuccess = (coins: any) => ({
    type: GET_COIN_MARKET_SUCCESS,
    payload: { coins }
})

export const getCoinMarketFaliure = (error: any) => ({
    type: GET_COIN_MARKET_FALUIRE,
    payload: { error }
})

export  function getCoinMarket(currency = "usd", orderBy = "market_cap_desc"
    , sparkline = true, priceChangePerc = "7d", perPage = 10, page = 1) {

    return dispatch => {
        dispatch(getCoinMarketBegin())

        let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`

        const config = {
            headers: { Accept: 'application/json' }
        }
        return axios.get(apiUrl, config)
            .then((response) => {
                if (response.status == 200) {
                    dispatch(getCoinMarketSuccess(response.data))
                } else {
                    dispatch(getCoinMarketFaliure(response.data))
                }
            }).catch((error) => {
                dispatch(getCoinMarketFaliure(error))
            })
    }

}
