import * as marketActions from './marketAction'

const initialState = {
    myHoldings: [],
    coins: [],
    error: null,
    loading: false
}

const marketReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case marketActions.GET_HOLDING_BEGIN:
            return { ...state, loading: true };
        case marketActions.GET_HOLDING_SUCCESS:
            return {
                ...state,
                myHoldings: action.payload.myHoldings
            }
        case marketActions.GET_HOLDING_FALIURE:
            return {
                ...state,
                error: action.payload.error
            }
        case marketActions.GET_COIN_MARKET_BEGIN:
            return { ...state, loading: true };
        case marketActions.GET_COIN_MARKET_SUCCESS:
            return {
                ...state,
                myHoldings: action.payload.coins
            }
        case marketActions.GET_COIN_MARKET_FALUIRE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default marketReducer