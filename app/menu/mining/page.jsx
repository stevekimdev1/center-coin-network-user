'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button, Tag, Drawer, message } from 'antd';
import { ClockCircleOutlined, HistoryOutlined, UserAddOutlined, SettingOutlined } from '@ant-design/icons';
import MiningHistory from './miningHistory';
import LockupSetting from './lockupSetting';
import { useCoin } from '@/src/context/CoinContext';
import { useUser } from '@/src/context/UserContext';
import httpClient from '@/src/lib/util/httpclient';
import { urls, webUrl } from '@/src/const';
import Gauge from './gauge';
import { useString } from '@/src/context/StringContext';

const MiningPage = () => {
  const [miningStatus, setMiningStatus] = useState('ACTIVE'); // 'ACTIVE' or 'WAIT'
  const [historyVisible, setHistoryVisible] = useState(false);
  const [lockupVisible, setLockupVisible] = useState(false);
  const [referralVisible, setReferralVisible] = useState(false);
  const { coinList } = useCoin();
  const { user } = useUser();
  const { string } = useString();
  const [baseReward, setBaseReward] = useState(0);
  const [originalBaseReward, setOriginalBaseReward] = useState(0);
  const [minerCount, setMinerCount] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchSystemSetting = async () => {
      const response = await httpClient.get(urls.systemSetting);
      const baseRewardValue = response.data.filter(item => item.type === 'BASE_REWARD')[0].value;
      setOriginalBaseReward(baseRewardValue);
      setBaseReward(baseRewardValue);
    };
    fetchSystemSetting();
    fetchMinerCount();
  }, []);

  useEffect(() => {
    // 실시간 업데이트를 위한 인터벌 설정
    intervalRef.current = setInterval(() => {
      fetchSystemSetting();
      fetchMinerCount();
    }, 30000); // 30초마다 업데이트

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const fetchSystemSetting = async () => {
    try {
      const response = await httpClient.get(urls.systemSetting);
      const baseRewardValue = response.data.filter(item => item.type === 'BASE_REWARD')[0].value;
      setBaseReward(baseRewardValue);
    } catch (error) {
      console.error('Error fetching system setting:', error);
    }
  };

  const fetchMinerCount = async () => {
    try {
      const response = await httpClient.get(urls.referalList);
      const activeMiners = response.data.filter(item => 
        item.miningStartDate && 
        (new Date() - new Date(item.miningStartDate)) < 24 * 60 * 60 * 1000
      );
      setMinerCount(activeMiners.length);
    } catch (error) {
      console.error('Error fetching miner count:', error);
    }
  };

  const handleInvite = async () => {
    const shareUrl = `${webUrl}/signup?ref=${user?.referralCode}`;
    const shareText = string.centerNetworkInviteText.replace('{referralCode}', user?.referralCode) + `\n\n${shareUrl}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: string.centerNetworkInviteTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          message.error(string.shareFailed);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        message.success(string.referralCodeCopied);
      } catch (error) {
        message.error(string.copyFailed);
      }
    }
  };

  const booster = 20 + minerCount * 3 + user?.lockupPower;
  return (
    <div id="miningpage">
      {/* <div className="mining-status">
        <Tag color={miningStatus === 'ACTIVE' ? 'blue' : 'default'}>
          {miningStatus === 'ACTIVE' ? '채굴중' : '대기'}
        </Tag>
        <div className="status-right">
          {miningStatus === 'ACTIVE' ? (
            <span className="end-time">(2025-06-20 18:20:11 종료)</span>
          ) : (
            <Button type="primary" size="small">채굴시작</Button>
          )}
          <HistoryOutlined className="history-icon" onClick={() => setHistoryVisible(true)} />
        </div>
      </div> */}

      <div className="mining-title">
        {string.myMiningSpeed}: <span className="primary">{(baseReward * (1 + booster / 100)).toFixed(2)} CENT/d</span>
      </div>
      <div className="mining-desc">
        {string.miningDesc}
      </div>

      <Gauge />
      {/* <div className="mining-formula">
        <div className="factor-box base">
          <div>기본 채굴률</div>
          <div className="factor-value">{baseReward?.toFixed(2)} CENT/d</div>
        </div>
        <div className="factor-box booster">
          <div>부스터</div>
          <div className="factor-value">{booster.toFixed(2)}%</div>
        </div>
      </div> */}

      <div className="detail-box base-detail">
        <div className="detail-header">{string.basicMiningRate} <span className="factor-value">{baseReward?.toFixed(2)} CENT/d</span></div>
        <div className="detail-body">
          {string.basicMiningDesc}
        </div>
      </div>

      <div className="detail-box booster-detail">
        <div className="detail-header">{string.booster} <span className="factor-value">{booster.toFixed(2)}%</span></div>
        <div className="detail-body">
          <div className="booster-section">
            <div className="booster-title">
              <div>{string.referralTeam}</div>
              <div className="booster-setting-button" onClick={handleInvite}><UserAddOutlined /> {string.invite}</div>
            </div>
            <div>20% + {minerCount} x 3% = <span className="primary">{20 + minerCount * 3}%</span></div>
          </div>
          <div className="booster-section">
            <div className="booster-title">
              <div>{string.lockupReward}</div>
              <div className="booster-setting-button" onClick={() => setLockupVisible(true)}><SettingOutlined /> {string.settings}</div>
            </div>
            <div className="primary">{user?.lockupPower.toFixed(2)}%</div>
            <div className="booster-sub">{string.lockupRewardDesc}</div>
          </div>
        </div>
      </div>

      <div className="bonus-box">
        <div className="detail-header">{string.bonusMining}</div>
        <div className="bonus-desc">
          {string.bonusMiningDesc}
        </div>
        <div className="bonus-icons">
          {coinList.filter(coin => coin.coinType !== 701 && coin.coinType !== 401).map((coin, idx) => (
            <div key={idx} className="bonus-icon">
              <img src={coin.image} alt={coin.name} width={36} height={36} />
              <div className="coin-name">{coin.name}</div>
            </div>
          ))}
        </div>
      </div>

      <Drawer
        title={string.miningHistory}
        placement="right"
        closable
        onClose={() => setHistoryVisible(false)}
        open={historyVisible}
        width={'100vw'}
      >
        <MiningHistory />
      </Drawer>

      <Drawer
        title={string.lockupSettings}
        placement="bottom"
        closable
        onClose={() => setLockupVisible(false)}
        open={lockupVisible}
        height={'100vh'}
      >
        <LockupSetting />
      </Drawer>

      <style jsx>{`
      `}</style>
    </div>
  );
};

export default MiningPage;
