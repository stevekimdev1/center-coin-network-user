import React from "react";
import { Drawer, List, Tag } from "antd";
import { comma } from "@/src/lib/util/numberUtil";
import { urls } from "@/src/const";
import httpClient from "@/src/lib/util/httpclient";
import { App } from "antd";
import moment from "moment";
import { useCoin } from "@/src/context/CoinContext";

const TranslogModal = ({ translogModalVisible, setTranslogModalVisible, coinType }) => {
  const { message } = App.useApp();
  const { coinList } = useCoin();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const result = await httpClient.get(
        urls.walletTransLogList
          .replace('%s', coinType)
          .replace('%s', params.pagination?.current || pagination.current)
          .replace('%s', params.pagination?.pageSize || pagination.pageSize)
          .replace('%s', '')
      );
      setData(result.data.list);
      setPagination({
        ...pagination,
        total: result.data.total,
      });
    } catch (error) {
      message.error('거래내역을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (translogModalVisible) {
      fetchData();
    }
  }, [translogModalVisible, pagination.current, pagination.pageSize]);

  const handlePaginationChange = (page, pageSize) => {
    setPagination({
      ...pagination,
      current: page,
      pageSize,
    });
  };

  const renderTransactionType = (type, coinType, from, status) => {
    const myAddress = coinList.find(x => x.coinType == coinType)?.address;
    const getTagColor = (type) => {
      switch(type) {
        case 'E2I': return '#1771d8';
        case 'I2E': return '#FF6B6B';
        case 'SEND': return from == myAddress ? '#4ECDC4' : '#ff9f1c';
        default: return '#B8C2CC';
      }
    };

    const getLabel = (type) => {
      switch(type) {
        case 'E2I': return '외부입금';
        case 'I2E': return '외부송금 ' + (status == 'SUCCESS' ? '완료' : status == 'FAIL' ? '실패' : '진행중');
        case 'SEND': return from == myAddress ? '송금' : '입금';
        default: return type;
      }
    };

    return (
      <Tag color={getTagColor(type)} className="translog-tag">
        {getLabel(type)}
      </Tag>
    );
  };

  return (
    <Drawer
      title={`${coinList.find(coin => coin.coinType === coinType)?.name} 거래내역`}
      placement="right"
      closable={true}
      onClose={() => setTranslogModalVisible(false)}
      open={translogModalVisible}
      width={480}
      destroyOnClose
      maskClosable={true}
      className="translog-modal"
      id="translog-modal"
    >
      <List
        dataSource={data}
        loading={loading}
        pagination={{
          ...pagination,
          onChange: handlePaginationChange,
        }}
        renderItem={(item) => (
          <div className="translog-card">
            <div className="translog-header">
              {renderTransactionType(item.type, item.coinType, item.from, item.status)}
              <div className="translog-amount">
                <span>{comma(item.amountDouble, 4)}</span> {coinList.find(coin => coin.coinType === coinType)?.name}
              </div>
            </div>
            <div className="translog-address">{item.from || '-'} → {item.to || '-'}</div>
            {item.txid && <div className="translog-txid">txid: {item.txid}</div>}
            <div className="translog-date">{moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
          </div>
        )}
      />
    </Drawer>
  );
};

export default TranslogModal;
