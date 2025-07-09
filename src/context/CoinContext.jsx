'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageKeys, urls } from '@/src/const';
import httpClient from '@/src/lib/util/httpclient';
import { useUser } from '@/src/context/UserContext';


const CoinContext = createContext({
  coinList: [],
  reloadCoinList: () => {},
});

export function CoinProvider({ children }) {
  const [coinList, setCoinList] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      reloadCoinList();
    }
  }, [user]);

  const reloadCoinList = async () => {
    try {

      const coinList = (await httpClient.get(urls.walletBlockchain)).data;
      const coinTicker = (await httpClient.get(urls.coinTicker)).data;

      const coinBalance = (await httpClient.get(urls.walletBalance)).data;
      coinList.forEach(coin => {
        const coinData = coinBalance.find(item => item.coinType === coin.coinType);
        if (coinData) {
          // coin.price = coinData.price;
          coin.balance = coinData.balanceDouble;
          coin.address = coinData.address;
        }
        const coinTickerData = coinTicker.find(item => item.symbol === coin.symbol);
        if (coinTickerData) {
          coin.price = coinTickerData.quotes.krw.price;
          coin.priceChange = coinTickerData.quotes.krw.percent_change_24h;
        }
      });
      setCoinList(coinList);
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
    }
  };


  return (
    <CoinContext.Provider value={{ coinList, reloadCoinList }}>
      {children}
    </CoinContext.Provider>
  );
}

export function useCoin() {
  return useContext(CoinContext);
} 