import axios from "axios"
import { IP_INFO_API_URL } from './Config'

interface CurrentLocationCurrencySuccessCallback {
    (defaultCurrency: string): void;
}

export function getCurrentLocationsCurrency(callback: CurrentLocationCurrencySuccessCallback) {
    axios
        .get(`${IP_INFO_API_URL}`, undefined)
        .then((response: any) => {
            if (response.data) {

                if (callback)
                    callback(response.data)
            }
        })
        .catch((response: any) => {
            //reject(response)
        })

    return "GTQ"
}