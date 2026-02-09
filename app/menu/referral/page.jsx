'use client';

import React, { useEffect, useState } from 'react';
import { Button, Tag, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useUser } from '@/src/context/UserContext';
import httpClient from '@/src/lib/util/httpclient';
import { urls, webUrl } from '@/src/const';
import { useString } from '@/src/context/StringContext';

const ReferralPage = () => {
  const [referralList, setReferralList] = useState([]);
  const [referralListLoading, setReferralListLoading] = useState(true);
  const { user } = useUser();
  const { string } = useString();

  useEffect(() => {
    getReferralList();
  }, []);

  const getReferralList = async () => {
    setReferralListLoading(true);
    const response = await httpClient.get(urls.referalList);
    setReferralList(response.data);
    // referralList의 각 항목에 isMining 속성을 추가합니다.
    // isMining은 miningStartDate가 있고, 24시간 이내면 true, 아니면 false입니다.
    const now = new Date();
    setReferralList(
      response.data.map(item => ({
        ...item,
        isMining: item.miningStartDate && (now - new Date(item.miningStartDate)) < 24 * 60 * 60 * 1000
      }))
    );
    setReferralListLoading(false);
  }

  const handleInvite = async () => {
    const shareUrl = `${webUrl}/signup?ref=${user?.referralCode}`;
    const shareText = `${string.centerNetworkInvite} 추천코드: ${user?.referralCode}\n\n${shareUrl}`;
    
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
      // Web Share API를 지원하지 않는 경우 클립보드에 복사
      try {
        await navigator.clipboard.writeText(shareText);
        message.success(string.referralCodeCopied);
      } catch (error) {
        message.error(string.copyFailed);
      }
    }
  };

  const handleCopyUrl = async () => {
    const shareUrl = `${webUrl}/signup?ref=${user?.referralCode}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      message.success(string.copied);
    } catch (error) {
      message.error(string.copyFailed);
    }
  };

  return (
    <div id="referral-page">
      <div className="referral-header">
        <h2>{string.referralTeamTitle}</h2>
        <div className="summary-circle">
          <div className="mining-count">{referralList.length}</div>
          <div>{string.miner}</div>
        </div>
        <div className="desc">
          {string.referralTeamDesc.replace('{count}', referralList.length).replace('{count}', referralList.length).replace('{miningCount}', referralList.filter(item => item.isMining).length)}
        </div>
      </div>

      <div className="members-header">
        <div className="title">{string.members}</div>
      </div>
      <div className="members-sub">
        {string.membersDesc}
      </div>

      <div className="members-list">
        {referralList.length === 0 ? (
          <div className="empty">{string.noMembers}</div>
        ) : (
          referralList.map((m, i) => (
            <div key={i} className="member-item">
              <div className="id">
                {m.id && m.id.length > 4
                  ? m.id.slice(0, 4) + '*'
                  : m.id}
              </div>
              {/* <Tag color={m.isMining ? 'blue' : 'default'}>{m.isMining ? string.miningInProgress : string.miningStopped}</Tag> */}
              <div className="amount">+{(m.teamPower+m.lockupPower).toFixed(2)}%</div>
            </div>
          ))
        )}
      </div>

      <div className="members-header">
        <div className="title">{string.referralCode}</div>
      </div>
      <div className="members-sub">
        <div className="referral-url-container">
          <span>{webUrl}/signup?ref={user?.referralCode}</span>
          <CopyOutlined 
            className="copy-icon" 
            onClick={handleCopyUrl}
            style={{ marginLeft: '8px', cursor: 'pointer', color: '#1890ff' }}
          />
        </div>
      </div>
      <div className="bottom-buttons">
        <Button type="primary" block onClick={handleInvite}>{string.invite}</Button>
      </div>
    </div>
  );
};

export default ReferralPage;
