'use client';
import { Modal, Button, List } from 'antd';
import styles from '@/src/css/top.module.css';
import { usePathname } from 'next/navigation';
import { App } from 'antd';
import { useUser } from '@/src/context/UserContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { storageKeys } from '@/src/const';
import { LogoutOutlined, CloseOutlined } from '@ant-design/icons';
import httpClient from '@/src/lib/util/httpclient';
import { urls } from '@/src/const';
import LanguageBox from './LanguageBox';
import { useString } from '@/src/context/StringContext';
import { comma } from '@/src/lib/util/numberUtil';
const Top = () => {
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState('');
  const { message, modal } = App.useApp();
  const { user, setUser } = useUser();
  const router = useRouter();
  const [isSwitchModalVisible, setIsSwitchModalVisible] = useState(false);
  const [subAccounts, setSubAccounts] = useState([]);
  const [isBack, setIsBack] = useState(false);
  const { string } = useString();
  const [userStat, setUserStat] = useState({});

  useEffect(() => {
    if (pathname.startsWith('/menu/home')) {
      setPageTitle('HOME');
      setIsBack(false);
    }
    if (pathname.startsWith('/menu/wallet')) {
      setPageTitle('WALLET');
      setIsBack(false);
    }
    if (pathname.startsWith('/menu/mining')) {
      setPageTitle('MINING');
      setIsBack(false);
    }
    if (pathname.startsWith('/menu/referral')) {
      setPageTitle('REFERRAL');
      setIsBack(false);
    }
    if (pathname.startsWith('/menu/myinfo')) {
      setPageTitle('MY INFO');
      setIsBack(false);
    }
    if (pathname.startsWith('/menu/notice')) {
      setPageTitle('NOTICE');
      setIsBack(true);
    }
    if (pathname.startsWith('/menu/faq')) {
      setPageTitle('FAQ');
      setIsBack(true);
    }
    if (pathname.startsWith('/privacy')) {
      setPageTitle('PRIVACY');
      setIsBack(true);
    }
  }, [pathname]);

  useEffect(() => {
    getUserStat();
  }, []);
  const getUserStat = () => {
    httpClient.get(urls.userStat).then((result) => {
      setUserStat(result.data);
    });
  }

  const back = () => {
    router.back();
  }
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
          message.success(string.logoutSuccess);
        } catch (error) {
          message.error(string.logoutError);
        }
      }
    });
  };

  return (
    <div id="top">
      <div className="page-title">{pageTitle == 'HOME' ? '' : pageTitle}</div>
        {pageTitle == 'HOME' && (
        <div className="userStat">
          <div className="userStatItem">
            <div className="userStatItemTitle">{string.userStatTotal}:</div>
            <div className="userStatItemValue">{comma(userStat.totalUsers)}</div>
          </div>
          {/* <div className="userStatItem">
            <div className="userStatItemTitle">{string.userStatToday}:</div>
            <div className="userStatItemValue">{comma(userStat.todayUsers)}</div>
          </div> */}
        </div>
        )}
      <div className="iconContainer">
        <LanguageBox />
        {isBack && (
          <div
            onClick={back}
            style={{ display: "flex", alignItems: "center", marginLeft: 20 }}
            className="hoverEffect"
          >
            <CloseOutlined
              className="globalImg"
            />
          </div>
        )}
        {!isBack && (
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
        )}
      </div>
    </div>
  );
};

export default Top;