
import SelectBox from "./select.component"
import SwapButton from "./swap.component"
import { Card, Input, Skeleton } from "antd"
import ResultCard from "./result-card.component"
import {  useRef, useEffect } from "react"
// import { GetExchangeDataAsync } from "../store/currency/currency.action"
import { getCurrencyData,currencyCompare,  getCountryCode, getCountryCodes} from "../store/currency/currency.reducer"
import { useDispatch, useSelector } from "react-redux"
import { DEFAULT_BASE, DEFAULT_TARGET } from "../store/currency/currency.reducer"
import { selectCurrencyData, selectCountryCodes, selectInitialLoading, selectLoading, selectError } from "../store/currency/currency.selector"
import { ChangeEvent } from "react"


const CurrencyCard = () => {
    const dispatch = useDispatch();

    const compareCurrency = (base : string, target : string, amount : number) => {
        currencyCompare(base, target,amount).then(response => dispatch(getCurrencyData(response)))
    }
    useEffect(() => {
        getCountryCode().then(response=> dispatch(getCountryCodes(response)))
        currencyCompare(DEFAULT_BASE, DEFAULT_TARGET,1).then(response => dispatch(getCurrencyData(response)))
    },[])

    const currencyData = useSelector(selectCurrencyData)
    const codes = useSelector(selectCountryCodes)
    const error = useSelector(selectError)
    const isLoading = useSelector(selectLoading)
    const initialLoading = useSelector(selectInitialLoading)
    const resultData = {codes, currencyData}
    
    const currData = useRef({target: 'PKR', base: 'USD', amount: 1})
    
    const handleChangeValue = (e : ChangeEvent<HTMLInputElement>) => {
        currData.current.amount = Number(e.target.value)
        compareCurrency(currData.current?.base, currData.current?.target, Number(e.target.value))
    }
    const handleBase = (value : ChangeEvent<HTMLSelectElement>) : void =>{
        currData.current = ({...currData.current, base: String(value)})
        compareCurrency(String(value), currData.current?.target, currData.current?.amount)
    }
    const handleTarget = (value : ChangeEvent<HTMLSelectElement>) : void => {
        currData.current = ({...currData.current, target: String(value)})
        compareCurrency(currData.current?.base, String(value), currData.current?.amount)
    }
    const handleSwap = () : void => {
        currData.current = {...currData?.current, base: currData?.current.target, target: currData?.current.base }
        compareCurrency(currData.current?.base, currData.current?.target, currData.current?.amount)
    }

    return (
        <Skeleton active loading={initialLoading}>
            <Card className="currency-card">
                <Input type="number" defaultValue="1" onChange={handleChangeValue} className="currency-input" />
                <SelectBox data={codes} value={currData?.current.base} onChange={handleBase} />
                <SwapButton onClick={handleSwap} />
                <SelectBox data={codes} value={currData?.current.target} onChange={handleTarget}/>
                <ResultCard loading={isLoading} data={resultData} amount={currData?.current.amount}/>
            </Card>
        </Skeleton>
    )
}

export default CurrencyCard;