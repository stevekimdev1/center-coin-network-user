'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { Input, Button, Select, Form, message, App, Modal, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, GiftOutlined, CheckCircleFilled, LeftOutlined, CalendarOutlined } from '@ant-design/icons';
import httpClient from "@/src/lib/util/httpclient";
import { urls } from "@/src/const";
import { useRouter, useSearchParams } from 'next/navigation';
import { useString } from '@/src/context/StringContext';

const { Option } = Select;

function SignupForm() {
    const { message, modal } = App.useApp();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { string } = useString();
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

    // 생년월일 형식 검증 함수
    const validateBirthday = (value) => {
        if (!value) return true; // 필수가 아니므로 빈 값은 허용
        
        // yyyymmdd 형식 검증
        const birthdayRegex = /^\d{8}$/;
        if (!birthdayRegex.test(value)) {
            return false;
        }
        
        const year = parseInt(value.substring(0, 4));
        const month = parseInt(value.substring(4, 6));
        const day = parseInt(value.substring(6, 8));
        
        // 유효한 날짜인지 검증
        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year && 
               date.getMonth() === month - 1 && 
               date.getDate() === day &&
               year >= 1900 && year <= new Date().getFullYear();
    };

    const handleIdCheck = async () => {
        try {
            const userId = form.getFieldValue('userId');
            if (!userId) {
                message.error(string.emailRequired);
                return;
            }
            // 이메일 형식 검증
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(userId)) {
                message.error(string.emailFormat);
                return;
            }
            const response = await httpClient.get(urls.checkId + "/" + userId);
            if (!response.data) {
                message.success(string.duplicateCheckSuccess);
                setIdChecked(true);
            } else {
                message.error(string.duplicateCheckFailed);
                setIdChecked(false);
            }
        } catch (error) {
            message.error(string.duplicateCheckError);
            setIdChecked(false);
        }
    };

    const handleSubmit = async (values) => {

        if (!idChecked) {
            message.error(string.duplicateCheckRequired);
            return;
        }

        try {
            setLoading(true);
            const signupData = {
                ...values,
                birthday: values.birthday || null // 생년월일이 없으면 null로 설정
            };

            const response = await httpClient.post(urls.signup, signupData);

            switch (response.data) {
                case 'SUCCESS':
                    modal.success({
                        title: string.signupSuccess,
                        content: string.signupSuccessMessage,
                        onOk: () => router.push('/login')
                    });
                    break;
                case 'INVALID_EMAIL_FORMAT':
                    message.error(string.invalidEmailFormat);
                    break;
                case 'DUPLICATE_USER_ID':
                    message.error(string.duplicateUserId);
                    setIdChecked(false);
                    break;
                case 'INVALID_PASSWORD_FORMAT':
                    message.error(string.invalidPasswordFormat);
                    break;
                case 'NO_REFERER':
                    message.error(string.noReferer);
                    break;
                case 'FAIL':
                    message.error(string.signupFail);
                    break;
                default:
                    message.error(string.unknownError);
            }
        } catch (error) {
            message.error(string.signupError);
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
                                    { required: true, message: string.emailRequired },
                                    { type: 'email', message: string.emailFormat }
                                ]}
                            >
                                <Input
                                    prefix={<MailOutlined />}
                                    placeholder={string.idEmail}
                                    onChange={handleUserIdChange}
                                    suffix={
                                        idChecked ? (
                                            <span className="idCheckedStatus">
                                                <CheckCircleFilled style={{ color: '#52c41a' }} />
                                                <span className="idCheckedText">{string.available}</span>
                                            </span>
                                        ) : (
                                            <Button onClick={handleIdCheck} size="middle" className="checkButton">
                                                {string.duplicateCheck}
                                            </Button>
                                        )
                                    }
                                />
                            </Form.Item>
                        </div>

                        <div className="formBox">
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: string.nameRequired }]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder={string.name}
                                />
                            </Form.Item>
                        </div>

                        <div className="formBox">
                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: string.passwordRequired },
                                    {
                                        pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{8,15}$/,
                                        message: string.passwordFormat
                                    }
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder={string.passwordFormat}
                                />
                            </Form.Item>
                        </div>

                        <div className="formBox">
                            <Form.Item
                                name="passwordConfirm"
                                dependencies={['password']}
                                rules={[
                                    { required: true, message: string.passwordConfirmRequired },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error(string.passwordMismatch));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder={string.passwordConfirm}
                                />
                            </Form.Item>
                        </div>

                        {/* <div className="formBox">
                            <Form.Item
                                name="phone"
                                rules={[
                                    { required: true, message: string.phoneRequired },
                                    {
                                        pattern: /^[0-9]+$/,
                                        message: string.phoneFormat
                                    }
                                ]}
                            >
                                <Input
                                    prefix={<PhoneOutlined />}
                                    placeholder={string.phone}
                                    maxLength={11}
                                />
                            </Form.Item>
                        </div> */}

                        <div className="formBox">
                            <Form.Item
                                name="birthday"
                                rules={[
                                    {
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.resolve(); // 필수가 아니므로 빈 값 허용
                                            }
                                            if (!validateBirthday(value)) {
                                                return Promise.reject(new Error(string.birthdayFormat));
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                            >
                                <Input
                                    prefix={<CalendarOutlined />}
                                    placeholder={string.birthday}
                                    maxLength={8}
                                />
                            </Form.Item>
                        </div>

                        <div className="formBox">
                            <Form.Item
                                name="referrer"
                            >
                                <Input
                                    prefix={<GiftOutlined />}
                                    placeholder={string.referrer}
                                />
                            </Form.Item>
                        </div>

                        <Button
                            type="primary"
                            htmlType="submit"
                            className="signupBtn"
                            loading={loading}
                            block
                        >
                            {string.signupBtn}
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
