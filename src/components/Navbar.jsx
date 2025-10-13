'use client';
import Link from 'next/link';
import styles from '@/src/css/Navbar.module.css';
import { useUser } from '@/src/context/UserContext';
import { storageKeys, mainUrl, urls } from '@/src/const';
import { App } from 'antd';
import { useState, useEffect } from 'react';
import httpClient from '@/src/lib/util/httpclient';
import { Badge } from 'antd';
import { HomeOutlined, GiftOutlined, UserOutlined, FileTextOutlined, WalletOutlined, TeamOutlined } from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { LuPickaxe } from "react-icons/lu";

const Navbar = () => {
  const { message, modal } = App.useApp();
  const { user, setUser } = useUser();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [selectedKey, setSelectedKey] = useState('home');

  // 경로 변경 감지
  useEffect(() => {
    if (pathname.startsWith('/menu/home')) setSelectedKey('home');
    if (pathname.startsWith('/menu/notice')) setSelectedKey('home');
    if (pathname.startsWith('/menu/wallet')) setSelectedKey('wallet');
    if (pathname.startsWith('/menu/mining')) setSelectedKey('mining');
    if (pathname.startsWith('/menu/referral')) setSelectedKey('referral');
    if (pathname.startsWith('/menu/myinfo')) setSelectedKey('myinfo');
  }, [pathname]);

  return (
    <div id="bottom">     
        <div className='bottom-container'>
            <div className='bottom-inner'>
                <div onClick={()=>router.push('/menu/home')} className='bottom-btn'>
                    <HomeOutlined style={{color: selectedKey == 'home' ? '#fff' : '#ACC4E6', fontSize: 20}}/>
                </div>
                <div onClick={()=>router.push('/menu/wallet')} className='bottom-btn'>
                    <WalletOutlined style={{color: selectedKey == 'wallet' ? '#fff' : '#ACC4E6', fontSize: 20}}/>
                </div>
                {/* <div onClick={()=>router.push('/menu/mining')} className='bottom-btn'>
                    <LuPickaxe style={{color: selectedKey == 'mining' ? '#fff' : '#ACC4E6', fontSize: 20, marginTop: 4}}/>
                </div>
                <div onClick={()=>router.push('/menu/referral')} className='bottom-btn'>
                    <TeamOutlined style={{color: selectedKey == 'referral' ? '#fff' : '#ACC4E6', fontSize: 20}}/>
                </div> */}
                <div onClick={()=>router.push('/menu/myinfo')} className='bottom-btn'>
                    <UserOutlined style={{color: selectedKey == 'myinfo' ? '#fff' : '#ACC4E6', fontSize: 20}}/>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Navbar; 