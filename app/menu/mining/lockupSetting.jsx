'use client';

import React, { useState } from 'react';
import { Button, Checkbox, Slider, Typography } from 'antd';

const LockupSetting = () => {
  const [lockPercent, setLockPercent] = useState(50);
  const [lockPeriod, setLockPeriod] = useState(12);
  const [agreeAutoLock, setAgreeAutoLock] = useState(true);

  const percentMarks = {
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

  return (
    <div id="lockup-setting">
      <div className="section info-box">
        <h3>락업 설정 구성</h3>
        <p>
          채굴 속도를 높이려면 <span className="highlight">센터코인의 전송가능한 잔액</span>의 일부를 락업하세요.
        </p>
      </div>

      <Checkbox
        checked={agreeAutoLock}
        onChange={e => setAgreeAutoLock(e.target.checked)}
        style={{ margin: '16px 0' }}
      >
        약정 시 락업한 물량에 대해 해당 락업 기간만큼 외부로 전송이 제한됩니다. 
      </Checkbox>

      <div className="section">
        <h4>1. 락업 수량</h4>
        <Slider
          min={0}
          max={100}
          step={null}
          marks={percentMarks}
          defaultValue={50}
          onChange={setLockPercent}
        />
        <div className="sub">상승률: × {lockPercent}%</div>
      </div>

      <div className="section">
        <h4>2. 락업 기간</h4>
        <Slider
          min={6}
          max={36}
          step={null}
          marks={periodMarks}
          defaultValue={12}
          onChange={setLockPeriod}
        />
        <div className="sub">상승률: × 200%</div>
      </div>

      <div className="section summary">
        <div>예상되는 채굴 증가율:</div>
        <div className="increase">+ 108.37%</div>
        <div className="formula">[= log(락업수량 * 락업개월) * log(채굴횟수) * 조정값]</div>
      </div>

      <div className="section notice">
        <p>지금까지 4개의 채굴 세션을 완료했습니다.</p>
        <p>락업수량과 기간이 증가할수록 채굴횟수가 많아질수록 채굴속도 상승폭이 증가합니다.</p>
      </div>

      <div className="confirm-button">락업실행</div>

      <style jsx>{`
      `}</style>
    </div>
  );
};

export default LockupSetting;
