'use client';

import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Slider, Typography, App, Modal, Input } from 'antd';
import { useCoin } from '@/src/context/CoinContext';
import httpClient from '@/src/lib/util/httpclient';
import { urls } from '@/src/const';
import { useUser } from '@/src/context/UserContext';

const LockupSetting = () => {
  const [lockPercent, setLockPercent] = useState(50);
  const [lockPeriod, setLockPeriod] = useState(12);
  const [agreeAutoLock, setAgreeAutoLock] = useState(true);
  const { coinList, reloadCoinList } = useCoin();
  const [miningRatioIncrease, setMiningRatioIncrease] = useState(0);
  const { message, modal } = App.useApp();
  const { user } = useUser();
  
  // Modal 관련 상태 추가
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const percentMarks = {
    10: '10%',
    25: '25%',
    50: '50%',
    75: '75%',
    100: '100%',
  };

  const periodMarks = {
    6: '6개월',
    12: '1년',
    24: '2년',
    36: '3년'
  };

  const centCoin = coinList.find(coin => coin.symbol === 'CENT');
  const centAmount = (centCoin.balance - centCoin.lockBalance) * lockPercent / 100;

  useEffect(() => {
    fetchMiningRatioIncrease();
  }, [lockPercent, lockPeriod]);

  const fetchMiningRatioIncrease = async (params = {}) => {
    try {
      const result = await httpClient.get(
        urls.miningRatioIncrease
          .replace('%s', centAmount)
          .replace('%s', lockPeriod)
      );
      setMiningRatioIncrease(result.data);
    } catch (error) {
      message.error('채굴 증가율을 불러오는데 실패했습니다.');
    }
  };

  const handleLockup = async () => {
    if (!agreeAutoLock) {
      message.error('락업약정 동의를 체크해주세요.');
      return;
    }

    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    if (!password.trim()) {
      message.error('패스워드를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const requestData = {
        password: password,
        coinType: 701,
        amountRatio: lockPercent,
        duration: lockPeriod
      };

      const result = await httpClient.post(urls.walletLockup, requestData);
      if (result.data == "SUCCESS") {
        message.success('락업이 성공적으로 실행되었습니다.');
        setIsModalVisible(false);
        setPassword('');
        reloadCoinList();
      } else {
        if (result.data == "INVALID_PASSWORD") message.error('패스워드가 틀렸습니다.');
        else if (result.data == "INVALID_PARAM") message.error('설정값이 잘못되었습니다.');
        else if (result.data == "INSUFFICIENT_BALANCE") message.error('잔액이 부족합니다.');
        else message.error('락업실행에 실패했습니다.');
      }
    } catch (error) {
      message.error('락업실행에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setPassword('');
  };

  return (
    <div id="lockup-setting">
      <div className="section info-box">
        <h3>락업 설정 구성</h3>
        <p>
          채굴 속도를 높이려면 <span className="highlight">센터코인의 전송가능한 잔액</span>의 일부를 락업하세요.
        </p>
      </div>

      <Checkbox
        className="agreement"
        checked={agreeAutoLock}
        onChange={e => setAgreeAutoLock(e.target.checked)}
      >
        락업약정 동의
      </Checkbox>
      <div className="agreement-text">
      약정 시 락업한 물량에 대해 해당 락업 기간만큼 외부로 전송이 제한됩니다. 
      </div>

      <div className="section lockup-box">
        <div className="sub-box">
          <h4>1. 락업 수량</h4>
          <div className="sub"><span className="highlight2">{centAmount}</span> CENT</div>
        </div>
        <Slider
          min={10}
          max={100}
          step={null}
          marks={percentMarks}
          defaultValue={50}
          value={lockPercent}
          onChange={setLockPercent}
        />
      </div>

      <div className="section lockup-box">
        <div className="sub-box">
          <h4>2. 락업 기간</h4>
          <div className="sub">
              
              <span className="highlight2">
                ~ {
                (() => {
                  const now = new Date();
                  const endDate = new Date(now.setMonth(now.getMonth() + lockPeriod));
                  const yyyy = endDate.getFullYear();
                  const mm = String(endDate.getMonth() + 1).padStart(2, '0');
                  const dd = String(endDate.getDate()).padStart(2, '0');
                  return `${yyyy}-${mm}-${dd}`;
                })()
              }
            </span>
          </div>
        </div>
        <Slider
          min={6}
          max={36}
          step={null}
          marks={periodMarks}
          defaultValue={12}
          value={lockPeriod}
          onChange={setLockPeriod}
        />
      </div>

      <div className="section summary">
        <div>예상 채굴 증가율(100회 채굴 기준):</div>
        <div className="increase">+ {miningRatioIncrease.toFixed(2)}%</div>
        <div className="formula">[= log(락업수량 * 락업개월) * log(채굴횟수) * 조정값]</div>
      </div>

      <div className="section notice">
        <p>지금까지 {user?.miningCount}개의 채굴 세션을 완료했습니다.</p>
        <p>락업수량과 기간이 증가할수록 채굴횟수가 많아질수록 채굴속도 상승폭이 증가합니다.</p>
      </div>

      <div className="confirm-button" onClick={handleLockup}>락업실행</div>

      <Modal
        title="락업 실행"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={isLoading}
        okText="락업 실행"
        cancelText="취소"
      >
        <div style={{ marginBottom: 16 }}>
          <p>현재 CENT 잔고의 {lockPercent}%를 {periodMarks[lockPeriod]} 동안 락업하시겠습니까?</p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <Input.Password
            placeholder="패스워드를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onPressEnter={handleModalOk}
          />
        </div>
      </Modal>

      <style jsx>{`
      `}</style>
    </div>
  );
};

export default LockupSetting;
