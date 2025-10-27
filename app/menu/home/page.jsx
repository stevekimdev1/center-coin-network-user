'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Button, App } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import RollingList from './rollingList';
import Image from 'next/image';
import { useUser } from '@/src/context/UserContext';
import { useRouter } from 'next/navigation';
import httpClient from "@/src/lib/util/httpclient";
import { urls } from '@/src/const';
import { useCoin } from '@/src/context/CoinContext';
import { comma } from "@/src/lib/util/numberUtil";
import Link from 'next/link';
import { useString } from '@/src/context/StringContext';
import Script from 'next/script';
import MyImage from '@/src/components/MyImage';
const bonusUserList = [
  { userId: 'sad***', symbol: 'BTC', amount: '0.001' },
  { userId: 'dsf***', symbol: 'ETH', amount: '0.02' },
  { userId: 'ief***', symbol: 'BTC', amount: '0.002' },
  { userId: 'bbt***', symbol: 'TRX', amount: '15' },
  { userId: 'ria***', symbol: 'ETH', amount: '0.03' },
  { userId: 'sad***', symbol: 'SOL', amount: '0.5' },
  { userId: 'twa***', symbol: 'ADA', amount: '100' },
  { userId: 'bfd***', symbol: 'XRP', amount: '20' },
  { userId: 'fsa***', symbol: 'BNB', amount: '0.01' },
  { userId: 'kim***', symbol: 'BTC', amount: '0.0015' },
  { userId: 'lee***', symbol: 'TRX', amount: '10' },
  { userId: 'par***', symbol: 'ETH', amount: '0.025' },
  { userId: 'cho***', symbol: 'SOL', amount: '0.3' },
  { userId: 'jun***', symbol: 'ADA', amount: '80' },
  { userId: 'yoo***', symbol: 'XRP', amount: '12' },
  { userId: 'jan***', symbol: 'BNB', amount: '0.02' },
  { userId: 'hon***', symbol: 'BTC', amount: '0.003' },
  { userId: 'moo***', symbol: 'TRX', amount: '8' },
  { userId: 'ahn***', symbol: 'ETH', amount: '0.018' },
  { userId: 'seo***', symbol: 'SOL', amount: '0.7' },
  { userId: 'hwa***', symbol: 'ADA', amount: '60' },
  { userId: 'ohh***', symbol: 'XRP', amount: '25' },
];

