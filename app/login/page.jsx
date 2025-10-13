'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import httpClient from "@/src/lib/util/httpclient";
import { useRouter } from 'next/navigation';
import { mainUrl, storageKeys, urls } from "@/src/const";
import { useUser } from '@/src/context/UserContext';
import { App } from 'antd';
import LanguageBox from '@/src/components/LanguageBox';
import { useString } from '@/src/context/StringContext';

export default function Login() {
  const { message, modal } = App.useApp();
  const { string } = useString();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    remember: false
  });
  const { setUser } = useUser();

  useEffect(() => {
    const savedUserId = localStorage.getItem(storageKeys.loginId);
    if (savedUserId) {
      setFormData(prev => ({
        ...prev,
        userId: savedUserId,
        remember: true
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await httpClient.post(urls.login, formData);
      if (response.data.result === 'EMAIL_NOT_VERIFIED') {
        modal.error({
          title: string.emailVerificationRequired,
          content: string.emailVerificationMessage,
          okText: string.close,
          okCancel: true,
          cancelText: string.resendVerificationEmail,
          onCancel: async () => {
            try {
              const userId = formData.userId;
              const response = await httpClient.post(urls.signupResend + '/' + encodeURIComponent(userId));
              const result = response.data;

              let modalConfig = {
                title: '',
                content: ''
              };

              switch (result) {
                case 'SUCCESS':
                  modalConfig = {
                    title: string.resendSuccess,
                    content: string.resendSuccessMessage
                  };
                  modal.success(modalConfig);
                  break;
                case 'INVALID_EMAIL':
                  modalConfig = {
                    title: string.resendFailed,
                    content: string.invalidEmailAddress
                  };
                  modal.error(modalConfig);
                  break;
                case 'ALREADY_VERIFIED':
                  modalConfig = {
                    title: string.alreadyVerified,
                    content: string.alreadyVerifiedMessage
                  };
                  modal.info(modalConfig);
                  break;
                case 'RECENTLY_SENT':
                  modalConfig = {
                    title: string.resendLimit,
                    content: string.resendLimitMessage
                  };
                  modal.warning(modalConfig);
                  break;
                default:
                  modalConfig = {
                    title: string.resendFailed,
                    content: string.serverError
                  };
                  modal.error(modalConfig);
              }
            } catch (error) {
              console.log(error);
              modal.error({
                title: string.resendFailed,
                content: string.resendError
              });
            }
          }
        });
        setLoading(false);
        return;
      }
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      localStorage.setItem(storageKeys.accessToken, accessToken);
      localStorage.setItem(storageKeys.refreshToken, refreshToken);
      setUser(response.data.user);
      if (formData.remember) {
        localStorage.setItem(storageKeys.loginId, formData.userId);
      } else {
        localStorage.removeItem(storageKeys.loginId);
      }

      // 저장된 returnUrl이 있으면 해당 페이지로, 없으면 기본 페이지로
      const returnUrl = localStorage.getItem(storageKeys.returnUrl) || mainUrl;
      localStorage.removeItem(storageKeys.returnUrl); // returnUrl 삭제
      router.push(returnUrl);
    } catch (error) {
      console.log(error);
      modal.error({
        title: string.loginFailed,
        content: string.loginFailedMessage
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'remember' ? checked : value
    }));
  };

  return (
    <div id="login">
        <form onSubmit={handleSubmit}>
      {/* 헤더 */}
      <div className="header">
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 20px' }}>
          <LanguageBox />
        </div>
      </div>
      <div className="container">
        <img src="/img/logo-text.png" className="logoImg" />
        <div className="formBox">
            <Input
              size="large"
              name="userId"
              placeholder={string.idEmail}
              prefix={<UserOutlined />}
              value={formData.userId}
              onChange={handleChange}
            />
        </div>
        <div className="formBox">
            <Input.Password
              size="large"
              name="password"
              placeholder={string.password}
              prefix={<LockOutlined />}
              value={formData.password}
              onChange={handleChange}
            />
        </div>
        <div className="loginOptionBox">
            <Checkbox
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            >
              {string.savedId}
            </Checkbox>
        </div>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="loginBtn"
            block
          >
            {string.login}
          </Button>
          <div className="signupLink">
          <Link href="/signup">{string.signUp}</Link> 
          | <Link href="/login/findPassword">{string.findPw}</Link>
          </div>
        {/* <div className="loginOptionBox">
          <div onClick={() => navigate("/modifyPassword")} className="findPw">
            {string.findPw}
          </div>
          <div className="slash">/</div>
          <div onClick={() => navigate("/signup")} className="signup">
            {string.signUp}
          </div>
        </div> */}
      </div>
      </form>
    </div>
  );
}
