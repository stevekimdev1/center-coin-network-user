const string = {
  //공통
  ok: "OK",
  cancel: "Cancel",
  errorDetail: "An error occurred.",
  withdrawNoBalance: 'Insufficient balance.',
  nodata: 'No data available.',
  myValue: "Balance",
  referral: "Referral",

  //top
  userStatTotal: "Total",
  userStatToday: "Today",

  //event
  tapToOpen: "Tap to open",
  miningRewardSuccessExplain: "Mining rewards can be checked in the wallet tab.",
  miningRewardFailExplain: "Failed to obtain rewards. Please try again.",

  //로그인
  login: "Login",
  idEmail: "ID (Email)",
  password: "Password",
  savedId: "Save ID",
  findPw: "Find Password",
  signUp: "Sign Up",
  myinfoLogout: "Logout",
  myinfoLogoutConfirm: "Are you sure you want to logout?",
  
  // 로그인 페이지 모달 메시지
  emailVerificationRequired: "Email Verification Required",
  emailVerificationMessage: "Please complete email verification. If you haven't received the verification email, please resend and verify.",
  close: "Close",
  resendVerificationEmail: "Resend Verification Email",
  resendSuccess: "Verification Email Resent Successfully",
  resendSuccessMessage: "Verification email has been resent. Please check your email.",
  resendFailed: "Resend Failed",
  invalidEmailAddress: "Invalid email address.",
  alreadyVerified: "Resend Not Available",
  alreadyVerifiedMessage: "This email has already been verified.",
  resendLimit: "Resend Limit",
  resendLimitMessage: "A verification email was recently sent. Please try again later.",
  serverError: "Server error occurred. Please try again later.",
  resendError: "An error occurred while resending the verification email.",
  loginFailed: "Login Failed",
  loginFailedMessage: "Please check your ID or password.",
  logoutSuccess: "Logged out successfully.",
  logoutError: "An error occurred during logout.",

  // 회원가입 페이지
  name: "Name",
  passwordConfirm: "Confirm Password",
  phone: "Phone",
  birthday: "Birthday",
  referrer: "Referral Code",
  signupBtn: "Sign Up",
  duplicateCheck: "Check Duplicate",
  available: "Available",
  emailRequired: "Please enter your email",
  emailFormat: "Invalid email format",
  nameRequired: "Please enter your name",
  passwordRequired: "Please enter your password",
  passwordFormat: "8-15 characters with letters, numbers, and special characters",
  passwordConfirmRequired: "Please confirm your password",
  passwordMismatch: "Passwords do not match",
  phoneRequired: "Please enter your phone number",
  phoneFormat: "Numbers only",
  referrerRequired: "Please enter referral code",
  birthdayFormat: "Invalid birthday format (YYYYMMDD)",
  duplicateCheckRequired: "Please check email duplication",
  duplicateCheckError: "Error occurred during email duplication check",
  duplicateCheckSuccess: "Email is available",
  duplicateCheckFailed: "Email is already in use",
  signupSuccess: "Sign Up Success",
  signupSuccessMessage: "Sign up completed. Please login to use",
  invalidEmailFormat: "Invalid email format",
  duplicateUserId: "Email is already in use",
  invalidPasswordFormat: "Password must be 8-15 characters with letters, numbers, and special characters",
  noReferer: "Invalid referral code",
  signupFail: "Error occurred during sign up",
  unknownError: "Unknown error occurred",
  signupError: "Error occurred during sign up",

  // 비밀번호 찾기 페이지
  findPassword: "Find Password",
  findPasswordDesc: "You can change your password after verification via the email you registered with",
  emailInput: "Please enter your email",
  verificationCode: "Verification Code",
  verificationCodeInput: "Please enter 6-digit verification code",
  verificationCodeRequired: "Please enter verification code",
  newPassword: "New Password",
  newPasswordInput: "New password (8-15 characters with letters, numbers, and special characters)",
  newPasswordRequired: "Please enter new password",
  newPasswordFormat: "Must include 8-15 characters with letters, numbers, and special characters",
  confirmNewPassword: "Confirm New Password",
  confirmNewPasswordInput: "Confirm new password",
  confirmNewPasswordRequired: "Please enter new password again",
  confirmNewPasswordMismatch: "Passwords do not match",
  changePassword: "Change Password",
  getVerificationCode: "Get Code",
  resend: "Resend",
  verifyCode: "Verify Code",
  verificationComplete: "Verification Complete",
  verificationRequired: "Verification required",
  emailFormatError: "Email Format Error",
  userNotFound: "User Not Found",
  userNotFoundMessage: "Email is not registered",
  recentlySent: "Resend Limit",
  recentlySentMessage: "A verification email was recently sent. Please try again later",
  verificationCodeError: "Verification Code Error",
  verificationCodeInvalid: "Invalid verification code",
  verificationCodeExpired: "Verification Code Expired",
  verificationCodeExpiredMessage: "Verification code has expired",
  passwordChangeSuccess: "Password Change Complete",
  passwordChangeSuccessMessage: "Password has been changed successfully. Please login with your new password",
  passwordChangeFailed: "Password Change Failed",
  passwordChangeFailedMessage: "Error occurred during password change",
  invalidPasswordFormat: "Invalid password format",
  expired: "Verification has expired. Please try again",
  invalidCode: "Invalid verification code",

  // 홈 페이지
  walletBalance: "Wallet Balance",
  lockup: "Lockup",
  centerAI: "CenterAI",
  dailyMining: "Daily Mining",
  miningInProgress: "Mining in Progress",
  minutesAgo: "minutes ago",
  hoursAgo: "hours ago",
  startMining: "Start Mining",
  teamPower: "Team Power",
  lockupPower: "Lockup Power",
  notice: "Notice",
  more: "More",
  noNotice: "No notices available",
  whitepaper: "Whitepaper",
  centerCoin: "Center Coin",
  person: "people",

  // 홈 페이지 메시지
  feedLoadError: "Failed to load feed.",
  miningStartSuccess: "Mining has started.",
  miningStartFailed: "Failed to start mining.",

  // 지갑 페이지
  totalAssets: "Total Assets",
  ownedCoins: "Owned Coins",
  transactionHistory: "Transaction History",
  send: "Send",
  receive: "Receive",
  depositNetwork: "Deposit Network",
  depositAddress: "Deposit Address",
  addressCopied: "Address copied",
  depositTo: "Deposit",
  eventWon: "Event Won!!",
  miningComplete: "Mining Complete",
  insufficientBalance: "Insufficient CENT balance to receive reward",
  buyCENT: "Buy CENT",
  close: "Close",

  // 마이닝 페이지
  myMiningSpeed: "My Mining Speed",
  miningDesc: "Mining amount may change based on miner participation status at the time of mining",
  basicMiningRate: "Basic Mining Rate",
  basicMiningDesc: "This rate is dynamically calculated based on the total CENT that all miners can distribute and the amount currently being mined",
  booster: "Booster",
  referralTeam: "Referral Team",
  invite: "Invite",
  lockupReward: "Lockup Reward",
  settings: "Lockup",
  lockupRewardDesc: "Lockup rewards are based on locked CENT amount, lockup period, and mining frequency",
  bonusMining: "Bonus Mining",
  bonusMiningDesc: "You can randomly mine major coins during mining, and the available coins are as follows",
  miningHistory: "Mining History",
  lockupSettings: "Lockup Settings",
  startMining: "Start Mining",

  // 레퍼럴 페이지
  referralTeamTitle: "Referral Team",
  miner: "Miner",
  referralTeamDesc: "Your referral team has {count} members. Currently {miningCount} out of {count} are mining",
  members: "Members",
  membersDesc: "Invite people to join your referral team. The more miners mining, the faster your mining speed increases",
  noMembers: "No one has joined your referral team yet! Invite friends to mine more coins",
  miningInProgress: "Mining",
  miningStopped: "Stopped",
  referralCode: "Referral Code",
  copied: "Copied",
  copyFailed: "Failed to copy to clipboard",
  shareFailed: "Failed to share",
  referralCodeCopied: "Referral code copied to clipboard",
  centerNetworkInvite: "Inviting you to Center Network!",

  // 마이인포 페이지
  myInfo: "My Info",
  id: "ID",
  name: "Name",
  phone: "Phone",
  email: "Email",
  password: "Password",
  save: "Save",
  cancel: "Cancel",
  edit: "Edit",
  change: "Change",
  currentPassword: "Current Password",
  newPassword: "New Password",
  currentPasswordPlaceholder: "Current password",
  newPasswordPlaceholder: "New password",
  passwordChanged: "Password has been changed",
  invalidPasswordFormat: "Invalid password format",
  invalidCurrentPassword: "Current password does not match",
  passwordChangeFailed: "Failed to change password",
  nameChanged: "Name has been changed",
  nameChangeFailed: "Failed to change name",
  nameFormatError: "Please enter in Korean or English",
  withdrawal: "Withdrawal",
  doWithdrawal: "Withdraw",
  withdrawalWarning: "Are you sure you want to withdraw? This action cannot be undone.",
  withdrawalSuccess: "Withdrawal completed successfully.",
  withdrawalFailed: "Withdrawal failed",
  invalidPassword: "Password does not match",

  // FAQ 페이지
  loading: "Loading...",
  error: "An error occurred",
  loadingMore: "Loading...",

  // 거래내역 페이지
  externalDeposit: "External Deposit",
  externalTransfer: "External Transfer",
  send: "Send",
  receive: "Receive",
  mining: "Mining",

  // 거래내역 모달
  transactionHistoryTitle: "Transaction History",
  transactionHistoryLoadError: "Failed to load transaction history.",
  externalTransferComplete: "Complete",
  externalTransferFailed: "Failed",
  externalTransferInProgress: "In Progress",
  event: "Event",
  withdraw: "Withdraw",

  // SWAP 모달
  swapTitle: "SWAP",
  swapAmountRequired: "Please enter amount",
  swapComplete: "Swap completed successfully.",
  swapProcessingError: "An error occurred during processing.",
  invalidAmount: "Invalid amount.",
  swapDescription: "Please enter the amount of {coinName} to exchange.",
  swapAmountPlaceholder: "Enter amount",

  // SEND 모달
  sendTitle: "Send",
  sendAmountRequired: "Please enter send amount",
  sendAddressRequired: "Please enter address",
  sendPasswordRequired: "Please enter password",
  sendComplete: "Send completed successfully.",
  sendProcessingError: "An error occurred during processing.",
  sendAmountLow: "Invalid amount.",
  sendInvalidAddress: "Invalid address.",
  sendInvalidPassword: "Password does not match.",
  sendGuide: "Please enter the recipient address. For Center Network users, you can send by entering their ID.",
  chain: "Chain",
  recipient: "Recipient",
  amount: "Amount",
  password: "Password",
  addressPlaceholder: "Enter address",
  amountPlaceholder: "Enter amount",
  passwordPlaceholder: "Enter password",

  // 마이닝 페이지 메시지
  shareFailed: "Failed to share.",
  referralCodeCopied: "Referral code copied to clipboard.",
  copyFailed: "Failed to copy to clipboard.",
  centerNetworkInviteText: "Inviting you to Center Network! Referral code: {referralCode}",
  centerNetworkInviteTitle: "Center Network Invite",

  // VIP 등급
  vip0: "VIP0",
  vip1: "VIP1",
  vip2: "VIP2",
  vip3: "VIP3",
  vip4: "VIP4",
  vip5: "VIP5",
  vip6: "VIP6",
  currentGrade: "Current Grade",

  // 404 페이지
  pageNotFound: "Page not found",
  goHome: "Go Home",
  
  policyView: 'View Terms',
  needAgreement: 'Please agree to the terms',
  policyTitle: 'Privacy Policy and Terms of Service',
  policyTitle2: '(Required) Privacy Policy and Terms of Service',
  policyContent: [
    { title: 'Chapter 1 General Provisions', content: '' },
    {
      title: 'Article 1 (Purpose)',
      content:
        'These terms and conditions are intended to regulate the rights, obligations, and responsibilities between the company and users regarding the conditions and procedures for using services (hereinafter referred to as "services") provided by Center Network (hereinafter referred to as "company") through apps, as well as other necessary matters.\n',
    },
    {
      title: 'Article 2 (Display, Explanation, and Amendment of Terms)',
      content:[
        '① The contents of these terms and conditions are notified to users through the company\'s services or other methods, and take effect when users agree to these terms and conditions.\n',
        '② The company may amend these terms and conditions within the scope that does not violate related laws such as "Act on Regulation of Terms and Conditions" and "Act on Promotion of Information and Communications Network Utilization and Information Protection".\n',
        '③ When the company amends the terms and conditions, it shall notify the application date and reason for amendment along with the current terms and conditions through the initial screen of the company\'s website, pop-up screen, or notice 7 days before the application date. However, in case of changes unfavorable to users or significant changes, users are notified 30 days before the application date.\n',
        '④ When the company notifies the amended terms and conditions and clearly notifies users that if they do not express their intention within 7 days, it will be deemed that they have expressed their intention, and if users do not explicitly express their refusal, it will be deemed that users have agreed to the amended terms and conditions.\n',
        '⑤ If users explicitly express their intention not to agree to the application of the amended terms and conditions, the company cannot apply the contents of the amended terms and conditions, and in this case, users may terminate the service agreement. However, if there are special circumstances where the existing terms and conditions cannot be applied, the company may terminate the service agreement.\n',
      ]
    },
    {
      title: 'Article 3 (Supplementary Provisions)',
      content:
        'The company may establish separate notices, individual terms and conditions, individual consent matters, usage guidelines, operation policies, detailed guidelines, etc. (hereinafter collectively referred to as "detailed guidelines") for services and notify users or obtain consent, and if the content of detailed guidelines that have received user consent conflicts with these terms and conditions, "detailed guidelines" take precedence. Matters not stipulated in these terms and conditions or interpretation shall follow "detailed guidelines" and related laws or commercial practices.\n',
    },
    {
      title: 'Article 4 (Definition of Terms)',
      content:[
        '① The definition of terms used in these terms and conditions is as follows.\n',
        '1. User: Refers to a user who approves these terms and conditions and registers for services provided by the company.\n',
        '2. App: Refers to a smartphone online-only program.\n',
        '3. Password: Refers to a combination of characters set by users for user authentication.\n',
      ]
    },
    {
      title: 'Chapter 2 Service Application and Approval (User Registration and Termination)',
      content: 'Users are deemed to have agreed to these terms and conditions by registering for the service.\n',
    },
    {
      title: 'Article 5 (Establishment of Service Agreement)',
      content:[
        '① Users apply for service use by expressing their intention to agree to these terms and conditions when registering in the app provided by the company.\n',
        '② The service agreement is concluded when users register for services. When the service agreement is established, the applicant is registered as a service user.\n'
      ]
    },
    {
      title: 'Article 6 (Service Application)',
      content: 'Service application is automatically approved when registering in the app provided by the company.\n',
    },
    {
      title: 'Article 7 (Consent to User Information Use and Approval of Service Application)',
      content:[
        '① Consent to User Information Use\n',
        '1. The company uses users\' personal information for the purpose of fulfilling this service agreement and providing services under this service agreement.\n',
        '2. User information may be provided to companies partnered with the company to enable users to conveniently use the company and services partnered with the company. However, the company must notify the partnered company, purpose of provision, content of user information to be provided, etc. in advance and obtain user consent before providing user information.\n',
        '3. Users can view and modify personal information at any time through user information modification.\n',
        '4. When users enter user information in the service application form and apply for service to the company in accordance with these terms and conditions, it is deemed that users have agreed to the company collecting, using, and providing user information entered in the service application form in accordance with these terms and conditions.\n',
      ]
    },
    {
      title: 'Article 8 (Suspension and Termination of Service Agreement)',
      content:[
        '① Termination of service agreement and app use is possible when users delete the app from their smartphone.\n',
        '② The company may not approve applications from applicants if there are reasons falling under each of the following items, and may cancel approval or terminate the service agreement if the reasons under each of the following items are confirmed after registration.\n',
        '1. Cases where membership qualification was previously lost under these terms and conditions\n',
        '2. Cases where false or incorrect information is entered or provided, or where the content presented by the company is not entered\n',
        '3. Cases where approval is impossible due to the applicant\'s fault or where the application is made in violation of other matters stipulated in these terms and conditions\n',
        '4. Cases where the service is intended to be used for improper purposes or separate business purposes\n',
        '5. Cases where the application is made for purposes that violate related laws or harm social peace and order or good morals\n',
        '6. Cases where the applicant\'s age is under 19\n',
        '③ The company may request real name verification through specialized agencies or identity verification within the scope permitted by law to confirm whether the information provided by members matches the facts.\n',
      ]
    },
    { title: 'Chapter 3 Company\'s Obligations', content: '' },
    {
      title: 'Article 9 Company\'s Obligations Regarding User Personal Information and Services',
      content:[
        '① The company complies with related laws and these terms and conditions and makes its best efforts to provide services continuously and stably.\n',
        '② The company may have security systems for personal information protection so that users can safely use services, and discloses and complies with personal information processing policies.\n',
        '③ The company may create and use statistical data that cannot distinguish specific users\' information from all or part of users\' personal information without prior consent of users for business-related purposes, and may transmit cookies to users\' computers for this purpose. However, in this case, users may refuse to send cookies or change the settings of the device they use to warn about sending cookies, but in this case, service use may change due to cookie setting changes without the company\'s fault.\n',
        '④ The company must handle and may deliver the process and results to users through service bulletin boards, E-mail, etc. if the opinions or complaints raised by users regarding service use are recognized as legitimate.\n',
        '⑤ The company complies with laws related to service operation and maintenance such as Information and Communications Network Act, Location Information Protection Act, Communications Secrets Protection Act, Telecommunications Business Act, etc.\n',
      ]
    },
    { title: 'Chapter 4 User\'s Obligations', content: '' },
    {
      title: 'Article 10 (User\'s Obligations Regarding Wallet and Password Management)',
      content:[
        '① All responsibility for wallet and password management lies with users. Users are responsible for all results arising from negligence in management or improper use of registered wallets and passwords, and the company is not responsible for this. However, this does not apply in case of the company\'s intentional fault.\n',
        '② The 12 recovery words must be written on paper, and 12 recovery words are needed when recovering after losing the wallet. Since the company does not have this information, recovery is impossible if the recovery words are lost, and all responsibility lies with users and the company is not responsible for this. Also, all responsibility for losses caused by users\' mistakes in leaking the 12 recovery words lies with users and the company is not responsible for this.\n',
      ]
    },
    {
      title: 'Article 11 (Information Provision)',
      content:[
        '1. The company may provide information for service convenience and product-related information through methods such as wired/wireless phones, email, text services (LMS/SMS), SNS, etc. In this case, users can refuse to receive at any time.\n',
        '① Services related to events and promotions\n',
        '② Other services that the company decides from time to time and provides to users\n',
        '2. Users can view and modify or request modification of their personal information through services at any time. Users must directly modify in the service or notify the company of changes through customer service when matters entered during membership registration change. The company is not responsible for disadvantages arising from users not notifying the company of the changes in the previous paragraph.\n',
      ]
    },
    { title: 'Chapter 5 General Provisions for Service Use', content: '' },
    {
      title: 'Article 12 (Types of Services)',
      content:[
        '① The types of services provided by the company may change from time to time depending on the company\'s circumstances, and copyright and intellectual property rights for provided services belong to the company.\n',
        '② The company grants users only the right to use accounts, services, etc. according to the usage conditions set by the company in relation to services, and users cannot provide similar services or engage in commercial activities using this.\n',
      ]
    },
    {
      title: 'Article 13 (Notice and Change of Service Content)',
      content:[
        '① The company notifies matters regarding the characteristics, procedures, and methods of each service according to the type of service through the website, and users must understand the matters regarding each service notified by the company and use the service.\n',
        '② The company may change all or part of individual services being provided due to operational or technical needs if there are reasonable reasons. In this case, the company notifies users of the content at least 7 days in advance.\n',
      ]
    },
    {
      title: 'Article 14 (Maintenance and Suspension of Services)',
      content:[
        '① Service use is generally available 24 hours a day, unless there are special operational or technical obstacles. However, this does not apply to days or times set by the company for regular inspections, etc., which are notified in advance or after the fact.\n',
        '② The company may divide services into certain ranges and set available times separately for each range. In this case, the content is notified in advance or after the fact.\n',
        '③ The company may suspend service provision in the following cases. In this case, the company notifies service suspension in advance unless unavoidable.\n',
        '1. Cases where it is unavoidable due to repairs, etc. of service facilities\n',
        '2. Cases where telecommunications business operators stipulated in the Telecommunications Business Act have suspended telecommunications services\n',
        '3. Cases where third parties such as partnered companies used to provide services not directly provided by the company have suspended services\n',
        '4. Other cases where there are force majeure reasons\n',
        '④ The company may restrict or suspend all or part of services when there are obstacles to normal service use due to national emergency, power failure, service facility failure, or service use congestion, etc.\n',
      ]
    },
    {
      title: 'Article 15 Usage Restrictions',
      content:[
        '① The company may restrict members\' service use and access in the following cases.\n',
        '1. Cases of consecutive errors in password and security password\n',
        '2. Cases where hacking or accidents occur\n',
        '3. Cases suspected of identity theft\n',
        '4. Cases where government agencies request service restrictions in accordance with related laws\n',
        '5. Cases where they are involved in or reasonably suspected of being involved in money laundering, unfair transactions, criminal acts, etc.\n',
        '6. Cases where registered users are confirmed to be under 19 years old\n',
        '7. Other cases where reasons equivalent to each item occur or measures are necessary to prevent such reasons\n',
        '② The company may restrict members\' deposit and withdrawal use in the following cases.\n',
        '1. Cases where registered users are confirmed to be under 19 years old\n',
        '2. Cases where hacking and fraud accidents have occurred or are suspected to have occurred\n',
        '3. Cases suspected of identity theft\n',
        '4. Cases where government agencies request service restrictions in accordance with related laws\n',
        '5. Cases where they are involved in or reasonably suspected of being involved in money laundering, unfair transactions, criminal acts, etc.\n',
        '6. Cases where there is a request from the member themselves\n',
        '7. Other cases where reasons equivalent to each item occur or measures are necessary to prevent such reasons\n',
        '③ When restricting service use or terminating service agreements in accordance with this article, the company notifies members through E-mail, SMS, App Push, etc.\n',
        '④ Members may file objections against usage restrictions, etc. in accordance with this article through procedures set by the company. In this case, if the company recognizes that the objection is legitimate, the company immediately resumes service use.\n',
      ]
    },
    {
      title: 'Article 16 (Service Agreement Termination)',
      content:[
        '① Users may apply for service agreement termination at any time through customer service, and the company must process this immediately in accordance with related laws.\n',
        '② The company may set a time limit for service use and make correction requests when the following reasons occur to members. If corrections are not made within a reasonable period despite correction requests, or if the same violation is repeated, the service agreement may be terminated.\n',
        '1. Cases where users violate obligations stipulated in Article 10 of these terms and conditions or fall under usage restriction reasons in Article 15\n',
        '2. Cases where illegal programs are provided and operation is interfered with in violation of the Copyright Act, illegal communications and hacking in violation of the Act on Promotion of Information and Communications Network Utilization and Information Protection, distribution of malicious programs, access authority excess acts, etc. that violate related laws\n',
        '3. Cases where acts that interfere with or attempt to interfere with the smooth progress of services provided by the company are performed\n',
        '4. Other cases where reasons equivalent to each item occur that make it impossible to maintain this agreement\n',
        '③ When the service agreement is terminated in accordance with the previous paragraph, all benefits acquired through service use are extinguished and the company does not compensate for this separately.\n',
        '④ When terminating service agreements in accordance with this article, the company notifies users through E-mail, SMS, App Push, etc.\n',
        '⑤ When service agreement termination is completed, all user information except information that the company must retain in accordance with related laws and personal information processing policies is deleted.\n',
        '⑥ When the company terminates service agreements in accordance with paragraph 2, the company may retain user information for a certain period for the purpose of receiving and processing user objections, etc., and delete user information (except deposit/withdrawal history) after the period expires.\n',
      ]
    },
    {
      title: 'Article 17 (Information Provision and Advertisement Display)',
      content:[
        '① The company may display various service-related information on service screens or provide it to users through methods such as E-mail, SMS, App Push, etc. while operating services.\n',
        '② The company may display various advertisements of the company or partnered companies on service screens or provide them to users through methods such as E-mail, SMS, App Push, etc. with user consent while operating services',
      ]
    },
    { title: 'Chapter 5 Personal Information Protection', content: '' },
    {
      title: 'Article 18 (Personal Information Protection)',
      content:[
        'The company strives to protect users\' personal information in accordance with related laws. Users\' personal information is used only for the purpose and scope agreed to by users for smooth service provision. The company does not provide users\' personal information to third parties unless required by law or unless users separately agree, and detailed matters are stipulated in the personal information processing policy.\n',
      ]
    },
    { title: 'Chapter 6 Damage Compensation and Exemption Clauses', content: '' },
    {
      title: 'Article 19 (Company\'s Exemption and Damage Compensation)',
      content:[
        '① The company does not guarantee any matters not specified in these terms and conditions regarding services.\n',
        '② The company is exempt from responsibility for service provision in cases where services cannot be provided due to force majeure reasons such as natural disasters, DDoS attacks, IDC failures, server downtime due to service access congestion, line failures of telecommunications business operators, etc. However, this does not apply in case of the company\'s intentional or gross negligence.\n',
        '③ The company is not responsible for service use obstacles or their results due to users\' fault. However, this does not apply if users have legitimate reasons.\n',
        '④ The company is exempt from responsibility in cases where transactions, etc. are conducted between users or between users and third parties using services as intermediaries. However, this does not apply in case of the company\'s intentional or gross negligence.\n',
        '⑤ The company is not responsible for services provided free of charge unless there are special provisions in related laws.\n',
        '⑥ The company may conduct regular, irregular, or emergency server inspections for stable service provision.\n',
      ]
    },
    {
      title: 'Article 20 (Jurisdiction and Governing Law)',
      content:[
        '① This service use agreement is governed and interpreted in accordance with Korean law, and Korean law applies to lawsuits filed due to disputes between the company and users regarding service use such as the company\'s fee structure.\n',
        '② For lawsuits between the company and users regarding service use, courts in accordance with procedures stipulated by law are the courts of jurisdiction.\n',
      ]
    },
    { title: 'Supplementary Provisions', content: 'These terms and conditions apply from July 1, 2025.' },
  ],
};

export default string;
