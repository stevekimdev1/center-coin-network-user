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
import string from "@/src/language/StringKo";

export default function Login() {
  const { message, modal } = App.useApp();
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
          title: '관리자 미승인',
          content: '관리자 승인 후 로그인하실 수 있습니다. ',
          okText: '닫기',
        });
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
        title: '로그인 실패',
        content: '아이디 또는 비밀번호를 확인해주세요.'
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
            로그인
          </Button>
          <div className="signupLink">
          <Link href="/signup">회원가입</Link> 
          {/* | <Link href="/login/findPassword">비밀번호 찾기</Link> */}
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
