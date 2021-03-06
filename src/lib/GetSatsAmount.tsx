import axios from "axios"
import { API_YADIO_URL } from './Config'

interface SatsAmountSuccessCallback {
    (satsAmount: number): void;
}

export function getSatsAmount(amount: string, currency: string, callback: SatsAmountSuccessCallback) {
    let sats: number = 0

    axios
        .get(`${API_YADIO_URL}convert/${amount}/${currency}/BTC`, undefined)
        .then((response: any) => {
            if (response.data?.rate) {
                sats = Math.round(response.data.result * 100000000)

                if (callback)
                    callback(sats)
            }
        })
        .catch((response: any) => {
            //reject(response)
        })

    return sats
}