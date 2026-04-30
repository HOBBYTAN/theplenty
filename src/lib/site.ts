export type Space = {
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  image: string;
};

export type SpaceAction = {
  label: string;
  href: string;
};

export type SpaceFeature = {
  title: string;
  subtitle: string;
  description: string;
  points?: string[];
  image: string;
  wide?: boolean;
};

export type SpaceSection = {
  id: string;
  eyebrow: string;
  title: string;
  features: SpaceFeature[];
  actions: SpaceAction[];
};

export type GalleryItem = {
  title: string;
  caption: string;
  image: string;
};

export type BlogItem = {
  title: string;
  description: string;
  href: string;
};

export const siteConfig = {
  name: "PLENTY CONVENTION",
  shortName: "PLENTY",
  domain: "https://theplenty.co.kr",
  description:
    "서울 서초 반포대로의 프리미엄 컨벤션홀 PLENTY CONVENTION. 웨딩, 기업 행사, 컨퍼런스를 위한 고품격 공간 운영.",
  brandColor: "#344638",
  logos: {
    green: "/brand/logo-green.webp",
    white: "/brand/logo-white.webp",
  },
  hero: {
    video: "/videos/plenty-hero-10s-540p.mp4",
    poster: "/images/real/hero-wedding.webp",
  },
  contact: {
    mainTel: "02-3477-8884",
    corporateTel: "010-6574-1598",
    weddingTel: "010-6575-1598",
    email: "rsvn@h-kitchen.co.kr",
    address: "서울특별시 서초구 반포대로 222 가톨릭대학교 성의교정 옴니버스파크 로비층(L)",
    shortAddress: "서울 서초구 반포대로 222, 옴니버스파크 로비층, PLENTY CONVENTION",
    mapUrl: "https://blog.naver.com/plentyconvention/223286912598",
    googleMapEmbed:
      "https://www.google.com/maps?q=%EC%84%9C%EC%9A%B8%20%EC%84%9C%EC%B4%88%EA%B5%AC%20%EB%B0%98%ED%8F%AC%EB%8C%80%EB%A1%9C%20222%20%EC%98%B4%EB%8B%88%EB%B2%84%EC%8A%A4%ED%8C%8C%ED%81%AC%20%ED%94%8C%EB%A0%8C%ED%8B%B0%EC%BB%A8%EB%B2%A4%EC%85%98&output=embed",
  },
  links: {
    blog: "https://blog.naver.com/plentyconvention",
    weddingBlog:
      "https://blog.naver.com/PostList.naver?blogId=plentyconvention&from=postList&categoryNo=7",
    eventBlog:
      "https://blog.naver.com/PostList.naver?blogId=plentyconvention&from=postList&categoryNo=6",
    infoBlog:
      "https://blog.naver.com/PostList.naver?blogId=plentyconvention&from=postList&categoryNo=9",
    instagram: "https://www.instagram.com/plenty.convention/",
    kakao: "https://pf.kakao.com/_xfGwxob",
  },
};

export const heroHighlights = [
  "Wedding",
  "Corporate Event",
  "Conference",
];

export const downloadLinks = {
  lobbyPlan: "/downloads/plenty-lobby-floor-plan.pdf",
  banquetPlan: "/downloads/plenty-banquet-floor-plan.pdf",
  weddingLobbyPlan: "/downloads/plenty-wedding-lobby-plan.pdf",
  weddingPriceList: "/downloads/plenty-wedding-price-list.pdf",
};

