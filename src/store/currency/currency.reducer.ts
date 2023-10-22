import { createSlice } from "@reduxjs/toolkit";
import { compareCountryCurrency, getCodes } from "../../utils/API/API"
import { Result, Codes } from "../../utils/API/API";
import { BlobOptions } from "buffer";

export const DEFAULT_BASE : string = 'USD';
export const DEFAULT_TARGET : string = 'PKR';

export const currencyCompare = async (base : string, target : string, amount : number = 1) : Promise<Result | Error> => {
    return await compareCountryCurrency(base, target, amount)
        .then(data => {
            if (data) {
                return data
            } else {
                throw Error('Something Went Wrong')
            }
        })
}

export const getCountryCode = async () : Promise<Codes | Error> => {
    return await getCodes()
        .then((data : Codes) => {
            if (data) {
                return data
            } else {
                throw Error('Something Went Wrong')
            }
        })
}


export type CurrState = {
    currencyData: Result;
    countryCodes: Codes;
    initialLoading: boolean;
    isLoading: boolean;
    error: boolean;
    resultData: {};
}

const INITIAL_STATE : CurrState = {
    currencyData: {} as Result,
    countryCodes: {} as Codes,
    initialLoading: false,
    isLoading: false,
    error: false,
    resultData: {}
}

const CurrencySlice = createSlice({
    name: 'currency',
    initialState: INITIAL_STATE,
    reducers: {
        getCurrencyData(state, action) {
            state.currencyData = action.payload
        },
        getCountryCodes(state, action) {
            state.countryCodes = action.payload
        }
    }
})

export const { getCurrencyData, getCountryCodes } = CurrencySlice.actions
export const CurrencyReducer = CurrencySlice.reducer


// export const CurrencyReducer = (state = INITIAL_STATE, action = {}) => {
//     const { type, payload } = action;


//     switch (type) {
//         case CURR_TYPES.INIT_START_FETCHING:
//             return {
//                 ...state,
//                 initialLoading: true,
//                 isLoading: true
//             }
//         case CURR_TYPES.START_FETCHING:
//             return {
//                 ...state,
//                 isLoading: true
//             }
//         case CURR_TYPES.FETCHING_SUCCESS:
//             return {
//                 ...state,
//                 initialLoading: false,
//                 isLoading: false
//             }
//         case CURR_TYPES.FETCHING_FAIL:
//             return {
//                 ...state,
//                 error: true
//             }
//         case CURR_TYPES.GET_CURRENCY_DATA:
//             return {
//                 ...state,
//                 currencyData: payload,
//                 initialLoading: false,
//                 isLoading: false,
//             }
//         case CURR_TYPES.GET_COUNTRY_CODES:
//             return {
//                 ...state,
//                 countryCodes: payload
//             }
//         default:
//             return state
//     }
// }