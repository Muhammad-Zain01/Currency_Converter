import { combineReducers } from "redux";
import { CurrencyReducer } from "./currency/currency.reducer";
import { CurrState } from "./currency/currency.reducer";

export type State = {
    curr: CurrState
}

export const rootReducer = combineReducers({
    curr : CurrencyReducer
})