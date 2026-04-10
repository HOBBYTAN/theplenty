## PLENTY Convention (Next.js + TypeScript + Firebase Hosting)

화이트 + Plenty 그린(`#344638`) 기반의 프리미엄 컨벤션 랜딩입니다.
우선순위는 `소개(브랜드 신뢰)`와 `블로그 연결(콘텐츠 허브)`이며, SEO/A11y/반응형 최적화를 기본 반영했습니다.

### 1) 로컬 프리뷰

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

### 2) Firebase 연결

1. `.firebaserc`의 `your-firebase-project-id`를 실제 프로젝트 ID로 교체
2. 필요 시 `.env.example`을 복사해 `.env.local` 생성 후 Firebase 키 입력
3. 정적 배포 빌드

```bash
npm run build
```

`next.config.mjs`에서 `output: "export"` 설정이 되어 있어 `out/` 폴더가 생성됩니다.

### 3) Firebase Hosting 배포

```bash
firebase deploy --only hosting
```

### 포함된 최적화

- SEO: canonical, Open Graph, robots, sitemap, JSON-LD(LocalBusiness/EventVenue/WeddingVenue)
- A11y: skip link, semantic structure, 포커스 스타일, 44px 이상 터치 타깃
- Performance: 경량 레이아웃, 정적 export, Firebase 캐시 헤더
- 확장성: TypeScript 기반 `siteConfig/spaces/blogItems` 데이터 구조, Firebase 초기화 스텁