export default function Home() {
  const [rollingIndex, setRollingIndex] = useState(0);
  const [feedList, setFeedList] = useState([]);
  const [noticeList, setNoticeList] = useState([]);
  const [referralList, setReferralList] = useState([]);
  const { user, setUser } = useUser();
  const router = useRouter();
  const { coinList } = useCoin();
  const { message } = App.useApp();
  const [baseReward, setBaseReward] = useState(0);
  const [originalBaseReward, setOriginalBaseReward] = useState(0);
  const intervalRef = useRef(null);
  const { string } = useString();
  const [expandedFeedId, setExpandedFeedId] = useState(null);
  const [userGradeCriteria, setUserGradeCriteria] = useState([0, 100000000, 100000000, 100000000, 100000000, 100000000, 100000000, 100000000]);
  // 인피니트 스크롤 관련 상태
  const [feedPage, setFeedPage] = useState(1);
  const [feedLoading, setFeedLoading] = useState(false);
  const [feedHasMore, setFeedHasMore] = useState(true);
  const [showAd, setShowAd] = useState(false);
  const observerRef = useRef();
  const [gradeCoin, setGradeCoin] = useState({});
  useEffect(() => {
    getMyInfo();
    fetchSystemSetting();
    getFeedList();
    getNoticeList();
    getReferralList();


  }, []);
  useEffect(() => {
    console.log(coinList)
  }, [coinList]);

  // 매초 baseReward를 랜덤하게 갱신하는 useEffect
  useEffect(() => {
    if (originalBaseReward > 0) {
      intervalRef.current = setInterval(() => {
        // -10%에서 +10% 사이의 랜덤한 비율 생성
        const randomRatio = 0.95 + Math.random() * 0.1; // 0.9 ~ 1.1 (90% ~ 110%)
        const newBaseReward = originalBaseReward * randomRatio;
        setBaseReward(newBaseReward);
      }, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [originalBaseReward]);

  useEffect(() => {

  }, []);

  const getFeedList = async (page = 1, append = false) => {
    if (feedLoading || !feedHasMore) return;

    setFeedLoading(true);
    try {
      const result = await httpClient.get(urls.feedList.replace('%s', page).replace('%s', 3));
      const newFeeds = result.data.list || [];

      if (append) {
        setFeedList(prev => [...prev, ...newFeeds]);
      } else {
        setFeedList(newFeeds);
      }

      // 더 이상 데이터가 없으면 hasMore를 false로 설정
      if (newFeeds.length < 3) {
        setFeedHasMore(false);
      }
    } catch (error) {
      console.error('피드 로드 실패:', error);
      message.error(string.feedLoadError);
    } finally {
      setFeedLoading(false);
    }
  };

  // 인피니트 스크롤을 위한 Intersection Observer 설정
  const lastFeedElementRef = useCallback(node => {
    if (feedLoading) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && feedHasMore) {
        const nextPage = feedPage + 1;
        setFeedPage(nextPage);
        getFeedList(nextPage, true);
      }
    });

    if (node) observerRef.current.observe(node);
  }, [feedLoading, feedHasMore, feedPage]);

  const fetchSystemSetting = async () => {
    const response = await httpClient.get(urls.systemSetting);
    const baseRewardValue = response.data.filter(item => item.type === 'BASE_REWARD')[0].value;
    setOriginalBaseReward(baseRewardValue);
    setBaseReward(baseRewardValue);

    setUserGradeCriteria([
      0,
      response.data.filter(item => item.type === 'USER_GRADE_1')[0].value,
      response.data.filter(item => item.type === 'USER_GRADE_2')[0].value,
      response.data.filter(item => item.type === 'USER_GRADE_3')[0].value,
      response.data.filter(item => item.type === 'USER_GRADE_4')[0].value,
      response.data.filter(item => item.type === 'USER_GRADE_5')[0].value,
      response.data.filter(item => item.type === 'USER_GRADE_6')[0].value,
      response.data.filter(item => item.type === 'USER_GRADE_6')[0].value+1,
    ]);

    // response.data에서 MINING_EVENT로 시작하고 GRADE로 끝나는 항목만 필터링
    let gradeCoin = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
    };

    // MINING_EVENT로 시작하고 GRADE로 끝나는 type만 추출
    const miningEventGradeItems = response.data.filter(item => 
      item.type.startsWith('MINING_EVENT') && item.type.endsWith('GRADE')
    );

    miningEventGradeItems.forEach(item => {
      // 코인명 추출 (예: MINING_EVENT_SOL_GRADE → SOL)
      const coinName = item.type.split('_')[2];
      gradeCoin[item.value].push(coinName);
    });
    gradeCoin[0].push('CENT');
    gradeCoin[0].push('CAI');

    setGradeCoin(gradeCoin);
    
  };
  const getNoticeList = () => {
    httpClient.get(urls.boardList.replace('%s', 'NOTICE').replace('%s', 1).replace('%s', 3)).then((result) => {
      setNoticeList(result.data.list);
    });
  }

  const getReferralList = () => {
    httpClient.get(urls.referalList).then((result) => {
      setReferralList(result.data);
    });
  }

  const getMyInfo = () => {
    httpClient.get(urls.myinfo).then((result) => {
      setUser(result.data);
    });
  };
  const handleMiningStart = () => {
    if (typeof window.showAd === 'function') {
        window.showAd();
        
        httpClient.post(urls.miningStart).then(res => {
    
          if (res.data) {
            getMyInfo();
            // message.success(string.miningStartSuccess);
          }
          else message.error(string.miningStartFailed);
        });
    } else {
      message.error(string.sdkLoadError);
    }
  }
  const handleNoticeClick = (notice) => {
    router.push(`/menu/notice?idx=${notice.boardIdx}`);
  }
  const minerCount = referralList.filter(item => item.miningStartDate && (new Date() - new Date(item.miningStartDate)) < 24 * 60 * 60 * 1000).length;
  const booster = 20 + minerCount * 3 + user?.lockupPower;
  return (
    <div id="home">
      <Script
        src="https://imasdk.googleapis.com/js/sdkloader/ima3.js"
        strategy="lazyOnload"
        onLoad={() => console.log('IMA SDK loaded')}
        onError={() => console.error('IMA SDK failed to load')}
      />
      {/* 종합정보영역 */}
      <div className="info-box">
        <div className="info-header">
          <p className="info-label">{string.walletBalance}</p>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="info-balance">
              {comma(coinList.find(item => item.coinType === 701)?.balance)} <span className="info-unit">CENT</span>
            </div>
            <div className="info-currency">
              <div>
                {coinList.find(item => item.coinType === 701)?.price?.toFixed(6)} USD
              </div>
              <div>
                {coinList.find(item => item.coinType === 701)?.priceChange > 0 ? (
                  <span style={{ color: 'red', paddingRight: '4px', fontSize: '12px' }}>▲</span>
                ) : coinList.find(item => item.coinType === 701)?.priceChange < 0 ? (
                  <span style={{ color: 'blue', paddingRight: '4px', fontSize: '12px'  }}>▼</span>
                ) : null}
                {coinList.find(item => item.coinType === 701)?.priceChange?.toFixed(2)} %

              </div>
            </div>
          </div>
        </div>
        <div className="info-grade">
          <div className="grade-progress-container">
            <div className="grade-progress-bar">
              <div className="progress-track">
                {userGradeCriteria.map((criteria, idx) => (
                  <div key={idx} className="grade-marker" style={{ left: `${(idx / (userGradeCriteria.length - 1)) * 100}%` }}>
                    <div className="marker-line"></div>
                  </div>
                ))}
                {(() => {
                  const currentBalance = coinList.find(item => item.coinType === 701)?.balance || 0;
                  let currentGradeIndex = 0;
                  for (let i = userGradeCriteria.length - 1; i >= 0; i--) {
                    if (currentBalance >= userGradeCriteria[i]) {
                      currentGradeIndex = i;
                      break;
                    }
                  }
                  const progressPercentage = currentGradeIndex === userGradeCriteria.length - 1 
                    ? 100 
                    : (currentBalance - userGradeCriteria[currentGradeIndex]) / (userGradeCriteria[currentGradeIndex + 1] - userGradeCriteria[currentGradeIndex]) * (100 / (userGradeCriteria.length - 1)) + (currentGradeIndex * (100 / (userGradeCriteria.length - 1)));
                  
                  return (
                    <div className="progress-fill" style={{ width: `${Math.min(progressPercentage, 100)}%` }}>
                      <div className="current-position" style={{ left: `${Math.min(progressPercentage, 100)}%` }}>
                        {/* <div className="position-indicator"></div> */}
                        {/* <div className="position-label">{string.currentGrade}</div> */}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
            <div className="grade-labels">
              {[string.vip0, string.vip1, string.vip2, string.vip3, string.vip4, string.vip5, string.vip6].map((grade, idx) => {
                const currentBalance = coinList.find(item => item.coinType === 701)?.balance || 0;
                let currentGradeIndex = 0;
                for (let i = userGradeCriteria.length - 1; i >= 0; i--) {
                  if (currentBalance >= userGradeCriteria[i]) {
                    currentGradeIndex = i;
                    break;
                  }
                }
                const isCurrentGrade = idx === currentGradeIndex;
                
                return (
                  <div key={idx} className="grade-label">
                    <span className="grade-amount">{userGradeCriteria[idx]/1000000}M</span>
                    {gradeCoin[idx] && gradeCoin[idx].map((coin, idx) => {
                      if (coin == 'GOODS') {
                        return (
                          <img key={idx} src={'/img/cart.png'} style={{width: '20px', height: '20px', marginTop: '4px'}}/>
                        )
                      }
                      else {
                        return (
                          <img key={idx} src={coinList.find(item => item.symbol === coin)?.image} style={{width: '20px', height: '20px', marginTop: '4px'}}/>
                        )
                      }
                    })}
                    {/* <span className={`grade-text ${isCurrentGrade ? 'current-grade' : ''}`}>{grade}</span> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="info-detail">
          <div className="info-detail-box">
            <p className="info-label">{string.referral}</p>
            <p className="info-value">{referralList.length}{string.person}</p>
          </div>
          <div className="info-detail-box">
            <p className="info-label">{string.lockup}</p>
            <p className="info-value">{comma(coinList.find(item => item.coinType === 701)?.lockBalance)}  <span className="info-unit2">CENT</span></p>
          </div>
          <div className="info-detail-box">
            <p className="info-label">{string.centerAI}</p>
            <p className="info-value">{comma(coinList.find(item => item.coinType === 401)?.balance)} <span className="info-unit2">CAI</span></p>
          </div>
        </div>
      </div>

      {/* 채굴영역 */}
      <div className="mining-box">
        <div className="mining-header">
          <span className="mining-title">{string.dailyMining}</span>
          {user && user.miningStartDate && new Date() - new Date(user.miningStartDate) < 24 * 60 * 60 * 1000 ? (
            <span className="mining-time">{string.miningInProgress}({dayjs().diff(dayjs(user.miningStartDate), 'minute') < 60 ? `${dayjs().diff(dayjs(user.miningStartDate), 'minute')}${string.minutesAgo}` : `${dayjs().diff(dayjs(user.miningStartDate), 'hour')}${string.hoursAgo}`})</span>
          ) : (
            <Button type="primary" className="mining-button" onClick={handleMiningStart}>{string.startMining}</Button>
          )}
        </div>
        <p className="mining-speed"><b>{(baseReward * (1 + booster / 100)).toFixed(2)} CENT/d</b></p>
        <div className="mining-progress">
          <div className="mining-bar" style={{ width: `${user && user.miningStartDate && new Date() - new Date(user.miningStartDate) < 24 * 60 * 60 * 1000 ? (new Date() - new Date(user.miningStartDate)) / (24 * 60 * 60 * 1000) * 100 : 0}%` }}></div>
        </div>
        <div className="mining-power">
          <span>{string.teamPower} {20 + minerCount * 3}%</span>
          <span>{string.lockupPower} {user?.lockupPower?.toFixed(2)}%</span>
        </div>
        <RollingList items={bonusUserList} />

      </div>

      {/* 공지사항 */}
      <div className="notice-box">
        <div className="notice-list-title">
          <span>{string.notice}</span>
          <Link href="/menu/notice" className="notice-more">{string.more}</Link>
        </div>
        <div className="notice-list">
          {noticeList.length > 0 ? (
            noticeList.map((item, idx) => (
              <div key={idx} className="notice-item" onClick={() => handleNoticeClick(item)}>
                <div className="notice-item-title">{item.title}</div>
                <div className="notice-item-date">{dayjs(item.createDate).format('MM.DD')}</div>
              </div>
            ))
          ) : (
            <div className="notice-item-empty">{string.noNotice}</div>
          )}
        </div>
      </div>

      {/* 버튼영역 */}
      <div className="link-buttons">
        <Link href="/menu/faq" className="link-button">FAQ</Link>
        <Link href="https://naver.me/GWeMeeXB" className="link-button" target="_blank">{string.whitepaper}</Link>
        <Link href="https://centercoin.co.kr/" className="link-button" target="_blank">{string.centerCoin}</Link>
      </div>

      {/* 피드영역 */}
      <div className="feed-list">
        {feedList.map((feed, idx) => {

          const isExpanded = expandedFeedId === feed.idx;
          return (
            <div
              key={`${feed.id || idx}-${idx}`}
              className="feed-card"
              ref={idx === feedList.length - 1 ? lastFeedElementRef : null}
              onClick={() => {
                setExpandedFeedId(isExpanded ? null : feed.idx);
                // window.open(feed.link, '_blank');
              }}
            >
              <div className="feed-meta">{feed.hashtag} · {dayjs(feed.date).format('YYYY.MM.DD')}</div>
              <div className="feed-thumb">
                {feed.fileIdx && (
                  <img
                    src={`${urls.imageFile.replace('%s', feed.fileIdx)}`}
                    onError={(e) => {
                      e.target.src =
                        "";
                    }}
                    className="object-cover"
                  />
                  // <MyImage
                  //   src={`${urls.imageFile.replace('%s', feed.fileIdx)}`}
                  // />
                )}
                {/* <img src={feed.image} alt="피드 이미지" className="object-cover" /> */}
              </div>
              <div className="feed-body">
                <div className="feed-title">{feed.title}</div>
                <div className={`feed-content ${isExpanded ? 'expanded' : ''}`}>{feed.content}</div>
              </div>
            </div>
          )
        })}

        {/* 로딩 인디케이터 */}
        {feedLoading && (
          <div className="feed-loading">
            <div className="loading-spinner"></div>
            <p>피드를 불러오는 중...</p>
          </div>
        )}

        {/* 더 이상 데이터가 없을 때 */}
        {!feedHasMore && feedList.length > 0 && (
          <div className="feed-end">
            <p>모든 피드를 불러왔습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
