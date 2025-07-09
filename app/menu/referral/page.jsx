'use client';

import React from 'react';
import { Button, Tag, Dropdown, Menu } from 'antd';

const members = [
  { id: 'sad*', status: '채굴중', power: 0.1, cai: 0.1 },
  { id: 'jef*', status: '대기', power: 0.7, cai: 0.7 }
];

const ReferralPage = () => {
  return (
    <div id="referral-page">
      <div className="referral-header">
        <h2>레퍼럴 팀</h2>
        <div className="summary-circle">
          <div className="mining-count">0</div>
          <div>Miner</div>
        </div>
        <div className="desc">
          지금까지 총 0명의 새로운 마이너를 초대했습니다.<br />
          귀하의 레퍼럴 팀에는 0명의 회원이 있습니다. <br />현재 0명 중 0명이 채굴 중입니다.
        </div>
      </div>

      <div className="members-header">
        <div className="title">Members</div>
      </div>
      <div className="members-sub">
        사람들을 초대하여 레퍼럴 팀에 추가하세요. 채굴중인 마이너의 채굴속도와 비례하여 내 채굴속도가 증가합니다.
      </div>

      <div className="members-list">
        {members.length === 0 ? (
          <div className="empty">아직 레퍼럴 팀에 합류한 사람이 없습니다! 친구를 초대하여 더 많은 Pi를 채굴하세요.</div>
        ) : (
          members.map((m, i) => (
            <div key={i} className="member-item">
              <div className="id">{m.id}</div>
              <Tag color={m.status === '채굴중' ? 'blue' : 'default'}>{m.status}</Tag>
              <div className="amount">{m.power}CENT/h</div>
            </div>
          ))
        )}
      </div>

      <div className="bottom-buttons">
        <Button type="primary" block>초대하기</Button>
      </div>

      <style jsx>{`
      `}</style>
    </div>
  );
};

export default ReferralPage;
