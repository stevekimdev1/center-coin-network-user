'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { Input, Button, Select, Form, message, App, Modal, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, GiftOutlined, CheckCircleFilled, LeftOutlined } from '@ant-design/icons';
import httpClient from "@/src/lib/util/httpclient";
import { urls } from "@/src/const";
import { useRouter, useSearchParams } from 'next/navigation';

const { Option } = Select;

function SignupForm() {
    const { message, modal } = App.useApp();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5분
    const [timerActive, setTimerActive] = useState(false);
    const [emailDomain, setEmailDomain] = useState('');
    const [customDomain, setCustomDomain] = useState(false);
    const [idChecked, setIdChecked] = useState(false);
    const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);
    const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
    const [termsSrc, setTermsSrc] = useState('/agreement/terms.html');
    const [privacySrc, setPrivacySrc] = useState('/agreement/privacy.html');

    useEffect(() => {
        let timer;
        if (timerActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [timerActive, timeLeft]);

    useEffect(() => {
        // URL에서 추천코드를 읽어서 폼에 설정
        const refCode = searchParams.get('ref');
        if (refCode) {
            form.setFieldValue('referrer', refCode);
        }
    }, [searchParams, form]);

    const handleIdCheck = async () => {
        try {
            const userId = form.getFieldValue('userId');
            if (!userId) {
                message.error('이메일을 입력해주세요.');
                return;
            }
            // 이메일 형식 검증
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(userId)) {
                message.error('올바른 이메일 형식이 아닙니다.');
                return;
            }
            const response = await httpClient.get(urls.checkId + "/" + userId);
            if (!response.data) {
                message.success('사용 가능한 이메일입니다.');
                setIdChecked(true);
            } else {
                message.error('이미 사용중인 이메일입니다.');
                setIdChecked(false);
            }
        } catch (error) {
            message.error('이메일 중복 확인 중 오류가 발생했습니다.');
            setIdChecked(false);
        }
    };

    const handleSubmit = async (values) => {

        if (!idChecked) {
            message.error('이메일 중복확인을 해주세요.');
            return;
        }

        try {
            setLoading(true);
            const signupData = {
                ...values
            };

            const response = await httpClient.post(urls.signup, signupData);

            switch (response.data) {
                case 'SUCCESS':
                    modal.success({
                        title: '회원가입 성공',
                        content: '회원가입이 완료되었습니다. 로그인하여 이용해 주세요.',
                        onOk: () => router.push('/login')
                    });
                    break;
                case 'INVALID_EMAIL_FORMAT':
                    message.error('올바르지 않은 이메일 형식입니다.');
                    break;
                case 'DUPLICATE_USER_ID':
                    message.error('이미 사용중인 이메일입니다.');
                    setIdChecked(false);
                    break;
                case 'INVALID_PASSWORD_FORMAT':
                    message.error('비밀번호는 8~15자의 영문, 숫자, 특수문자 조합이어야 합니다.');
                    break;
                case 'NO_REFERER':
                    message.error('존재하지 않는 추천코드입니다.');
                    break;
                case 'FAIL':
                    message.error('회원가입 처리 중 오류가 발생했습니다.');
                    break;
                default:
                    message.error('알 수 없는 오류가 발생했습니다.');
            }
        } catch (error) {
            message.error('회원가입 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleUserIdChange = () => {
        setIdChecked(false);
    };

    return (
        <div id="signup">
            <div className="container">
                <div className="signupBox">
                    <div className="header">
                        <Link href="/login" className="backIcon">
                            <LeftOutlined />
                        </Link>
                        <img src="/img/logo-text.png" className="signupIcon" />
                        
                    </div>

                    <Form
                        form={form}
                        onFinish={handleSubmit}
                        layout="vertical"
                        className="form"
                    >
                        <div className="formBox">
                            <Form.Item
                                name="userId"
                                rules={[
                                    { required: true, message: '이메일을 입력해주세요' },
                                    { type: 'email', message: '올바른 이메일 형식이 아닙니다' }
                                ]}
                            >
                                <Input
                                    prefix={<MailOutlined />}
                                    placeholder="이메일"
                                    onChange={handleUserIdChange}
                                    suffix={
                                        idChecked ? (
                                            <span className="idCheckedStatus">
                                                <CheckCircleFilled style={{ color: '#52c41a' }} />
                                                <span className="idCheckedText">사용 가능</span>
                                            </span>
                                        ) : (
                                            <Button onClick={handleIdCheck} size="middle" className="checkButton">
                                                중복확인
                                            </Button>
                                        )
                                    }
                                />
                            </Form.Item>
                        </div>

                        <div className="formBox">
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: '이름을 입력해주세요' }]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="이름"
                                />
                            </Form.Item>
                        </div>

                        <div className="formBox">
                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: '비밀번호를 입력해주세요' },
                                    {
                                        pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{8,15}$/,
                                        message: '8~15자의 영문, 숫자, 특수문자를 조합해주세요'
                                    }
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="비밀번호 (8~15자의 영문, 숫자, 특수문자 조합)"
                                />
                            </Form.Item>
                        </div>

                        <div className="formBox">
                            <Form.Item
                                name="passwordConfirm"
                                dependencies={['password']}
                                rules={[
                                    { required: true, message: '비밀번호 확인을 입력해주세요' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('비밀번호가 일치하지 않습니다'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="비밀번호 확인"
                                />
                            </Form.Item>
                        </div>

                        <div className="formBox">
                            <Form.Item
                                name="phone"
                                rules={[
                                    { required: true, message: '연락처를 입력해주세요' },
                                    {
                                        pattern: /^[0-9]+$/,
                                        message: '숫자만 입력해주세요'
                                    }
                                ]}
                            >
                                <Input
                                    prefix={<PhoneOutlined />}
                                    placeholder="연락처 (숫자만 입력)"
                                    maxLength={11}
                                />
                            </Form.Item>
                        </div>

                        {/* <div className="formBox">
                            <Form.Item
                                name="referrer"
                                rules={[{ required: true, message: '추천코드를 입력해주세요' }]}
                            >
                                <Input
                                    prefix={<GiftOutlined />}
                                    placeholder="추천코드"
                                />
                            </Form.Item>
                        </div> */}

                        {/* <div className={styles.agreement}>
                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[{ required: true, message: '이용약관 및 개인정보 보호정책에 동의해주세요.' }]}
                        >
                            <Checkbox>
                                <span className={styles.link} onClick={(e) => {
                                    e.preventDefault();
                                    setTermsSrc(`/agreement/terms.html?reload=${new Date().getTime()}`);
                                    setIsTermsModalVisible(true);

                                }}>이용약관</span> 및
                                <span className={styles.link} onClick={(e) => {
                                    e.preventDefault();
                                    setPrivacySrc(`/agreement/privacy.html?reload=${new Date().getTime()}`);
                                    setIsPrivacyModalVisible(true);
                                }}>개인정보 보호정책</span>에 모두 동의합니다
                            </Checkbox>
                        </Form.Item>
                    </div> */}

                        <Button
                            type="primary"
                            htmlType="submit"
                            className="signupBtn"
                            loading={loading}
                            block
                        >
                            가입하기
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignupForm />
        </Suspense>
    );
}
