'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCoin } from '@/src/context/CoinContext';
import confetti from 'canvas-confetti';

const MiningRewardPopup = () => {
    const [opened, setOpened] = useState(false);
    const [visible, setVisible] = useState(false);
    const { coinList } = useCoin();

    const reward = {
        amount: '0.1',
        symbol: 'ETH',
        icon: coinList.find(coin => coin.symbol === 'BNB')?.image
    };
    useEffect(() => {
        if (opened) {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      }, [opened]);
    return (
        <AnimatePresence>
            {visible && (
                <div id="mining-reward-popup" onClick={() => opened ? setVisible(false) : setOpened(true)}>
                    {!opened && (
                            <motion.div
                                initial={{ scale: 0.3, opacity: 0 }}
                                animate={{ scale: [1.0, 1.6, 1.0, 1.2, 1.0], opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="gift-box"
                            >
                                <img src="/img/giftbox.png" alt="Gift Box" width={200} height={200} />
                                <div className="tap-text">탭하여 열기</div>
                            </motion.div>
                    )}

                    {opened && (
                        <motion.div
                            className="reward-reveal"
                            initial={{ scale: 0.5, opacity: 0, y: 100 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                        >
                            <Image src={reward.icon} alt={reward.symbol} width={80} height={80} />
                            <div className="reward-text">+ {reward.amount} {reward.symbol}</div>
                            {/* <button className="close-btn" onClick={() => setVisible(false)}>닫기</button> */}
                        </motion.div>
                    )}

                    <style jsx>{`
          `}</style>
                </div>
            )}
        </AnimatePresence>
    );
};

export default MiningRewardPopup;
