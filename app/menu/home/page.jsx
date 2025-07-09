'use client';

import { useEffect, useState } from 'react';
import { Button, App } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Image from 'next/image';
import RollingList from './rollingList';
import { useUser } from '@/src/context/UserContext';
import { useRouter } from 'next/navigation';
import httpClient from "@/src/lib/util/httpclient";
import { urls } from '@/src/const';
import { useCoin } from '@/src/context/CoinContext';
import { comma } from "@/src/lib/util/numberUtil";
const bonusUserList = [
  { userId: 'sad***', symbol: 'BTC', amount: '0.001' },
  { userId: 'dsf***', symbol: 'ETH', amount: '0.02' },
  { userId: 'kim***', symbol: 'XRP', amount: '5' },
];

export default function Home() {
  const [rollingIndex, setRollingIndex] = useState(0);
  const [feedList, setFeedList] = useState([]);
  const [noticeList, setNoticeList] = useState([]);
  const { user, setUser } = useUser();
  const router = useRouter();
  const { coinList } = useCoin();
  const { message } = App.useApp();

  useEffect(() => {
    getMyInfo();
    const interval = setInterval(() => {
      getMyInfo();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 공지사항 API 호출 (예시)
    // fetch('/api/notice')
    //   .then(res => res.json())
    //   .then(data => setNoticeList(data));

    // 더미 데이터 처리
    setNoticeList([
      { date: '2025-06-19', title: '시스템 점검 안내' },
      { date: '2025-06-18', title: 'CAI 보상 업데이트' },
      { date: '2025-06-17', title: '새 앱 출시' },
    ]);

    // 피드 API 호출 (예시)
    // fetch('/api/feed')
    //   .then(res => res.json())
    //   .then(data => setFeedList(data));

    // 더미 피드 데이터 처리
    setFeedList([
      {
        link: 'https://crypto.news/this-coin-under-0-002-gains-attention-as-a-potential-alternative-to-xrp-in-next-bull-run/',
        hashtag: '#Partner Content #sponsored',
        date: '2025-06-19',
        image: 'https://resources.cryptocompare.com/news/73/46360053.jpeg',
        title: 'This coin under $0.002 gains attention as a potential alternative to XRP in next bull run',
        content: 'Disclosure: This article does not represent investment advice. The content and materials featured on this page are for educational purposes only. As XRP eyes $2.50, retail investors explore low-cost breakout bets like LILPEPE, priced at just $0.0012. Table of Contents XRP: The giant awakens, but growth may be limited LILPEPE vs. XRP: Possible return on investment How to buy LILPEPE: Step by step Conclusion As Ripple’s XRP approaches significant highs again, while the global economy remains shaky, investors are closely watching the charts and waiting for the next major catalyst. XRP recently broke past the $2.21 resistance level, rose to a high of $2.33, and then stabilized around $2.25. This shows that the market is positive. Rumors of a spot XRP ETF and more interest from institutions are also fueling the rise. However, since XRP is currently worth more than $2, and billions of tokens are circulating, many retail investors wonder if there is a better opportunity to make money elsewhere. Little Pepe (LILPEPE) is a meme-based Layer 2 project that costs only $0.0012 per token. Analysts believe that this meme-native blockchain could be the breakout star of the next bull run, with a potential return on investment of up to 94 times. It could also be a better short- to mid-term selection than XRP for quick gains. You might also like: Shiba Inu exploded in 2021, PEPE in 2023, this frog token under $0.002 could soar in 2025 XRP: The giant awakens, but growth may be limited One of the best things about the coin is that it can be used for cross-border payments. XRP has also been robust amid market corrections, which is giving optimistic momentum. As it found support around $2.29, more than 100 million units were traded. Institutions were quietly purchasing units through large block trades. However, XRP’s price range of $2.14 to $2.33 suggests that even a 3x gain would require a significant influx of new money. For many retail investors, the chances of achieving life-changing profits are smaller than those with low-cap, early-stage tokens. Little Pepe: The underdog who has what it takes to win XRP remains a heavyweight with numerous applications, but Little Pepe is garnering attention for other reasons. LILPEPE is a new Layer 2 blockchain made solely for memes and viral content. Right now, it is in Stage 3 of its presale and costs only $0.0012. The coin has already raised $1,325,000 in less than a week during Stage 2, and it’s gaining speed quickly due to a combination of , unique technology, and the power of the community. Here’s why LILPEPE can be a superior risk-reward option than XRP: One-of-a-kind layer 2 tech made for meme culture Little Pepe is launching its own Layer 2 blockchain, which differs from most memecoins that debut on Ethereum or Binance Smart Chain and rely solely on hype. This makes it possible for: Very low fees Transactions that happen very quickly Sniper-bot protection for fairer trade A meme that comes with it, Launchpad to help future meme tokens grow It’s not just a coin; it’s a whole ecosystem where meme culture is fully on-chain. No taxes, no rug, and complete transparency Little Pepe is different because it has no buy/sell taxes, frozen liquidity, and no team allocation from the presale. These are all signs of a rug-proof design that prioritizes fairness. These tokenomics put the community first: 26.5% presale Allocations 30% reserves for the chain 13.5% staking and rewards 10% for marketing 10% cash flow 10% of CEX/DEX reserves 0% team distribution LILPEPE vs. XRP: Possible return on investment Let’s look at the good things about both: Price of XRP: around $2.15 Price of LILPEPE: $0.0012 To make 10x: XRP would have to reach $22.50, which is not close to the all-time high that was never achieved, even during the 2021 bull run. LILPEPE’s market cap is under $1.2 billion, which is less than most top memecoins like SHIB and PEPE, it only needs to attain $0.012. If LILPEPE reaches $0.11, that’s a 94x return. It hits 100x at $0.12. These targets are not just dreams; they are based on past meme currency cycles and on the fact that they are easy to enter, have a strong community, and offer good infrastructure. How to buy LILPEPE: Step by step Visit the official website. Link a wallet, either Trust Wallet or MetaMask. Pick how to pay (ETH or USDT) Choose Stage 3, which costs $0.0012. Enter the amount and click “Buy.” Verify the transaction in the wallet. Get tokens after the presale is over. New users can buy ETH directly via fiat on-ramps, such as Ramp or MoonPay, and use it to join. Conclusion XRP is gaining strength, breaking through key resistance levels, and drawing the attention of major investors. However, for crypto users who want to make more money with a small amount of capital, LILPEPE presents a great opportunity. It’s a project that combines the popularity of memes with serious technology to create a Layer 2 for the culture. Little Pepe could be the dark horse of this bull cycle, as its presale is going through the roof, and it could make 94 times its investment. Act quickly, as Stage 3 tokens are selling out rapidly. To learn more about Little Pepe, visit the website , Telegram , and Twitter (X) . Read more: From meme to the moon: Why LILPEPE might outperform XRP this bull cycle Disclosure: This content is provided by a third party. crypto.news does not endorse any product mentioned on this page. Users must do their own research before taking any actions related to the company.'
      },
      {
        link: 'https://en.coinotag.com/ethereum-staking-rewards-decline-amid-growing-defi-lending-adoption-and-stablecoin-yields/',
        hashtag: '#Ethereum #News',
        date: '2025-06-18',
        image: 'https://resources.cryptocompare.com/news/77/default.png',
        title: 'Ethereum Staking Rewards Decline Amid Growing DeFi Lending Adoption and Stablecoin Yields',
        content: 'DeFi lending platforms are increasingly favored over staking ETH, yet these innovative financial products fundamentally rely on the Ethereum network. Despite declining staking rewards, Ethereum maintains robust network activity and'
      },
    ]);
  }, []);

  const getMyInfo = () => {
    httpClient.get(urls.myinfo).then((result) => {
      setUser(result.data);
    });
  };
  const handleMiningStart = () => {
    httpClient.post(urls.miningStart).then(res => {
      if (res.data) {
        getMyInfo();
        message.success('채굴이 시작되었습니다.');
      }
      else message.error('채굴 시작에 실패했습니다.');
    });
  }

  return (
    <div id="home">
      {/* 종합정보영역 */}
      <div className="info-box">
        <div className="info-header">
          <p className="info-label">Wallet Balance</p>
          <div className="info-balance">
            {comma(coinList.find(item => item.coinType === 701)?.balance)} <span className="info-unit">CENT</span>
          </div>
        </div>
        <div className="info-detail">
          <div className="info-detail-box">
            <p className="info-label">추천인</p>
            <p className="info-value">2명</p>
          </div>
          <div className="info-detail-box">
            <p className="info-label">락업</p>
            <p className="info-value">5,000 <span className="info-unit2">CENT</span></p>
          </div>
          <div className="info-detail-box">
            <p className="info-label">CenterAI</p>
            <p className="info-value">{comma(coinList.find(item => item.coinType === 401)?.balance)} <span className="info-unit2">CAI</span></p>
          </div>
        </div>
      </div>

      {/* 채굴영역 */}
      <div className="mining-box">
        <div className="mining-header">
          <span className="mining-title">일일 채굴</span>
          {user && user.miningStartDate && new Date() - new Date(user.miningStartDate) < 24 * 60 * 60 * 1000 ? (
            <span className="mining-time">채굴 중({dayjs().diff(dayjs(user.miningStartDate), 'minute') < 60 ? `${dayjs().diff(dayjs(user.miningStartDate), 'minute')}분 전` : `${dayjs().diff(dayjs(user.miningStartDate), 'hour')}시간 전`})</span>
          ) : (
            <Button type="primary" className="mining-button" onClick={handleMiningStart}>채굴하기</Button>
          )}
        </div>
        <p className="mining-speed"><b>1.80 CENT/h</b></p>
        <div className="mining-progress">
          <div className="mining-bar" style={{ width: `${user && user.miningStartDate && new Date() - new Date(user.miningStartDate) < 24 * 60 * 60 * 1000 ? (new Date() - new Date(user.miningStartDate)) / (24 * 60 * 60 * 1000) * 100 : 0}%` }}></div>
        </div>
        <div className="mining-power">
          <span>팀파워 10%</span>
          <span>락업파워 20%</span>
        </div>
        <RollingList items={bonusUserList} />

      </div>

      {/* 공지사항 */}
      <div className="notice-box">
        <div className="notice-list-title">
          <span>공지사항</span>
          <a href="#" className="notice-more">더보기</a>
        </div>
        <div className="notice-list">
          {noticeList.length > 0 ? (
            noticeList.map((item, idx) => (
              <div key={idx} className="notice-item">
                <div className="notice-item-title">{item.title}</div>
                <div className="notice-item-date">{item.date}</div>
              </div>
            ))
          ) : (
            <div className="notice-item-empty">공지사항이 없습니다.</div>
          )}
        </div>
      </div>

      {/* 버튼영역 */}
      <div className="link-buttons">
        <button className="link-button">FAQ</button>
        <button className="link-button">백서</button>
        <button className="link-button">센터코인</button>
      </div>

      {/* 피드영역 */}
      <div className="feed-list">
        {feedList.map((feed, idx) => (
          <div key={idx} className="feed-card" onClick={() => {
            window.open(feed.link, '_blank');
            // const feedContent = document.querySelectorAll('.feed-content')[idx];
            // if (feedContent.style.webkitLineClamp) {
            //   feedContent.style.webkitLineClamp = 'unset';
            // } else {
            //   feedContent.style.webkitLineClamp = '4';
            // }
          }}>
            <div className="feed-meta">{feed.hashtag} · {dayjs(feed.date).format('YYYY.MM.DD')}</div>
            <div className="feed-thumb">
              <img src={feed.image} alt="피드 이미지" className="object-cover" />
            </div>
            <div className="feed-body">
              <div className="feed-title">{feed.title}</div>
              <div className="feed-content">{feed.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* CSS 예시 스타일 구조 (SCSS 또는 전역 CSS 파일에 정의)
#home .notice-list-title {margin-bottom: 10px; display: flex; justify-content: space-between;}
#home .notice-more {font-size: 14px; color: #2563eb; text-decoration: none; padding: 3px 8px;}
#home .notice-list {border-top: 1px solid #999; border-bottom: 1px solid #999; padding: 10px 0;}
#home .notice-item-empty {text-align: center; color: #666;}
... 그 외 .info-box, .mining-box, .feed-card 등도 위 규칙에 맞춰 한 줄씩 작성 가능 */
