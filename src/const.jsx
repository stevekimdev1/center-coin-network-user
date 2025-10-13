export const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const mainUrl = process.env.NEXT_PUBLIC_MAIN_URL;
export const webUrl = process.env.NEXT_PUBLIC_WEB_URL;
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
    referalList: `${serverUrl}/user/referal/list`,
    withdraw: `${serverUrl}/user/withdraw`,
  
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

    userStat: '/user/stats',

    coinTicker: '/coin/tickers',
  
    walletBlockchain: '/wallet/blockchain',
    walletBalance: '/wallet/balance',
    walletBalanceExt: '/wallet/balance/ext',
    walletTransLogList: '/wallet/transLog/list/%s?pageNum=%s&pageSize=%s&searchText=%s',
    walletTransLogWeekly: '/wallet/transLog/weekly',
    walletWithdrawRequest: '/wallet/withdraw/req',
    walletWithdrawRecent: '/wallet/withdraw/recent',
    walletSendRequest: '/wallet/send',
    walletLockup: '/wallet/lock',
  
    swapRequest: '/wallet/swap/req',

    systemSetting: '/system/setting',
    
    boardList: '/board/list?category=%s&pageNum=%s&pageSize=%s',

    miningStart: '/mining/start',
    miningRatioIncrease: '/mining/ratio/increase?amount=%s&duration=%s',
    miningEventList: '/mining/event/list',
    miningEventRead: '/mining/event/read/%s',

    feedList: '/feed/list?pageNum=%s&pageSize=%s',

    // 생필품이벤트 관련
    goodsEventList: '/goods/my-list',
    goodsEventAddressUpdate: '/goods/address/update',

    // 이미지 관련
    imageFile: `${serverUrl}/image/file/%s`,
}
