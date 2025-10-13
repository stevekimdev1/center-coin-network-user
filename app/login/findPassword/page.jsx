'use client'
import { Form, Input, Modal, App } from "antd";
import { UserOutlined, LockOutlined, SafetyCertificateOutlined, LeftOutlined } from '@ant-design/icons';
import httpClient from "@/src/lib/util/httpclient";
import { urls } from "@/src/const";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useString } from '@/src/context/StringContext';

export default function FindPassword() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [timer, setTimer] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { message, modal } = App.useApp();
  const { string } = useString();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && isSent) {
      setIsSent(false);
      setIsVerified(false);
    }
    return () => clearInterval(interval);
  }, [timer, isSent]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSendCode = async () => {
    try {
      await form.validateFields(['email']);
      const email = form.getFieldValue('email');
      
      const response = await httpClient.post(urls.emailCodeDispatch, {
        email: email,
        checkUser: true,
      });

      if (response.data.result === 'INVALID_EMAIL_FORMAT') {
        modal.error({
          title: string.emailFormatError,
          content: string.emailFormat,
        });
      }
      if (response.data.result === 'USER_NOT_FOUND') {
        modal.error({
          title: string.userNotFound,
          content: string.userNotFoundMessage,
        });
      }
      if (response.data.result === 'RECENTLY_SENT') {
        modal.error({
          title: string.recentlySent,
          content: string.recentlySentMessage,
        });
      }
      form.setFieldValue('token', response.data.token); // 토큰 저장

      setTimer(300); // 5분
      setIsSent(true);
    } catch (error) {
    }
  };

  const handleVerifyCode = async () => {
    try {
      await form.validateFields(['verificationCode']);
      const code = form.getFieldValue('verificationCode');
      const token = form.getFieldValue('token');
      const response = await httpClient.get(urls.emailCodeVerify.replace('%s', token).replace('%s', code));
      if (response.data === 'INVALID') {
        modal.error({
          title: string.verificationCodeError,
          content: string.verificationCodeInvalid,
        });
        return;
      }
      if (response.data === 'EXPIRED') {
        modal.error({
          title: string.verificationCodeExpired,
          content: string.verificationCodeExpiredMessage,
        });
        return;
      }
      setIsVerified(true);
    } catch (error) {
    }
  };

  const onFinish = async (values) => {
    if (!isVerified) {
      form.setFields([{
        name: 'verificationCode',
        errors: [string.verificationRequired]
      }]);
      return;
    }
    try {
      const response = await httpClient.post(urls.findPassword, {
        email: form.getFieldValue('email'),
        token: form.getFieldValue('token'),
        code: form.getFieldValue('verificationCode'),
        newPassword: values.newPassword,
      });
      if (response.data === 'SUCCESS') {
        modal.success({
          title: string.passwordChangeSuccess,
          content: string.passwordChangeSuccessMessage,
          onOk: () => router.push('/login')
        });
        return;
      }

      const modalConfig = {
        title: string.passwordChangeFailed,
        content: ''
      };

      switch (response.data) {
        case 'USER_NOT_FOUND':
          modalConfig.content = string.userNotFoundMessage;
          break;
        case 'INVALID_PASSWORD_FORMAT':
          modalConfig.content = string.invalidPasswordFormat;
          break;
        case 'EXPIRED':
          modalConfig.content = string.expired;
          break;
        case 'INVALID_CODE':
          modalConfig.content = string.invalidCode;
          break;
        default:
          modalConfig.content = string.passwordChangeFailedMessage;
      }

      modal.error(modalConfig);
    } catch (error) {
    }
  };

  return (
    <div id="findPassword">
    <div className="container">
      <div className="findPasswordBox">
        
        <div className="header">
      <Link href="/login" className="backIcon">
                            <LeftOutlined />
                        </Link>
          <h1>{string.findPassword}</h1>
          <p>{string.findPasswordDesc}</p>
        </div>

        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="form"
        >
          <div className="formItem">
            <Form.Item
              name="email"
              rules={[
                { required: true, message: string.emailRequired },
                { type: 'email', message: string.emailFormat }
              ]}
            >
              <Input 
                placeholder={string.emailInput} 
                prefix={<UserOutlined />}
                disabled={isVerified}
              />
            </Form.Item>

            <Form.Item
              name="verificationCode"
              rules={[
                { required: true, message: string.verificationCodeRequired }
              ]}
            >
              <div className="inputWithButton">
                <Input
                  placeholder={string.verificationCodeInput}
                  prefix={<SafetyCertificateOutlined />}
                  disabled={isVerified}
                />
                {!isSent ? (
                  <button
                    type="button"
                    onClick={handleSendCode}
                    className="verificationButton"
                  >
                    {string.getVerificationCode}
                  </button>
                ) : isVerified ? (
                  <span className="verificationStatus">
                    {string.verificationComplete} ({formatTime(timer)})
                  </span>
                ) : timer === 0 ? (
                  <button
                    type="button"
                    onClick={handleSendCode}
                    className="verificationButton"
                  >
                    {string.resend}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleVerifyCode}
                      className="verificationButton"
                    >
                      {string.verifyCode}
                    </button>
                    <span className="timer" style={{zIndex: 1000}}>({formatTime(timer)})</span>
                  </>
                )}
              </div>
            </Form.Item>

            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: string.newPasswordRequired },
                { 
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{8,15}$/,
                  message: string.newPasswordFormat
                }
              ]}
            >
              <Input.Password 
                placeholder={string.newPasswordInput}
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item
              name="confirmNewPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: string.confirmNewPasswordRequired },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(string.confirmNewPasswordMismatch));
                  },
                }),
              ]}
            >
              <Input.Password 
                placeholder={string.confirmNewPasswordInput}
                prefix={<LockOutlined />}
              />
            </Form.Item>
          </div>

          <div className="buttonContainer">
            <button type="submit" className="submitButton">
              {string.changePassword}
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
  );
}
