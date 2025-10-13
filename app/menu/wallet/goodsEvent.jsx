'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Button, Modal, Form, Input, App, Spin } from 'antd';
import { useInfiniteQuery } from '@tanstack/react-query';
import httpClient from "@/src/lib/util/httpclient";
import { urls } from '@/src/const';
import { useString } from '@/src/context/StringContext';
import dayjs from 'dayjs';

export default function GoodsEvent() {
    const { string } = useString();
    const { message } = App.useApp();
    const [addressModalVisible, setAddressModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [form] = Form.useForm();

    // 생필품이벤트 목록 조회
    const fetchGoodsEventList = async ({ pageParam = 1 }) => {
        const response = await httpClient.get(`${urls.goodsEventList}?pageNum=${pageParam}&pageSize=10`);
        return response.data;
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        refetch
    } = useInfiniteQuery({
        queryKey: ['goodsEventList'],
        queryFn: fetchGoodsEventList,
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPage) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
    });

    // 인피니트 스크롤 처리
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 &&
                hasNextPage &&
                !isFetchingNextPage
            ) {
                fetchNextPage();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    // 다음 주소검색 API 스크립트 로드
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.head.appendChild(script);

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);

    // 주소 검색 함수
    const searchAddress = () => {
        if (typeof window.daum === 'undefined') {
            message.error('주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
            return;
        }

        new window.daum.Postcode({
            oncomplete: function (data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
                // 예제를 참고하여 동적으로 HTML을 생성하고 표시하는 방법을 설명합니다.
                let addr = ''; // 주소 변수
                let extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if (data.userSelectedType === 'R') {
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if (data.buildingName !== '' && data.apartment === 'Y') {
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if (extraAddr !== '') {
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    addr += extraAddr;
                }

                // 주소 정보를 해당 필드에 넣는다.
                form.setFieldsValue({
                    address: addr
                });
            }
        }).open();
    };

    // 주소 입력 모달 열기
    const openAddressModal = (event) => {
        setSelectedEvent(event);
        // form을 먼저 초기화한 후 값을 설정
        form.resetFields();
        setTimeout(() => {
            form.setFieldsValue({
                address: event.address || '',
                addressDetail: event.addressDetail || ''
            });
        }, 0);
        setAddressModalVisible(true);
    };

    // 주소 업데이트
    const handleAddressUpdate = async (values) => {
        try {
            const response = await httpClient.post(urls.goodsEventAddressUpdate, {
                idx: selectedEvent.idx,
                address: values.address,
                addressDetail: values.addressDetail
            });

            if (response.data == 'SUCCESS') {
                message.success('주소가 성공적으로 등록되었습니다.');
                setAddressModalVisible(false);
                form.resetFields();
                refetch(); // 목록 새로고침
            } else if (response.data == 'LEVEL_LOW') {
                message.error('CENT 보유량이 부족합니다.');
            } else {
                message.error('주소 등록에 실패했습니다.');
            }
        } catch (error) {
            console.error('주소 업데이트 오류:', error);
            message.error('주소 등록 중 오류가 발생했습니다.');
        }
    };

    // 배송 상태에 따른 텍스트 반환
    const getStatusText = (status) => {
        switch (status) {
            case 'CREATED': return '주소입력대기';
            case 'PREPARE': return '상품준비중';
            case 'CONFIRM': return '확인필요';
            case 'COMPLETE': return '배송완료';
            case 'CANCEL': return '취소';
            default: return status;
        }
    };

    // 배송 상태에 따른 색상 반환
    const getStatusColor = (status) => {
        switch (status) {
            case 'CREATED': return '#ff4d4f';
            case 'PREPARE': return '#faad14';
            case 'CONFIRM': return '#1890ff';
            case 'COMPLETE': return '#52c41a';
            case 'CANCEL': return '#d9d9d9';
            default: return '#666';
        }
    };

    if (status === 'loading') {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <Spin size="large" />
                <div style={{ marginTop: '16px' }}>생필품이벤트 목록을 불러오는 중...</div>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div style={{ textAlign: 'center', padding: '40px', color: '#ff4d4f' }}>
                생필품이벤트 목록을 불러오는데 실패했습니다.
            </div>
        );
    }

    const allEvents = data?.pages?.flatMap(page => page.list || []) || [];

    return (
        <div className="goods-event-container">
            {allEvents.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    등록된 생필품이벤트가 없습니다.
                </div>
            ) : (
                <div className="goods-event-list">
                    {allEvents.map((event, index) => (
                        <div key={`${event.idx}-${index}`} className="goods-event-card">
                            <div className="goods-event-header">
                                <div className="goods-event-title">{event.goodsName}</div>
                                <div
                                    className="goods-event-status"
                                    style={{ color: getStatusColor(event.status) }}
                                >
                                    {getStatusText(event.status)}
                                </div>
                            </div>

                            <div className="goods-event-content">
                                <div className="goods-event-detail">{event.goodsDetail}</div>

                                {event.fileIdx && (
                                    <div className="goods-event-image">
                                        <img
                                            src={`${urls.imageFile.replace('%s', event.fileIdx)}`}
                                            alt={event.goodsName}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}

                                {event.address && (
                                    <div className="goods-event-address">
                                        <div className="address-label">배송주소:</div>
                                        <div className="address-content">
                                            {event.address} {event.addressDetail}
                                        </div>
                                    </div>
                                )}

                                <div className="goods-event-date">
                                    등록일: {dayjs(event.createDate).format('YYYY-MM-DD HH:mm')}
                                </div>
                            </div>

                            {/* CREATED, CONFIRM 상태일 때 주소 입력 버튼 표시 */}
                            {(event.status === 'CREATED' || event.status === 'CONFIRM') && (
                                <div className="goods-event-actions">
                                    <Button
                                        type="primary"
                                        onClick={() => openAddressModal(event)}
                                        className="address-button"
                                    >
                                        {event.address ? '주소 수정' : '주소 입력'}
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* 로딩 인디케이터 */}
                    {isFetchingNextPage && (
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                            <Spin />
                            <div style={{ marginTop: '8px', color: '#666' }}>더 많은 이벤트를 불러오는 중...</div>
                        </div>
                    )}

                    {/* 더 이상 데이터가 없을 때 */}
                    {!hasNextPage && allEvents.length > 0 && (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                            모든 생필품이벤트를 불러왔습니다.
                        </div>
                    )}
                </div>
            )}

            {/* 주소 입력 모달 */}
            <Modal
                title="배송 주소 입력"
                open={addressModalVisible}
                onCancel={() => {
                    setAddressModalVisible(false);
                    form.resetFields();
                }}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddressUpdate}
                    preserve={false}
                >
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <Form.Item
                                name="address"
                                label="주소"
                                rules={[{ required: true, message: '주소를 입력해주세요' }]}
                            >
                                <Input
                                    placeholder="주소를 검색해주세요"
                                    readOnly
                                    style={{ flex: 1 }}
                                />
                            </Form.Item>

                        </div>
                        <div style={{ marginTop: '8px' }}>
                            <Button type="default" onClick={searchAddress}>
                                주소 검색
                            </Button>

                        </div>
                    </div>

                    <Form.Item
                        name="addressDetail"
                        label="상세주소"
                        rules={[{ required: true, message: '상세주소를 입력해주세요' }]}
                    >
                        <Input placeholder="상세주소를 입력해주세요 (예: 101동 101호)" />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Button type="default" onClick={() => setAddressModalVisible(false)} style={{ marginRight: 8 }}>
                            취소
                        </Button>
                        <Button type="primary" htmlType="submit">
                            등록
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <style jsx>{`
        .goods-event-container {
          padding: 0;
        }

        .goods-event-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .goods-event-card {
          border: 1px solid #e8e8e8;
          border-radius: 12px;
          padding: 16px;
          background: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .goods-event-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .goods-event-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }

        .goods-event-status {
          font-size: 12px;
          font-weight: 500;
          padding: 4px 8px;
          border-radius: 4px;
          background: rgba(0, 0, 0, 0.04);
        }

        .goods-event-content {
          margin-bottom: 12px;
        }

        .goods-event-detail {
          font-size: 14px;
          color: #666;
          margin-bottom: 12px;
          line-height: 1.5;
        }

        .goods-event-image {
          margin-bottom: 12px;
        }

        .goods-event-image img {
          width: 100%;
          max-width: 200px;
          height: auto;
          border-radius: 8px;
          object-fit: cover;
        }

        .goods-event-address {
          margin-bottom: 8px;
        }

        .address-label {
          font-size: 12px;
          color: #999;
          margin-bottom: 4px;
        }

        .address-content {
          font-size: 14px;
          color: #333;
          background: #f5f5f5;
          padding: 8px;
          border-radius: 4px;
        }

        .goods-event-date {
          font-size: 12px;
          color: #999;
        }

        .goods-event-actions {
          display: flex;
          justify-content: flex-end;
        }

        .address-button {
          background: #1890ff;
          border-color: #1890ff;
        }

        .address-button:hover {
          background: #40a9ff;
          border-color: #40a9ff;
        }
      `}</style>
        </div>
    );
}
