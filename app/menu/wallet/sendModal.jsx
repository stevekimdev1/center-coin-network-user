import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { comma } from "@/src/lib/util/numberUtil";
import httpClient from "@/src/lib/util/httpclient";
import { urls } from "@/src/const";
import { App } from "antd";
import { useCoin } from "@/src/context/CoinContext";
import { getCoinCategoryByCoinType } from "@/src/lib/util/coinUtil";
import { useString } from "@/src/context/StringContext";

const SendModal = ({ sendModalVisible, setSendModalVisible, coinType }) => {
  const { coinList, reloadCoinList } = useCoin();
  const { message } = App.useApp();
  const [sendAmount, setSendAmount] = useState(0);
  const [sendAddress, setSendAddress] = useState('');
  const [sendPassword, setSendPassword] = useState('');
  const { string } = useString();

  useEffect(() => {
    if (sendModalVisible) {
      setSendAmount('');
      setSendAddress('');
      setSendPassword('');
    }
  }, [sendModalVisible]);

  const send = async () => {
    if (!sendAmount || isNaN(sendAmount)) {
      message.error(string.sendAmountRequired);
      return;
    }
    if (!sendAddress) {
      message.error(string.sendAddressRequired);
      return;
    }
    if (!sendPassword) {
      message.error(string.sendPasswordRequired);
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
        message.success(string.sendComplete);
      } else {
        if (result.data === 'NO_BALANCE') message.error(string.withdrawNoBalance);
        else if (result.data === 'FAIL') message.error(string.sendProcessingError);
        else if (result.data === 'AMOUNT_LOW') message.error(string.sendAmountLow);
        else if (result.data === 'INVALID_ADDRESS') message.error(string.sendInvalidAddress);
        else if (result.data === 'INSUFFICIENT_BALANCE') message.error(string.withdrawNoBalance);
        else if (result.data === 'INVALID_PASSWORD') message.error(string.sendInvalidPassword);
        else message.error(string.errorDetail);
      }
    } catch (error) {
      console.error('Error during send:', error);
    }
  };

  return (
    <Modal
      title={string.sendTitle}
      open={sendModalVisible}
      onOk={send}
      okText={string.ok}
      onCancel={() => setSendModalVisible(false)}
      cancelText={string.cancel}
      styles={{ body: { maxHeight: '60vh', overflowY: 'auto' } }}
    >
      <div id="sendmodal">
        <div className="send-guide">
          {string.sendGuide}
        </div>

        <div className="send-form">

        <div className="form-block">
            <label>{string.chain}</label>
            <input
              type="text"
              value={getCoinCategoryByCoinType(coinType)}
              disabled
            />
          </div>
          <div className="form-block">
            <label>{string.recipient}</label>
            <input
              type="text"
              placeholder={string.addressPlaceholder}
              onChange={(e) => setSendAddress(e.target.value)}
              value={sendAddress}
            />
          </div>

          <div className="form-block">
            <label>{string.amount} ({coinList.find(coin => coin.coinType === coinType)?.symbol})</label>
            <input
              type="number"
              placeholder={string.amountPlaceholder}
              onChange={(e) => setSendAmount(e.target.value)}
              value={sendAmount}
            />
          </div>

          <div className="form-block">
            <label>{string.password}</label>
            <input
              type="password"
              placeholder={string.passwordPlaceholder}
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
