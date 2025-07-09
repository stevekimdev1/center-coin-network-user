'use client';

import React, { useEffect, useState } from 'react';
import { List, Spin } from 'antd';
// import httpClient from '@/src/lib/util/httpclient';
// import { urls } from '@/src/const';

const MiningHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreData = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      // 실제 API 연동 예시 (limit=10)
      // const result = await httpClient.get(`${urls.miningHistory}?page=${page}&limit=10`);
      // const newData = result.data.list || [];

      // 더미 데이터 사용
      const newData = [
        { date: '2025-06-19', amount: 0.1, symbol: 'CENT' },
        { date: '2025-06-19', amount: 0.1, symbol: 'CAI' },
        { date: '2025-06-19', amount: 0.001, symbol: 'ETH' },
        { date: '2025-06-14', amount: 0.05, symbol: 'CENT' },
        { date: '2025-06-13', amount: 0.04, symbol: 'CENT' },
        { date: '2025-06-11', amount: 0.04, symbol: 'CENT' }
      ];

      setHistory(prev => [...prev, ...newData]);
      setHasMore(false); // 더미는 1회만 출력
      setPage(prev => prev + 1);
    } catch (e) {
      console.error('Failed to load mining history', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div id="mininghistory">
      <h2 className="title">채굴 이력</h2>
      <List
        dataSource={history}
        renderItem={(item, index) => (
          <div className="history-item" key={index}>
            <div className="history-date">{item.date}</div>
            <div className="history-amount">{item.amount} {item.symbol}</div>
          </div>
        )}
        loadMore={
          hasMore && !loading ? (
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <a onClick={loadMoreData}>더 보기</a>
            </div>
          ) : null
        }
      />
      {loading && (
        <div style={{ textAlign: 'center', padding: '12px 0' }}>
          <Spin />
        </div>
      )}

      <style jsx>{`
      `}</style>
    </div>
  );
};

export default MiningHistory;
