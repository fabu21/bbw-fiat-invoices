import axios from "axios"
import { API_YADIO_URL } from './Config'

interface AvailableCurrenciesSuccessCallback {
    (currencies: AvailableCurrency[]): void;
}

export interface AvailableCurrency {
    label: string, 
    value:string
}

export function getAvailableCurrencies(callback: AvailableCurrenciesSuccessCallback) {
    let result: AvailableCurrency[] = []

    axios
        .get(`${API_YADIO_URL}currencies`, undefined)
        .then((response: any) => {
            if (response.data) {
                for(let element in response.data) {
                    result.push({label:element, value: element})
                }

                if (callback)
                    callback(result)
            }
        })
        .catch((response: any) => {
            //reject(response)
        })

    return result
}