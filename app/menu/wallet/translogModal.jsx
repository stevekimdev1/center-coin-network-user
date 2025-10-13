import React from "react";
import { Drawer, List, Tag } from "antd";
import { comma } from "@/src/lib/util/numberUtil";
import { urls } from "@/src/const";
import httpClient from "@/src/lib/util/httpclient";
import { App } from "antd";
import moment from "moment";
import { useCoin } from "@/src/context/CoinContext";
import { useString } from '@/src/context/StringContext';

const TranslogModal = ({ translogModalVisible, setTranslogModalVisible, coinType }) => {
  const { message } = App.useApp();
  const { coinList } = useCoin();
  const { string } = useString();
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
      message.error(string.transactionHistoryLoadError);
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
        case 'MINING': return '#685ee8';
        case 'EVENT': return '#f2770b'; // 오렌지색 (이벤트)
        case 'WITHDRAW': return '#e74c3c'; // 빨간색 (출금)
        default: return '#B8C2CC';
      }
    };

    const getLabel = (type) => {
      switch(type) {
        case 'E2I': return string.externalDeposit;
        case 'I2E': return string.externalTransfer + ' ' + (status == 'SUCCESS' ? string.externalTransferComplete : status == 'FAIL' ? string.externalTransferFailed : string.externalTransferInProgress);
        case 'SEND': return from == myAddress ? string.send : string.receive;
        case 'MINING': return string.mining;
        case 'EVENT': return string.event;
        case 'WITHDRAW': return string.withdraw;
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
      title={`${coinList.find(coin => coin.coinType === coinType)?.name} ${string.transactionHistoryTitle}`}
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
