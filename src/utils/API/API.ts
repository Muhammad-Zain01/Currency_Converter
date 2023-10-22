import { CatchClause } from "typescript"

const BASE_URL: string = 'https://v6.exchangerate-api.com/v6'
const ACCESS_TOKEN: string = 'f465c02596bc9d5267b6faac'

export type Codes = {
    [key: string] : string
}

export type Result = {
    base: string,
    conversion_rate: number,
    conversion_result: number,
    target: string,
    last_updated: Date
}

const getExchangeAPI = async (params: string) => {
    var requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow'
    };
    try {
        const response = await fetch(`${BASE_URL}/${ACCESS_TOKEN}/${params}`, requestOptions)
        return response;
    } catch (error : any) {
        if (error.message.toLowerCase() == 'failed to fetch') {
            return false;
        }
    }
}

export const compareCountryCurrency = async (base_curr: string, target_curr: string, amount: number) => {
    return await getExchangeAPI(`pair/${base_curr}/${target_curr}/${amount}`)
        .then((response) => {
            if (response) return response.json()
            return false
        })
        .then((response) => {
            if (response) {
                const result : Result = {
                    base: response?.base_code,
                    conversion_rate: response?.conversion_rate,
                    conversion_result: response?.conversion_result,
                    target: response?.target_code,
                    last_updated: response?.time_last_update_utc
                }
                return result
            }
            return false;
        })
}

export const getCodes = async () => {
    return await getExchangeAPI(`codes`)
        .then((response) => {
            if (response) return response.json()
            return false
        })
        .then((response) => {
            if (response) {
                const result = response?.supported_codes.reduce((acc : Codes, currentValue : string[]) : Codes => {
                    acc[currentValue[0]] = currentValue[1]
                    return acc
                }, {})

                return result
            }
            return false;
        })
}
