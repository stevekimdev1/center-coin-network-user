import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import string from "@/src/language/StringKo";
import moment from "moment";
import { comma } from "@/src/lib/util/numberUtil";
import httpClient from "@/src/lib/util/httpclient";
import { urls } from "@/src/const";
import { App } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import { useCoin } from "@/src/context/CoinContext";

const SwapModal = ({ swapModalVisible, setSwapModalVisible }) => {
    const { coinList, reloadCoinList } = useCoin();
    const { message } = App.useApp();
    const [swapAmount, setSwapAmount] = useState(0);
    const [fromCoinType, setFromCoinType] = useState(401);
    const [toCoinType, setToCoinType] = useState(402);

    useEffect(() => {
        if (swapModalVisible) {
            setSwapAmount('');
            setFromCoinType(401);
            setToCoinType(402);
        }
        console.log(coinList);
    }, [swapModalVisible]);
    
  const swap = async () => {
    if (!swapAmount || isNaN(swapAmount)) {
      message.error('수량을 입력해주세요');
      return;
    }


    try {
      const result = await httpClient.post(urls.swapRequest, { amount: swapAmount, fromCoinType, toCoinType });
      if (result.data === 'SUCCESS') {
        reloadCoinList();
        setSwapModalVisible(false);
        message.success('교환이 완료되었습니다.');
      } else {
        if (result.data === 'NO_BALANCE') message.error(string.withdrawNoBalance);
        else if (result.data === 'FAIL') message.error('처리 중 오류가 발생했습니다.');
        else if (result.data === 'INVALID_AMOUNT') message.error('유효하지 않은 금액입니다.');
        else if (result.data === 'INSUFFICIENT_BALANCE') message.error('잔액이 부족합니다.');
        else message.error(string.errorDetail);
      }
    } catch (error) {
      console.error('Error during swap:', error);
    }
  };
    return (
        <Modal
            title={'SWAP'}
            open={swapModalVisible}
            onOk={swap}
            okText={string.ok}
            onCancel={() => setSwapModalVisible(false)}
            cancelText={string.cancel}
            styles={{ body: { maxHeight: '60vh', overflowY: 'auto' } }}
        >
            <div>
                <div>
                    교환할 {coinList.find(coin => coin.coinType === fromCoinType)?.name}의 수량을 입력해주세요.<br />
                    {/* 수수료: {fee} SKR */}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', marginBottom: '20px' }}>
                    <div>
                        <input
                            className="home-form-input"
                            autoComplete='false'
                            type='number'
                            placeholder="수량을 입력하세요"
                            onChange={(e) => setSwapAmount(e.target.value)}
                            value={swapAmount}
                            style={{ width: '100%', fontSize: '14px' }}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <div style={{ flex: 1, padding: '16px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <img 
                                src={coinList.find(coin => coin.coinType === fromCoinType)?.img} 
                                alt={coinList.find(coin => coin.coinType === fromCoinType)?.name} 
                                style={{ width: '24px', height: '24px' }}
                            />
                            <div style={{ fontWeight: '500' }}>{coinList.find(coin => coin.coinType === fromCoinType)?.name}</div>
                        </div>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                            
                        </div>
                        <div style={{ fontSize: '14px', color: '#333', marginTop: '4px', textAlign: 'center' }}>
                            {comma(coinList.find(coin => coin.coinType === fromCoinType)?.balance, 4)}
                        </div>
                    </div>

                    <SwapOutlined style={{ fontSize: '20px', cursor: 'pointer' }} onClick={() => {
                        const temp = fromCoinType;
                        setFromCoinType(toCoinType);
                        setToCoinType(temp);
                    }} />

                    <div style={{ flex: 1, padding: '16px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <img 
                                src={coinList.find(coin => coin.coinType === toCoinType)?.img} 
                                alt={coinList.find(coin => coin.coinType === toCoinType)?.name} 
                                style={{ width: '24px', height: '24px' }}
                            />
                            <div style={{ fontWeight: '500' }}>{coinList.find(coin => coin.coinType === toCoinType)?.name}</div>
                        </div>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                        </div>
                        <div style={{ fontSize: '14px', color: 'red', marginTop: '4px', textAlign: 'center' }}>
                            {isNaN(swapAmount) || !swapAmount ? '-' : comma((swapAmount * (coinList.find(coin => coin.coinType === fromCoinType)?.price / coinList.find(coin => coin.coinType === toCoinType)?.price)), 4)}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default SwapModal;
