export type Space = {
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  image: string;
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
  name: "PLENTY Convention",
  shortName: "PLENTY",
  domain: "https://theplenty.co.kr",
  description:
    "서울 서초 반포대로의 프리미엄 컨벤션 공간 PLENTY Convention. 웨딩, 기업 행사, VIP 리셉션을 위한 고품격 공간 운영.",
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
    mapUrl: "https://naver.me/xNoCarDx",
  },
  links: {
    blog: "https://blog.naver.com/plentyconvention",
    instagram: "https://www.instagram.com/plenty.convention/",
    kakao: "https://pf.kakao.com/_xfGwxob",
  },
};

export const heroHighlights = [
  "Wedding", 
  "Corporate Event",
  "Private Reception",
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
    href: siteConfig.links.blog,
  },
  {
    title: "기업행사 운영 사례",
    description: "기업 행사 진행 방식과 운영 포인트를 확인하세요.",
    href: siteConfig.links.blog,
  },
  {
    title: "PLENTY 최신 소식",
    description: "프로모션 및 신규 소식을 가장 빠르게 받아보세요.",
    href: siteConfig.links.blog,
  },
];
