'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import moment from 'moment';
import httpClient from "@/src/lib/util/httpclient";
import { urls } from "@/src/const";
import { Suspense } from 'react';
const NoticePageContent = () => {
  const searchParams = useSearchParams();
  const defaultIdx = searchParams.get('idx');
  const [expandedIdx, setExpandedIdx] = useState(defaultIdx ? parseInt(defaultIdx) : null);

  const fetchNoticeList = async ({ pageParam = 1 }) => {
    const response = await httpClient.get(urls.boardList.replace('%s', pageParam).replace('%s', 10));
    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['noticeList'],
    queryFn: fetchNoticeList,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPage) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
  });

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

  if (status === 'loading') return <div className="notice-loading">로딩중...</div>;
  if (status === 'error') return <div className="notice-error">에러가 발생했습니다.</div>;

  return (
    <div id="notice">
      <div className="notice-container">
        <div className="notice-list">
          {data?.pages.map((page) =>
            page.list.map((notice) => {
              const isExpanded = expandedIdx === notice.boardIdx;
              return (
                <div
                  key={notice.boardIdx}
                  className="notice-item"
                  onClick={() =>
                    setExpandedIdx(isExpanded ? null : notice.boardIdx)
                  }
                >
                  <div className="notice-header">
                    <div className="notice-title">{notice.title}</div>
                    <div className="notice-date">{moment(notice.createDate).format('YYYY.MM.DD')}</div>
                  </div>

                  {isExpanded && (
                    <div className="notice-content">
                      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: notice.content }} />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {isFetchingNextPage && (
          <div className="notice-loading-more">로딩중...</div>
        )}
      </div>
    </div>
  );
};
export default function NoticePage() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
          <NoticePageContent />
      </Suspense>
  );
}
