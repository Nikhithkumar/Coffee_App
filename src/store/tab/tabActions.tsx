export const SET_TRADE_MODAL_VISIBILITY='SET_TRADE_MODAL_VISIBILITY'

export const setTradeModalVisibilitySuccess=(isVisible:boolean)=>({
    type:SET_TRADE_MODAL_VISIBILITY,
    payload:{isVisible}
})

export function setTradeModalVisibility(isVisible:boolean){
    return dispatch=>{
        dispatch(setTradeModalVisibilitySuccess(isVisible))
    }
}