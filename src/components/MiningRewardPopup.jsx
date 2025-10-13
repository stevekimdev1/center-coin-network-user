'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCoin } from '@/src/context/CoinContext';
import httpClient from '@/src/lib/util/httpclient';
import { urls } from '@/src/const';
import confetti from 'canvas-confetti';
import { comma } from "@/src/lib/util/numberUtil";
import { useString } from "@/src/context/StringContext";

const MiningRewardPopup = () => {
    const [opened, setOpened] = useState(false);
    const [visible, setVisible] = useState(false);
    const { coinList } = useCoin();
    const { string } = useString();
    const [reward, setReward] = useState({
        amount: '0.0',
        symbol: 'BTC',
        icon: coinList.find(coin => coin.symbol === 'BTC')?.image
    });
    const [isSuccess, setIsSuccess] = useState(false);

    // 화면이 열릴 때 호출되는 함수
    const handleScreenOpen = () => {
        const lastOpenedTime = localStorage.getItem('miningRewardLastOpened');
        const currentTime = Date.now();
        // const fiveMinutesInMs = 1;
        const fiveMinutesInMs = 5 * 60 * 1000;

        if (lastOpenedTime) {
            const timeDiff = currentTime - parseInt(lastOpenedTime);
            if (timeDiff < fiveMinutesInMs) {
                return;
            }
        }

        setVisible(true);
        localStorage.setItem('miningRewardLastOpened', currentTime.toString());
    };

    useEffect(() => {
        handleScreenOpen();
    }, []);
    useEffect(() => {
        getMiningEventList();
    }, [coinList]);
    const getMiningEventList = () => {
        if (coinList) {
            httpClient.get(urls.miningEventList).then((res) => {

                if (res.data.length > 0) {
                    const event = res.data[0];
                    const coin = coinList.find(coin => coin.coinType === event.coinType);
                    setReward({
                        amount: comma(event.amount / 1000000000, 4),
                        symbol: coin?.symbol,
                        icon: coin?.image
                    });
                    setIsSuccess(true);
                }
                else {
                    const coin = coinList.find(coin => coin.coinType === 403);
                    setReward({
                        amount: 0.0,
                        symbol: coin?.symbol,
                        icon: coin?.image
                    });
                    setIsSuccess(false);
                }
            });

        }
    }
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
                            <div className="tap-text">{string.tapToOpen}</div>
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
                            <div className="reward-text2">{isSuccess ? string.miningRewardSuccessExplain : string.miningRewardFailExplain}</div>
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
