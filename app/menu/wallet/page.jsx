'use client';

import {
  Button,
  Modal,
} from "antd";
import React, { useEffect, useState } from "react";
import { comma } from "@/src/lib/util/numberUtil";
import { CopyOutlined } from "@ant-design/icons";
import { App } from "antd";
import { QRCodeSVG } from 'qrcode.react';
import SwapModal from "./swapModal";
import { useCoin } from "@/src/context/CoinContext";
import TranslogModal from "./translogModal";
import SendModal from "./sendModal";
import { getCoinCategory } from "@/src/lib/util/coinUtil";

const Wallet = () => {
  const { coinList, reloadCoinList } = useCoin();
  const { message } = App.useApp();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [swapModalVisible, setSwapModalVisible] = useState(false);
  const [translogModalVisible, setTranslogModalVisible] = useState(false);
  const [sendModalVisible, setSendModalVisible] = useState(false);
  const [selectedCoinType, setSelectedCoinType] = useState(null);

  useEffect(() => {
    reloadCoinList();
  }, []);
  useEffect(() => {
  }, [coinList]);

  return (
    <div id="wallet">
      <div className="wallet-section">
        <div className="wallet-balance">
          <div className="wallet-balance-title">총 보유 자산</div>
          <div className="wallet-balance-value">
            ${comma(coinList?.reduce((p, c) => p + (c?.balance || 0) * (c?.price || 0), 0) || 0, 0)}
          </div>
        </div>

        <div className="wallet-coin-list">
          <div className="wallet-coin-title">보유 코인</div>
          {coinList.map((coin, index) => (
            <div key={index} className="wallet-coin-card">
              <div className="wallet-coin-info">
                <img src={coin.image} alt={coin.name} className="wallet-coin-img" />
                <div className="wallet-coin-name">{coin.name}</div>
                <div className="wallet-coin-balance">
                  {comma(coin.balance, 4)} {coin.name}
                  <div className="wallet-coin-krw">≈ {comma((coin?.balance || 0) * (coin?.price || 0), 0)} USD</div>
                </div>
              </div>
              <div className="wallet-coin-actions">
                <button className="wallet-action-outline" onClick={() => { setSelectedCoinType(coin.coinType); setTranslogModalVisible(true); }}>거래내역</button>
                <button className="wallet-action" onClick={() => { setSelectedCoinType(coin.coinType); setSendModalVisible(true); }}>보내기</button>
                {coin.coinType == 701 || coin.coinType == 401 ? <button className="wallet-action" onClick={() => {setSelectedAddress(coin.address);setSelectedCoin(coin);}}>받기</button> : <div className="wallet-action-disabled"></div>}
              </div>
            </div>
          ))}
        </div>

        <Modal open={selectedAddress} onCancel={() => setSelectedAddress(null)} footer={null}>
          <div style={{ textAlign: 'center', paddingTop: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', fontSize: '22px', fontWeight: 'bold' }}>
              {selectedCoin?.name} 입금하기
            </div>
            <QRCodeSVG value={selectedAddress} size={200} />
            <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left' }}>입금 네트워크</div>
            <div style={{ marginTop: '0px', fontSize: '16px', textAlign: 'left' }}>{getCoinCategory(selectedCoin?.category)}</div>
            <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left' }}>입금 주소</div>
            <div 
              style={{ marginTop: '0px', wordBreak: 'break-all', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              onClick={() => {
                navigator.clipboard.writeText(selectedAddress);
                message.success('주소가 복사되었습니다.');
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
