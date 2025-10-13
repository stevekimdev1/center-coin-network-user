'use client'
import React, { useState, useEffect } from "react";
import { App, Divider, Input, Form, Button, Modal } from "antd";
import { useUser } from "@/src/context/UserContext";
import { urls } from "@/src/const";
import httpClient from "@/src/lib/util/httpclient";
import { useString } from '@/src/context/StringContext';
import { LockOutlined } from '@ant-design/icons';
import { storageKeys } from '@/src/const';
import { useRouter } from 'next/navigation';

const Myinfo = () => {
  const router = useRouter();
  const { message, modal } = App.useApp();
  const { user, setUser } = useUser();
  const { string } = useString();
  const [changeNameVisible, setChangeNameVisible] = useState(false);
  const [changePwVisible, setChangePwVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [withdrawalVisible, setWithdrawalVisible] = useState(false);
  const [withdrawForm] = Form.useForm();

  useEffect(() => {
    getMyInfo();
  }, []);

  const getMyInfo = () => {
    httpClient.get(urls.myinfo).then((result) => {
      setUser(result.data);
    });
  };

  const onChangePassword = () => {
    httpClient.post(urls.myinfoModify, {
      password: password,
      newPassword: newPassword,
    }).then((result) => {
      result = result.data;
      if (result === 'SUCCESS') {
        setChangePwVisible(false);
        setPassword('');
        setNewPassword('');
        modal.success({ content: string.passwordChanged });
      } else {
        if (result === 'INVALID_PASSWORD_FORMAT') {
          modal.error({ content: string.invalidPasswordFormat });
        } else if (result === 'INVALID_PASSWORD') {
          modal.error({ content: string.invalidCurrentPassword });
        } else {
          modal.error({ content: string.passwordChangeFailed });
        }
      }
    }).catch(() => {
      modal.error({ content: string.passwordChangeFailed });
    });
  };

  const onChangeName = () => {
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/;
    if (!regex.test(newName)) {
      modal.error({ content: string.nameFormatError });
      setNewName('');
      return;
    }
    httpClient.post(urls.userUpdateNickname, { name: newName }).then((result) => {
      if (result.data === true) {
        modal.success({ content: string.nameChanged });
        setChangeNameVisible(false);
        getMyInfo();
      } else {
        modal.error({ content: string.nameChangeFailed });
      }
    }).catch(() => {
      modal.error({ content: string.nameChangeFailed });
    });
  };

  const handleWithdraw = async (values) => {
    try {
      const response = await httpClient.post(urls.withdraw, {
        password: values.password
      });

      switch (response.data) {
        case 'SUCCESS':
          message.success(string.withdrawalSuccess);
          localStorage.removeItem(storageKeys.accessToken);
          localStorage.removeItem(storageKeys.refreshToken);
          localStorage.removeItem(storageKeys.user);
          setUser(null);
          router.push('/');
          break;
        case 'INVALID_PASSWORD':
          message.error(string.invalidPassword);
          break;
        case 'FAIL':
          message.error(string.withdrawalFailed);
          break;
        default:
          message.error(string.withdrawalFailed);
      }
    } catch (error) {
      console.log(error);
      message.error(string.withdrawalFailed);
    }
  };
  return (
    <div id="myinfo">
      <div className="myinfo-section">
        <div className="myinfo-header">
          <div className="myinfo-title">{string.myInfo}</div>
        </div>
        <div className="myinfo-row">
          <div className="myinfo-label">{string.id}</div>
          <div className="myinfo-value">{user?.id}</div>
        </div>
        <div className="myinfo-row">
          <div className="myinfo-label">{string.name}</div>
          {changeNameVisible ? (
            <div className="myinfo-input">
              <Input defaultValue={user?.name} onChange={(e) => setNewName(e.target.value)} />
              <button className="myinfo-btn" onClick={onChangeName}>{string.save}</button>
              <button className="myinfo-btn cancel" onClick={() => setChangeNameVisible(false)}>{string.cancel}</button>
            </div>
          ) : (
            <div className="myinfo-value">{user?.name}
              <button className="myinfo-btn edit" onClick={() => setChangeNameVisible(true)}>{string.edit}</button>
            </div>
          )}
        </div>
        <div className="myinfo-row">
          <div className="myinfo-label">{string.phone}</div>
          <div className="myinfo-value">{user?.phone}</div>
        </div>
        <div className="myinfo-row">
          <div className="myinfo-label">{string.email}</div>
          <div className="myinfo-value">{user?.email}</div>
        </div>

        <Divider />

        <div className="myinfo-header">
          <div className="myinfo-title">{string.password}</div>
          <button className="myinfo-btn edit" onClick={() => setChangePwVisible(!changePwVisible)}>
            {changePwVisible ? string.cancel : string.change}
          </button>
        </div>
        {changePwVisible && (
          <>
            <div className="myinfo-row">
              <div className="myinfo-label">{string.currentPassword}</div>
              <div className="myinfo-input">
                <Input.Password onChange={(e) => setPassword(e.target.value)} placeholder={string.currentPasswordPlaceholder} />
              </div>
            </div>
            <div className="myinfo-row">
              <div className="myinfo-label">{string.newPassword}</div>
              <div className="myinfo-input">
                <Input.Password onChange={(e) => setNewPassword(e.target.value)} placeholder={string.newPasswordPlaceholder} />
              </div>
            </div>
            <button className="myinfo-btn" onClick={onChangePassword}>{string.save}</button>
          </>
        )}
        
        <div className="myinfo-header">
          <div className="myinfo-title">{string.withdrawal}</div>
          <button className="myinfo-btn edit" onClick={() => setWithdrawalVisible(true)}>
          {string.doWithdrawal}
          </button>
        </div>
      </div>
      
      <Modal
        title={string.withdrawal}
        open={withdrawalVisible}
        onCancel={() => {
          setWithdrawalVisible(false);
          withdrawForm.resetFields();
        }}
        footer={null}
        width={420}
      >
        <div className="withdrawModalContent">
          <p className="withdrawWarning">
            {string.withdrawalWarning}
          </p>
          <Form
            form={withdrawForm}
            onFinish={handleWithdraw}
            layout="vertical"
          >
            <Form.Item
              name="password"
              rules={[{ required: true, message: string.passwordRequired }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder={string.passwordRequired}
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Button danger type="primary" htmlType="submit" size="large" block>
                {string.doWithdrawal}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Myinfo;
