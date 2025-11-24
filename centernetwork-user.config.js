module.exports = {
    apps: [
      {
        name: "centernetwork-user",
        script: "npm",
        args: "start",
        instances: 1,    // CPU 코어 수만큼 실행 (또는 1로 단일 실행)
        exec_mode: "cluster", // 클러스터 모드 (고성능 처리)
        watch: false,        // 코드 변경 시 자동 재시작 (false: 프로덕션 환경에서는 비활성화 권장)
        autorestart: true,   // 프로세스가 죽으면 자동 재시작
        max_memory_restart: "256M", // 메모리 초과 시 재시작
        log_date_format: "YYYY-MM-DD HH:mm:ss", // 초까지 포함
        env: {
          NODE_ENV: "production",
          TZ: "Asia/Seoul", // 서울 기준 시간 설정
        },
        output: "./logs/out.log", // 표준 출력 로그 파일
        error: "./logs/error.log", // 에러 로그 파일
      }
    ]
  };