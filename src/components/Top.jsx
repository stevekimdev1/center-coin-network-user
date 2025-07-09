'use client';
import { Modal, Button, List } from 'antd';
import styles from '@/src/css/top.module.css';
import { usePathname } from 'next/navigation';
import { App } from 'antd';
import { useUser } from '@/src/context/UserContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import string from "@/src/language/StringKo";
import { storageKeys } from '@/src/const';
import { LogoutOutlined, SwapOutlined, CheckCircleFilled } from '@ant-design/icons';
import httpClient from '@/src/lib/util/httpclient';
import { urls } from '@/src/const';

const Top = () => {
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState('');
  const { message, modal } = App.useApp();
  const { user, setUser } = useUser();
  const router = useRouter();
  const [isSwitchModalVisible, setIsSwitchModalVisible] = useState(false);
  const [subAccounts, setSubAccounts] = useState([]);

  useEffect(() => {
    if (pathname.startsWith('/menu/home')) setPageTitle('HOME');
    if (pathname.startsWith('/menu/wallet')) setPageTitle('WALLET');
    if (pathname.startsWith('/menu/mining')) setPageTitle('MINING');
    if (pathname.startsWith('/menu/referral')) setPageTitle('REFERRAL');
    if (pathname.startsWith('/menu/myinfo')) setPageTitle('MY INFO');
    if (pathname.startsWith('/menu/notice')) setPageTitle('NOTICE');
  }, [pathname]);

  const logout = () => {
    modal.confirm({
      title: string.myinfoLogout,
      content: string.myinfoLogoutConfirm,
      okText: string.ok,
      cancelText: string.cancel,
      onOk: () => {
        try {
          localStorage.removeItem(storageKeys.accessToken);
          localStorage.removeItem(storageKeys.refreshToken);
          localStorage.removeItem(storageKeys.user);
          setUser(null);
          
          router.push('/login');
          message.success('로그아웃되었습니다.');
        } catch (error) {
          message.error('로그아웃 중 오류가 발생했습니다.');
        }
      }
    });
  };

  return (
    <div id="top">
      <div className="page-title">{pageTitle}</div>
      <div>&nbsp;</div>
      <div className="iconContainer">
        <div
          onClick={logout}
          style={{ display: "flex", alignItems: "center", marginLeft: 20 }}
          className="hoverEffect"
        >
          <LogoutOutlined 
            className="globalImg" 
            title="Logout" 
            style={{ color: '#1771d8', fontSize: 18 }} 
          />
        </div>
      </div>
    </div>
  );
};

export default Top;