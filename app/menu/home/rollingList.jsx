'use client';
import { useEffect, useRef, useState } from 'react';

const RollingList = ({ items }) => {
  const listRef = useRef(null);
  const itemRef = useRef(null);
  const [cloneItems, setCloneItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [transition, setTransition] = useState(true);
  const [itemHeight, setItemHeight] = useState(0);

  // 높이 측정
  useEffect(() => {
    setCloneItems([...items, ...items]);
  }, [items]);

  useEffect(() => {
    // 0.1초 후 높이 측정 (DOM 렌더링 보장)
    const timer = setTimeout(() => {
      if (itemRef.current) {
        const height = itemRef.current.offsetHeight;
        setItemHeight(height);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [cloneItems]);

  // 롤링 애니메이션
  useEffect(() => {
    if (itemHeight === 0) return;
    const interval = setInterval(() => {
      setOffset((prev) => {
        const maxOffset = items.length * itemHeight;
        if (prev + itemHeight >= maxOffset) {
          setTransition(false);
          setTimeout(() => {
            setOffset(0);
            setTimeout(() => setTransition(true), 50);
          }, 50);
          return prev; // 바로 0으로 바꾸지 말고, 일단 유지
        }
        return prev + itemHeight;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [itemHeight, items]);

  return (
    <div className="mining-reward rolling-vertical-step">
      <div
        className="step-track"
        ref={listRef}
        style={{
          transform: `translateY(-${offset+15}px)`,
          transition: transition ? 'transform 0.6s ease-in-out' : 'none',
        }}
      >
        {cloneItems.map((item, idx) => (
          <div
            className="step-item"
            key={idx}
            ref={idx === 0 ? itemRef : null}
          >
            <span style={{ fontWeight: 'bold' }}>{item.userId}</span> 보너스채굴 <span style={{ fontWeight: 'bold', color: '#0044ff' }}>{item.amount}</span> {item.symbol}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RollingList;
