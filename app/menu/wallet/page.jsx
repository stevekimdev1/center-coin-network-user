'use client';

import {
  Button,
  Modal,
} from "antd";
import React, { useEffect, useState } from "react";
import { comma } from "@/src/lib/util/numberUtil";
import { CopyOutlined, LockOutlined } from "@ant-design/icons";
import { App } from "antd";
import { QRCodeSVG } from 'qrcode.react';
import SwapModal from "./swapModal";
import { useCoin } from "@/src/context/CoinContext";
import TranslogModal from "./translogModal";
import SendModal from "./sendModal";
import { getCoinCategory } from "@/src/lib/util/coinUtil";
import httpClient from "@/src/lib/util/httpclient";
import { urls } from "@/src/const";
import { motion } from "framer-motion";
import { useString } from '@/src/context/StringContext';
import GoodsEvent from "./goodsEvent";
const Wallet = () => {
  const { coinList, reloadCoinList } = useCoin();
  const { message } = App.useApp();
  const { string } = useString();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [swapModalVisible, setSwapModalVisible] = useState(false);
  const [translogModalVisible, setTranslogModalVisible] = useState(false);
  const [sendModalVisible, setSendModalVisible] = useState(false);
  const [selectedCoinType, setSelectedCoinType] = useState(null);
  const [miningEventList, setMiningEventList] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    reloadCoinList();
    getMiningEventList();
  }, []);
  useEffect(() => {
  }, [coinList]);

  const getMiningEventList = () => {
    httpClient.get(urls.miningEventList).then((res) => {
      setMiningEventList(res.data);
    });
  }
  const readEvent = (idx) => {
    httpClient.put(urls.miningEventRead.replace('%s', idx)).then((res) => {
      getMiningEventList();
    });
  }
  return (
    <div id="wallet">
      <div className="wallet-section">
        <div className="wallet-balance">
          <div className="wallet-balance-title">{string.totalAssets}</div>
          <div className="wallet-balance-value">
            ${comma(coinList?.reduce((p, c) => p + (c?.balance || 0) * (c?.price || 0), 0) || 0, 0)}
          </div>
        </div>

        <div className="wallet-coin-list">
          <div className="wallet-coin-list-tab">
            <div className={`wallet-coin-title ${selectedTab == 0 ? 'active' : ''}`} onClick={() => { setSelectedTab(0); }}>{string.ownedCoins}</div>
            <div className={`wallet-coin-title ${selectedTab == 1 ? 'active' : ''}`} onClick={() => { setSelectedTab(1); }}>{string.goodsEvent}</div>
          </div>
          {selectedTab == 0 && coinList.map((coin, index) => {
            const event = miningEventList.find(e => e.coinType == coin.coinType);
            return (
              <div key={index} className="wallet-coin-card">
                <div className="wallet-coin-info">
                  <img src={coin.image} alt={coin.name} className="wallet-coin-img" />
                  <div className="wallet-coin-name">{coin.name}</div>
                  <div className="wallet-coin-balance">
                    {comma(coin.balance, 4)} {coin.name}
                    {coin.lockBalance > 0 && (
                      <div className="wallet-coin-lock-balance">
                        (
                        <span style={{ marginRight: 4 }}>
                          <LockOutlined style={{ verticalAlign: 'middle' }} />
                        </span>
                        {comma(coin.lockBalance, 4)})
                      </div>
                    )}
                    <div className="wallet-coin-krw">≈ {comma((coin?.balance || 0) * (coin?.price || 0), 0)} USD</div>
                  </div>
                </div>
                <div className="wallet-coin-actions">
                  <button className="wallet-action-outline" onClick={() => { setSelectedCoinType(coin.coinType); setTranslogModalVisible(true); }}>{string.transactionHistory}</button>
                  <button className="wallet-action" onClick={() => { setSelectedCoinType(coin.coinType); setSendModalVisible(true); }}>{string.send}</button>
                  {coin.coinType == 701 || coin.coinType == 401 ? <button className="wallet-action" onClick={() => { setSelectedAddress(coin.address); setSelectedCoin(coin); }}>{string.receive}</button> : <div className="wallet-action-disabled"></div>}
                </div>
                {event && (
                  <div className="wallet-coin-card-event">
                      <div className="wallet-coin-card-event-title">

                      <img src={coin.image} alt={coin.name} width={50} height={50}/>

                        {/* <motion.div
                          initial={{ scale: 0.3, opacity: 0 }}
                          animate={{ scale: [1.0, 1.6, 1.0, 1.2, 1.0], opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="gift-box"
                        >
                          <img src="/img/giftbox.png" alt="Gift Box" width={100} height={100} />
                        </motion.div> */}
                      </div>
                      <div className="wallet-coin-card-event-amount">
                      <p>{event.isEvent ? string.eventWon : string.miningComplete} {comma(event.amountDouble, 4)} {coinList.find(coin => coin.coinType == event.coinType)?.symbol}</p>
                      {!event.isPaid && (<p className="alert">{string.insufficientBalance}</p>)}
                      <div className="wallet-coin-card-event-amount-buttons">
                      {!event.isPaid && (<div className="wallet-coin-card-event-amount-button blue-button" onClick={() => { window.open('https://www.gopax.co.kr/exchange?market=CENT-KRW', '_blank'); }}>Gopax</div>)}
                      {!event.isPaid && (<div className="wallet-coin-card-event-amount-button blue-button" onClick={() => { window.open('https://www.digifinex.com/en-ww/trade/USDT/CENT?tradeKind=spot', '_blank'); }}>Digifinex</div>)}
                        <div className="wallet-coin-card-event-amount-button" onClick={() => { readEvent(event.idx); }}>{string.close}</div>
                      </div>
                      </div>
                  </div>
                )}
              </div>
            );
          })}
          {selectedTab == 1 && <GoodsEvent />}
        </div>

        <Modal open={selectedAddress} onCancel={() => setSelectedAddress(null)} footer={null}>
          <div style={{ textAlign: 'center', paddingTop: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', fontSize: '22px', fontWeight: 'bold' }}>
              {selectedCoin?.name} {string.depositTo}
            </div>
            <QRCodeSVG value={selectedAddress} size={200} />
            <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left' }}>{string.depositNetwork}</div>
            <div style={{ marginTop: '0px', fontSize: '16px', textAlign: 'left' }}>{getCoinCategory(selectedCoin?.category)}</div>
            <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left' }}>{string.depositAddress}</div>
            <div
              style={{ marginTop: '0px', wordBreak: 'break-all', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              onClick={() => {
                navigator.clipboard.writeText(selectedAddress);
                message.success(string.addressCopied);
              }}
            >
              {selectedAddress}
              <CopyOutlined style={{ color: '#1890ff' }} />
            </div>
          </div>
        </Modal>

        <SwapModal swapModalVisible={swapModalVisible} setSwapModalVisible={setSwapModalVisible} />
        <TranslogModal translogModalVisible={translogModalVisible} setTranslogModalVisible={setTranslogModalVisible} coinType={selectedCoinType} />
        <SendModal sendModalVisible={sendModalVisible} setSendModalVisible={setSendModalVisible} coinType={selectedCoinType} />
      </div>
    </div>
  );
};

export default Wallet;
