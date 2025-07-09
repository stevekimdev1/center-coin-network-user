'use client'
import React, { useState, useEffect } from "react";
import { App, Divider, Input } from "antd";
import { useUser } from "@/src/context/UserContext";
import { urls } from "@/src/const";
import httpClient from "@/src/lib/util/httpclient";

const Myinfo = () => {
  const { message, modal } = App.useApp();
  const { user, setUser } = useUser();
  const [changeNameVisible, setChangeNameVisible] = useState(false);
  const [changePwVisible, setChangePwVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

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
        modal.success({ content: '비밀번호가 변경되었습니다.' });
      } else {
        if (result === 'INVALID_PASSWORD_FORMAT') {
          modal.error({ content: '비밀번호 형식이 올바르지 않습니다.' });
        } else if (result === 'INVALID_PASSWORD') {
          modal.error({ content: '현재 비밀번호가 일치하지 않습니다.' });
        } else {
          modal.error({ content: '비밀번호 변경에 실패했습니다.' });
        }
      }
    }).catch(() => {
      modal.error({ content: '비밀번호 변경에 실패했습니다.' });
    });
  };

  const onChangeName = () => {
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/;
    if (!regex.test(newName)) {
      modal.error({ content: '한글 또는 영문으로 입력해주세요.' });
      setNewName('');
      return;
    }
    httpClient.post(urls.userUpdateNickname, { name: newName }).then((result) => {
      if (result.data === true) {
        modal.success({ content: '이름이 변경되었습니다.' });
        setChangeNameVisible(false);
        getMyInfo();
      } else {
        modal.error({ content: '이름 변경에 실패했습니다.' });
      }
    }).catch(() => {
      modal.error({ content: '이름 변경에 실패했습니다.' });
    });
  };

  return (
    <div id="myinfo">
      <div className="myinfo-section">
        <div className="myinfo-header">
          <div className="myinfo-title">내 정보</div>
        </div>
        <div className="myinfo-row">
          <div className="myinfo-label">아이디</div>
          <div className="myinfo-value">{user?.id}</div>
        </div>
        <div className="myinfo-row">
          <div className="myinfo-label">이름</div>
          {changeNameVisible ? (
            <div className="myinfo-input">
              <Input defaultValue={user?.name} onChange={(e) => setNewName(e.target.value)} />
              <button className="myinfo-btn" onClick={onChangeName}>저장</button>
              <button className="myinfo-btn cancel" onClick={() => setChangeNameVisible(false)}>취소</button>
            </div>
          ) : (
            <div className="myinfo-value">{user?.name}
              <button className="myinfo-btn edit" onClick={() => setChangeNameVisible(true)}>수정</button>
            </div>
          )}
        </div>
        <div className="myinfo-row">
          <div className="myinfo-label">전화번호</div>
          <div className="myinfo-value">{user?.phone}</div>
        </div>
        <div className="myinfo-row">
          <div className="myinfo-label">이메일</div>
          <div className="myinfo-value">{user?.email}</div>
        </div>

        <Divider />

        <div className="myinfo-header">
          <div className="myinfo-title">비밀번호</div>
          <button className="myinfo-btn edit" onClick={() => setChangePwVisible(!changePwVisible)}>
            {changePwVisible ? '취소' : '변경'}
          </button>
        </div>
        {changePwVisible && (
          <>
            <div className="myinfo-row">
              <div className="myinfo-label">현재 비밀번호</div>
              <div className="myinfo-input">
                <Input.Password onChange={(e) => setPassword(e.target.value)} placeholder="현재 비밀번호" />
              </div>
            </div>
            <div className="myinfo-row">
              <div className="myinfo-label">새 비밀번호</div>
              <div className="myinfo-input">
                <Input.Password onChange={(e) => setNewPassword(e.target.value)} placeholder="새 비밀번호" />
              </div>
            </div>
            <button className="myinfo-btn" onClick={onChangePassword}>저장</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Myinfo;
