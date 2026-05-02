## PLENTY Convention

Next.js + TypeScript 기반의 PLENTY CONVENTION 공식 랜딩 사이트입니다.
화이트와 PLENTY 그린(`#344638`)을 중심으로 소개, 공간 구성, 블로그 연결, 오시는길, 문의 접수를 제공합니다.

### 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

### 문의 메일 SMTP 설정

문의 폼은 `/api/inquiry/` 서버 API에서 다우오피스 SMTP로 `rsvn@h-kitchen.co.kr`에 메일을 발송합니다.
로컬 또는 배포 환경에 아래 환경변수를 설정해야 실제 메일이 발송됩니다.

```bash
SMTP_HOST=outbound.daouoffice.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=rsvn@h-kitchen.co.kr
SMTP_PASS="다우오피스_SMTP_비밀번호"
SMTP_FROM=rsvn@h-kitchen.co.kr
SMTP_FROM_NAME=PLENTY CONVENTION 문의
INQUIRY_TO_EMAIL=rsvn@h-kitchen.co.kr
```

다우오피스 관리자에서 해당 계정의 `SMTP AUTH`가 허용되어 있어야 합니다.

### 빌드

```bash
npm run build
npm start
```

### 배포 메모

- SMTP 문의 발송은 서버 API가 필요하므로 Vercel/Node 서버 환경에서 동작합니다.
- Firebase Hosting만 사용하는 완전 정적 배포에서는 `/api/inquiry/`가 동작하지 않습니다. Firebase로 배포하려면 Functions 또는 App Hosting 구성이 필요합니다.
- `.env.example`을 참고해 실제 비밀번호는 `.env.local` 또는 배포 환경변수에만 설정하세요.

### 포함된 최적화

- SEO: canonical, Open Graph, robots, sitemap, JSON-LD(LocalBusiness/EventVenue/WeddingVenue)
- A11y: semantic structure, 포커스 스타일, 44px 이상 터치 타깃
- Performance: 이미지/영상 경량화, 캐시 정책, 반응형 레이아웃
- 확장성: TypeScript 기반 `siteConfig/spaces/blogItems` 데이터 구조
