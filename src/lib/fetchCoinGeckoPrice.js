import { useState } from "react";


export const  fetchCoinGeckoPrice = async (coin) => {

    const [coinGeckoAPI,setCoinGeckoAPI] = useState()

    const getCoinGeckoAPI = async() => {
        if (coinGeckoAPI) {
            return coinGeckoAPI
        }
        const localCoinGeckoApi = new CoinGecko()
        setCoinGeckoAPI(localCoinGeckoApi);
        return localCoinGeckoApi;
    }

    if (!coin) {
        return null
    }
    const CoinGeckoClient = await getCoinGeckoAPI(); 
    let response = await CoinGeckoClient.coins.fetch(coin, {});
    let tickers = response.data.tickers
      
    /*
    if (typeof data.code === undefined || data.code != "200000") {
        throw new Error("unknown CoinGecko coin "+coin);
    }
    */

    let time = new Date().getTime()
    let price=tickers
    let source="coingecko"
    let ticker=coin
    this.setPrice(price, time, source, ticker)     
}