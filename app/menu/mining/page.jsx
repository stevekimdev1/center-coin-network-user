'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Tag, Drawer } from 'antd';
import { ClockCircleOutlined, HistoryOutlined, UserAddOutlined, SettingOutlined } from '@ant-design/icons';
import MiningHistory from './miningHistory';
import LockupSetting from './lockupSetting';
import { useCoin } from '@/src/context/CoinContext';
const MiningPage = () => {
  const [miningStatus, setMiningStatus] = useState('ACTIVE'); // 'ACTIVE' or 'WAIT'
  const [historyVisible, setHistoryVisible] = useState(false);
  const [lockupVisible, setLockupVisible] = useState(false);
  const [referralVisible, setReferralVisible] = useState(false);
  const { coinList } = useCoin();

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
        내 채굴 속도: <span className="primary">0.0030 CENT/h</span>
      </div>

      <div className="mining-formula">
        <div className="factor-box base">
          <div>기본 채굴률</div>
          <div className="factor-value">0.0030 CENT/h</div>
        </div>
        <div className="factor-box booster">
          <div>부스터</div>
          <div className="factor-value">100.00%</div>
        </div>
      </div>

      <div className="detail-box base-detail">
        <div className="detail-header">기본 채굴률 <span className="factor-value">0.0030 CENT/h</span></div>
        <div className="detail-body">
          이 비율은 마이너(Miner) 전체가 현재 마이닝하고 있는 양과 분배할 수 있는 총 CENT를 기반으로 동적으로 계산됩니다.
        </div>
      </div>

      <div className="detail-box booster-detail">
        <div className="detail-header">부스터 <span className="factor-value">100.00%</span></div>
        <div className="detail-body">
          <div className="booster-section">
            <div className="booster-title">
              <div>레퍼럴 팀</div>
              <div className="booster-setting-button" onClick={() => setReferralVisible(true)}><UserAddOutlined /> 초대하기</div>
            </div>
            <div>1 x 20% = <span className="primary">20.00%</span></div>
          </div>
          <div className="booster-section">
            <div className="booster-title">
              <div>락업 보상</div>
              <div className="booster-setting-button" onClick={() => setLockupVisible(true)}><SettingOutlined /> 설정하기</div>
            </div>
            <div className="primary">10.00%</div>
            <div className="booster-sub">락업 보상은 락업된 CENT 수량 및 락업 기간, 채굴횟수를 기준으로 합니다.</div>
          </div>
        </div>
      </div>

      <div className="bonus-box">
        <div className="detail-header">보너스 채굴</div>
        <div className="bonus-desc">
          채굴 시 랜덤하게 메이저 코인을 채굴할 수 있으며
          채굴 가능한 코인은 아래와 같습니다.
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
        title="채굴 이력"
        placement="right"
        closable
        onClose={() => setHistoryVisible(false)}
        open={historyVisible}
        width={'100vw'}
      >
        <MiningHistory />
      </Drawer>

      <Drawer
        title="락업 설정"
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
