import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import string from "@/src/language/StringKo";
import { comma } from "@/src/lib/util/numberUtil";
import httpClient from "@/src/lib/util/httpclient";
import { urls } from "@/src/const";
import { App } from "antd";
import { useCoin } from "@/src/context/CoinContext";
import { getCoinCategory } from "@/src/lib/util/coinUtil";
const SendModal = ({ sendModalVisible, setSendModalVisible, coinType }) => {
  const { coinList, reloadCoinList } = useCoin();
  const { message } = App.useApp();
  const [sendAmount, setSendAmount] = useState(0);
  const [sendAddress, setSendAddress] = useState('');
  const [sendPassword, setSendPassword] = useState('');

  useEffect(() => {
    if (sendModalVisible) {
      setSendAmount('');
      setSendAddress('');
      setSendPassword('');
    }
  }, [sendModalVisible]);

  const send = async () => {
    if (!sendAmount || isNaN(sendAmount)) {
      message.error('송금수량을 입력해주세요');
      return;
    }
    if (!sendAddress) {
      message.error('주소를 입력해주세요');
      return;
    }
    if (!sendPassword) {
      message.error('비밀번호를 입력해주세요');
      return;
    }

    try {
      const result = await httpClient.post(urls.walletSendRequest, {
        coinType: coinType,
        amount: sendAmount * 1000000000,
        to: sendAddress,
        password: sendPassword,
      });
      if (result.data === 'SUCCESS') {
        reloadCoinList();
        setSendModalVisible(false);
        message.success('송금이 완료되었습니다.');
      } else {
        if (result.data === 'NO_BALANCE') message.error(string.withdrawNoBalance);
        else if (result.data === 'FAIL') message.error('처리 중 오류가 발생했습니다.');
        else if (result.data === 'AMOUNT_LOW') message.error('유효하지 않은 금액입니다.');
        else if (result.data === 'INVALID_ADDRESS') message.error('유효하지 않은 주소입니다.');
        else if (result.data === 'INSUFFICIENT_BALANCE') message.error('잔액이 부족합니다.');
        else if (result.data === 'INVALID_PASSWORD') message.error('비밀번호가 일치하지 않습니다.');
        else message.error(string.errorDetail);
      }
    } catch (error) {
      console.error('Error during send:', error);
    }
  };

  return (
    <Modal
      title={'보내기'}
      open={sendModalVisible}
      onOk={send}
      okText={string.ok}
      onCancel={() => setSendModalVisible(false)}
      cancelText={string.cancel}
      styles={{ body: { maxHeight: '60vh', overflowY: 'auto' } }}
    >
      <div id="sendmodal">
        <div className="send-guide">
          받는사람 주소를 입력해주세요. 센터네트워크 사용자에게 보내는 경우 아이디를 입력하여 전송하실 수 있습니다.
        </div>

        <div className="send-form">

        <div className="form-block">
            <label>체인</label>
            <input
              type="text"
              value={getCoinCategory(coinList.find(coin => coin.coinType === coinType)?.category)}
              disabled
            />
          </div>
          <div className="form-block">
            <label>받는사람</label>
            <input
              type="text"
              placeholder="주소를 입력하세요"
              onChange={(e) => setSendAddress(e.target.value)}
              value={sendAddress}
            />
          </div>

          <div className="form-block">
            <label>수량 ({coinList.find(coin => coin.coinType === coinType)?.symbol})</label>
            <input
              type="number"
              placeholder="수량을 입력하세요"
              onChange={(e) => setSendAmount(e.target.value)}
              value={sendAmount}
            />
          </div>

          <div className="form-block">
            <label>비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              onChange={(e) => setSendPassword(e.target.value)}
              value={sendPassword}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SendModal;
