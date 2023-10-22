import { createSelector } from "reselect"
import { State } from "../root-reducer"
import { CurrState } from "./currency.reducer"
const selectCurrData = (state : State) : CurrState => (state.curr)

export const selectCurrencyData = createSelector(
    [selectCurrData],
    (curr) => (curr.currencyData)
)

export const selectCountryCodes = createSelector(
    [selectCurrData],
    (curr) => (curr.countryCodes)
)

export const selectInitialLoading = createSelector(
    [selectCurrData],
    (curr) => (curr.initialLoading)
)

export const selectLoading = createSelector(
    [selectCurrData],
    (curr) => (curr.isLoading)
)


export const selectError = createSelector(
    [selectCurrData],
    (curr) => (curr.error)
)