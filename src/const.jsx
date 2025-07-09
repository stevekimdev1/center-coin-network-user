export const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const mainUrl = process.env.NEXT_PUBLIC_MAIN_URL;
// export const websocketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL;
export const storageKeys = {
    accessToken: "centernetworkUser:accessToken",
    refreshToken: "centernetworkUser:refreshToken",
    returnUrl: "centernetworkUser:returnUrl",
    user: 'centernetworkUser:user',
    loginId: 'centernetworkUser:loginId',
    favoriteStock: 'centernetworkUser:favoriteStock',
}

export const urls = {
    login: `${serverUrl}/auth/login`,
    switch: `${serverUrl}/auth/switch`,
    refresh: `${serverUrl}/auth/refresh`,
    validation: `${serverUrl}/auth/validation?token=%s`,
    mailVerify: `${serverUrl}/user/signup/verify/%s`,
    myinfo: `${serverUrl}/user/myinfo`,
    myinfoModify: `${serverUrl}/user/myinfo/modify`,
  
    signup: `${serverUrl}/user/signup`,
    signupResend: `${serverUrl}/user/signup/resend`,
    checkId: `${serverUrl}/user/signup/checkId`,
    emailCodeDispatch: `${serverUrl}/emailVerify/dispatch`,
    emailCodeVerify: `${serverUrl}/emailVerify/verify?token=%s&code=%s`,
    findPassword: `${serverUrl}/user/find/password`,
  
    userSubList: '/user/tree/sublist/%s',
    userRecoSubList: '/user/tree/reco/sublist/%s',
    subAccountCreate: '/user/subaccount/create',
    subAccountList: '/user/subaccount/list',

    coinTicker: '/coin/tickers',
  
    walletBlockchain: '/wallet/blockchain',
    walletBalance: '/wallet/balance',
    walletBalanceExt: '/wallet/balance/ext',
    walletTransLogList: '/wallet/transLog/list/%s?pageNum=%s&pageSize=%s&searchText=%s',
    walletTransLogWeekly: '/wallet/transLog/weekly',
    walletWithdrawRequest: '/wallet/withdraw/req',
    walletWithdrawRecent: '/wallet/withdraw/recent',
    walletSendRequest: '/wallet/send',
  
    swapRequest: '/wallet/swap/req',

    systemSetting: '/system/setting',
    
    boardList: '/board/list?category=NOTICE&pageNum=%s&pageSize=%s',

    miningStart: '/mining/start',

}
