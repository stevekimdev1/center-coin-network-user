'use client'
import { useEffect, useState, useRef, useCallback } from "react";
import { Button, Spin } from "antd";
import { useRouter } from 'next/navigation';
import moment from "moment";
import { comma } from "@/src/lib/util/numberUtil";


import httpClient from "@/src/lib/util/httpclient";
import { urls } from "@/src/const";
import string from "@/src/language/StringKo";
import { useCoin } from "@/src/context/CoinContext";

const History = () => {
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const loader = useRef(null);
  const [page, setPage] = useState(1);
  const pageLoaded = useRef(0);
  const [hasMore, setHasMore] = useState(true);
  const { coinList } = useCoin();
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);

    return () => observer.disconnect();
  }, [handleObserver]);

  useEffect(() => {
    console.log('useEffect', page);

    getList(page);
  }, [page]);

  const getList = async () => {
    console.log('getList', page);
    setIsFetching(true);
    try {
      const url = urls.walletTransLogList.replace('%s', 0).replace('%s', page).replace('%s', 20);
      const response = await httpClient.get(url);
      if (response.data.currentPage <= pageLoaded.current) return;
      pageLoaded.current = response.data.currentPage;

      const newList = response.data.list;
      if (newList.length === 0) setHasMore(false);
      else setList((prevList) => [...prevList, ...newList]);
    } catch (error) {
      console.error('Error fetching transaction logs:', error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div id="history">
      <div className="content">
        <div className="list-wrapper">
          {list.length === 0 && (
            <div style={{ textAlign: 'center', paddingTop: '100px' }}>{string.nodata}</div>
          )}
          {list.map((row, index) => {

            const myAddress = coinList.find(x => x.coinType == row.coinType)?.address;
            let typeClass = '';
            let typeText = '';
            switch (row.type) {
              case 'E2I':
                typeClass = 'list-e2i';
                typeText = '외부입금';
                break;
              case 'I2E':
                typeClass = 'list-i2e';
                typeText = '외부송금';
                break;
              case 'SEND':
                typeClass = row.from == myAddress ? 'list-send' : 'list-receive';
                typeText = row.from == myAddress ? '송금' : '입금';
                break;
              default:
                typeClass = 'list-other';
                typeText = row.type;
            }

            return (
              <div key={index} className="list-item">
                <div className="list-row">
                  <div className={typeClass}>
                    {typeText}
                  </div>
                  <div className="list-amount">
                    {row.amountDouble} <span className="list-amount-unit"> {coinList.find(x => x.coinType === row.coinType)?.name}</span>
                  </div>
                </div>
                <div className="list-row">
                  <div className="list-date">
                    {moment(row.createDate).format("YYYY-MM-DD HH:mm:ss")}
                  </div>
                  {/* <div className="list-amount2">
                    <span className="list-amount-balance">{string.myValue}:</span> {comma((row.toSkrBalance / 1000000000).toFixed(4))} <span className="list-amount-unit">SKR</span>
                  </div> */}
                </div>
              </div>
            );
          })}
          <div ref={loader} className="loading">
            {isFetching && <Spin size="large" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