export const spaceSections: SpaceSection[] = [
  {
    id: "convention",
    eyebrow: "SPACES",
    title: "PLENTY 공간 구성",
    features: [
      {
        title: "PLENTY CONVENTION Hall A+B",
        subtitle: "메인 행사장",
        description: "6.5m의 높은 천고와 가로 13m의 초대형 미디어월로 행사의 품격을 높이고 몰입감 있는 연출을 구현합니다.",
        points: ["수용규모: 최대 357석 (클래스 타입)", "규모: 155평 (512㎡)"],
        image: "/images/ref1/convention-hall.webp",
      },
      {
        title: "PLENTY Lobby",
        subtitle: "로비공간",
        description: "높이 12m, 약 240평 규모의 로비 공간으로 최대 40개 부스 설치가 가능한 다목적 전시 및 네트워킹 공간입니다.",
        points: ["수용규모: 40개 부스 (2x3m 기준)", "규모: 254평 (840㎡, 높이 12m)"],
        image: "/images/ref1/convention-lobby.webp",
      },
      {
        title: "PETAL, LEAF, IVY Room",
        subtitle: "서브 행사장",
        description: "총 3가지 타입으로 구성된 서브 행사 공간으로 사무국, VIP대기실 등 다양한 용도로 유연하게 활용 가능합니다.",
        points: ["PETAL Room: 51석", "LEAF Room: 30석", "IVY Room: 6석"],
        image: "/images/ref1/convention-rooms.webp",
      },
    ],
    actions: [
      { label: "로비(L) 전체도면", href: downloadLinks.lobbyPlan },
      { label: "연회장 세부도면", href: downloadLinks.banquetPlan },
      { label: "기본 견적 확인", href: downloadLinks.weddingPriceList },
    ],
  },
  {
    id: "wedding",
    eyebrow: "SPACES",
    title: "PLENTY WEDDING",
    features: [
      {
        title: "PLENTY CONVENTION Hall A+B",
        subtitle: "메인 웨딩홀",
        description: "8m의 높은 천고와 가로 13m, 세로 4.5m 규모의 고해상도 미디어월을 통해 압도적인 스케일과 몰입감 있는 웨딩 연출을 완성합니다.",
        points: ["수용인원: 300명 + 서브홀 100명 (최대 400명)", "버진로드: 24m"],
        image: "/images/ref1/wedding-hall.webp",
        wide: true,
      },
      {
        title: "IVY Room",
        subtitle: "신부대기실",
        description: "신부님만을 위한 1:1 플라워 커스터마이징이 적용된 공간으로, 메인홀 중계 시스템과 전용 화장실을 갖춰 예식 전까지 편안하고 프라이빗한 시간을 제공합니다.",
        image: "/images/ref1/wedding-ivy-room.webp",
      },
      {
        title: "LEAF Room",
        subtitle: "VIP(혼주) 대기실",
        description: "혼주님을 위한 전용 공간으로 넉넉한 동선과 쾌적한 환경을 제공하며 대기실 내 파우더룸과 전용 화장실을 갖추고 있습니다.",
        image: "/images/ref1/wedding-leaf-room.webp",
      },
    ],
    actions: [
      { label: "웨딩 로비도면", href: downloadLinks.weddingLobbyPlan },
      { label: "기본 견적 확인", href: downloadLinks.weddingPriceList },
    ],
  },
];

export const spaces: Space[] = [
  {
    title: "PLENTY Wedding Hall",
    subtitle: "웨딩 시그니처 공간",
    description: "입장 동선과 플라워 밸런스를 정교하게 설계한 PLENTY 웨딩 메인 홀입니다.",
    points: ["프라이빗 웨딩 연출", "본식·리셉션 동선 최적화", "디테일 맞춤 세팅"],
    image: "/images/real/wedding-hall.webp",
  },
  {
    title: "PLENTY Meeting Space",
    subtitle: "기업행사·세미나 공간",
    description: "브랜드 발표, 세미나, 런칭 행사에 맞춘 유연한 좌석 구성과 운영이 가능합니다.",
    points: ["행사 규모별 레이아웃", "브랜드 무드 반영", "운영·케이터링 패키지"],
    image: "/images/real/meeting-stage.webp",
  },
  {
    title: "PLENTY Reception Lounge",
    subtitle: "VIP 응대 라운지",
    description: "행사 전후 리셉션과 네트워킹을 위한 고급 라운지 공간입니다.",
    points: ["VIP 응대 동선", "커피·다과 서비스", "소규모 프라이빗 미팅"],
    image: "/images/real/meeting-lobby.webp",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    title: "Wedding Signature",
    caption: "PLENTY 웨딩의 시그니처 무드",
    image: "/images/real/wedding-signature.webp",
  },
  {
    title: "Ceremony Aisle",
    caption: "입장 동선 중심의 본식 세팅",
    image: "/images/real/wedding-aisle.webp",
  },
  {
    title: "Table Styling",
    caption: "고급 연회 테이블 스타일링",
    image: "/images/real/wedding-table.webp",
  },
  {
    title: "Business Seating",
    caption: "기업행사 좌석 구성",
    image: "/images/real/meeting-seating.webp",
  },
  {
    title: "Interior Mood",
    caption: "시간대별 공간 무드",
    image: "/images/real/wedding-interior.webp",
  },
];

export const blogItems: BlogItem[] = [
  {
    title: "웨딩 현장 레퍼런스",
    description: "실제 웨딩 공간 연출 사례를 확인하세요.",
    href: siteConfig.links.weddingBlog,
  },
  {
    title: "기업행사 운영 사례",
    description: "기업 행사 진행 방식과 운영 포인트를 확인하세요.",
    href: siteConfig.links.eventBlog,
  },
  {
    title: "PLENTY 정보 보기",
    description: "PLENTY CONVENTION 관련 자료들을 확인하세요.",
    href: siteConfig.links.infoBlog,
  },
];
