import Image from "next/image";
import Link from "next/link";
import { blogItems, siteConfig, spaceSections } from "@/lib/site";

const navItems = [
  { label: "소개", href: "#about" },
  { label: "공간", href: "#spaces" },
  { label: "블로그", href: "#blog" },
  { label: "오시는길", href: "#location" },
  { label: "문의", href: "/inquiry" },
];

const aboutCards = [
  {
    title: "Wedding",
    description: "입장부터 리셉션까지 하나의 흐름으로 완성하는 프리미엄 웨딩",
  },
  {
    title: "Corporate Event",
    description: "브랜드 발표, 세미나, VIP 세션을 안정적으로 운영하는 기업행사",
  },
  {
    title: "Conference",
    description: "대형 미디어월과 유연한 좌석 구성으로 몰입을 높이는 컨퍼런스",
  },
];

const pdfName = (href: string) => href.split("/").at(-1) ?? "plenty-download.pdf";
const isPdfDownload = (href: string) => href.startsWith("/downloads/") && href.endsWith(".pdf");

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "EventVenue", "WeddingVenue"],
        name: siteConfig.name,
        url: siteConfig.domain,
        telephone: siteConfig.contact.mainTel,
        email: siteConfig.contact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "반포대로 222",
          addressLocality: "서초구",
          addressRegion: "서울",
          postalCode: "06591",
          addressCountry: "KR",
        },
        sameAs: [siteConfig.links.blog, siteConfig.links.instagram, siteConfig.links.kakao],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <a href="#main-content" className="skip-link">
        본문으로 바로가기
      </a>

      <header className="top-nav">
        <div className="container nav-inner">
          <Link href="/" className="brand brand-text" aria-label="PLENTY CONVENTION 홈으로 이동">
            PLENTY CONVENTION
          </Link>
          <nav aria-label="주요 메뉴" className="nav-links">
            {navItems.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="/inquiry"
            className="cta-button"
          >
            문의하기
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero-video-section">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={siteConfig.hero.poster}
          >
            <source src={siteConfig.hero.video} type="video/mp4" />
          </video>
          <div className="hero-overlay" />

          <div className="container hero-content">
            <Image
              className="hero-brand-mark"
              src={siteConfig.logos.white}
              alt="PLENTY CONVENTION"
              width={148}
              height={148}
              priority
            />
            <div className="hero-copy">
              <p className="hero-kicker">PLENTY CONVENTION</p>
              <h1>
                <span className="hero-title-line">압도적인 스케일과 섬세한 운영으로 완성하는</span>
                <span className="hero-title-line">프리미엄 컨벤션홀, PLENTY</span>
              </h1>
              <p className="hero-lead">
                서울 서초 반포대로, 중요한 순간의 품격을 공간과 운영으로 완성합니다.
              </p>
            </div>
            <div className="hero-bottom">
              <div className="hero-action-row">
                <a
                  className="btn btn-solid"
                  href="/inquiry"
                >
                  문의하기
                </a>
                <a className="btn btn-outline-light" href={siteConfig.links.blog} target="_blank" rel="noreferrer">
                  공식 블로그 보기
                </a>
              </div>
              <p className="hero-location">{siteConfig.contact.shortAddress}</p>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container about-grid">
            <article className="about-copy">
              <p className="eyebrow">ABOUT PLENTY</p>
              <p className="about-moment">For Every PLENTY Moment</p>
              <h2>성과와 사랑이 머무는 시간을 위한 프리미엄 컨벤션</h2>
              <p>
                PLENTY는 지식과 성과, 그리고 사랑이 완성되는 순간을 담아 풍요로운 시간을 나누는 품격 있는 공간입니다.
                서울 서초의 중심에서 웨딩, 기업행사, 컨퍼런스를 목적에 맞게 설계하고 안정적으로 운영합니다.
              </p>
            </article>
            <div className="about-card-grid" aria-label="PLENTY 주요 이용 목적">
              {aboutCards.map((card, index) => (
                <article key={card.title} className="about-card">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="spaces" className="venue-section-wrap">
          {spaceSections.map((section) => (
            <section key={section.id} className="section section-soft venue-section" aria-labelledby={`${section.id}-title`}>
              <div className="container">
                <div className="section-head">
                  <p className="eyebrow">{section.eyebrow}</p>
                  <h2 id={`${section.id}-title`}>{section.title}</h2>
                </div>
                <div className={`venue-grid venue-grid-${section.id}`}>
                  {section.features.map((feature) => (
                    <article key={feature.title} className={`venue-card${feature.wide ? " venue-card-wide" : ""}`}>
                      <figure className="venue-image">
                        <Image
                          src={feature.image}
                          alt={`${feature.title} 이미지`}
                          fill
                          sizes={feature.wide ? "(max-width: 1000px) 100vw, 50vw" : "(max-width: 1000px) 100vw, 33vw"}
                        />
                      </figure>
                      <div className="venue-content">
                        <p className="space-subtitle">{feature.subtitle}</p>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                        {feature.points ? (
                          <ul className="point-list">
                            {feature.points.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
                <div className="download-row" aria-label={`${section.title} 자료 다운로드`}>
                  {section.actions.map((action) => (
                    <a
                      key={action.label}
                      className="download-button"
                      href={action.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      {...(isPdfDownload(action.href) ? { download: pdfName(action.href) } : {})}
                    >
                      {action.label}
                    </a>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </section>

        <section id="blog" className="section section-soft">
          <div className="container">
            <div className="section-head section-head-row">
              <div>
                <p className="eyebrow">BLOG</p>
                <h2>공식 블로그</h2>
              </div>
              <a className="btn btn-outline" href={siteConfig.links.blog} target="_blank" rel="noreferrer">
                전체 보기
              </a>
            </div>
            <div className="blog-grid">
              {blogItems.map((item) => (
                <article key={item.title} className="blog-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href={item.href} target="_blank" rel="noreferrer" className="blog-link">
                    자세히 보기
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="location" className="section location-section">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">LOCATION</p>
              <h2>PLENTY CONVENTION 오시는길</h2>
            </div>
            <div className="location-map">
              <iframe
                title="PLENTY CONVENTION Google Map"
                src={siteConfig.contact.googleMapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <p className="location-address">{siteConfig.contact.address}</p>
            <div className="location-guide">
              <div>
                <h3>지하철</h3>
                <p>3, 7, 9호선 고속터미널역 4번 출구에서 도보 10분 이동</p>
                <p>4번 출구 앞 횡단보도 건너 서울성모병원 방향 직진</p>
              </div>
              <div>
                <h3>자가용</h3>
                <p>내비게이션: PLENTY CONVENTION 또는 가톨릭대학교 옴니버스파크</p>
                <p>서울특별시 서초구 반포대로 222 옴니버스파크</p>
              </div>
              <div>
                <h3>버스</h3>
                <p>간선(파랑): 740, 405, 540 서울지방조달청, 서울성모병원 하차</p>
                <p>지선(녹색): 서초13, 서초14, 서초21, 5413 서울지방조달청, 서울성모병원 하차</p>
              </div>
              <div>
                <h3>주차이용</h3>
                <p>옴니버스파크 지하 4~5층 주차장 이용, 주말 최대 200대 가능</p>
                <p>4시간 무료주차, 초과 15분당 1,000원 발생</p>
              </div>
            </div>
            <a
              className="download-button location-button"
              href={siteConfig.contact.mapUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              약도 보기
            </a>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container contact-wrap">
            <article>
              <p className="eyebrow">CONTACT</p>
              <h2>예약 및 문의</h2>
              <p className="contact-copy">{siteConfig.contact.address}</p>
              <div className="hero-action-row">
                <a
                  className="btn btn-solid"
                  href="/inquiry"
                >
                  문의하기
                </a>
                <a className="btn btn-outline" href="#location">
                  오시는길 보기
                </a>
              </div>
            </article>

            <div className="contact-list" aria-label="연락처 정보">
              <span>대표번호 {siteConfig.contact.mainTel}</span>
              <span>연회·기업 {siteConfig.contact.corporateTel}</span>
              <span>웨딩 {siteConfig.contact.weddingTel}</span>
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
              <a href={siteConfig.links.kakao} target="_blank" rel="noreferrer">
                카카오 채널 상담
              </a>
              <a href={siteConfig.links.instagram} target="_blank" rel="noreferrer">
                PLENTY WEDDING Instagram
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>{new Date().getFullYear()} © PLENTY CONVENTION. All rights reserved.</p>
          <div>
            <a href={siteConfig.links.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={siteConfig.links.blog} target="_blank" rel="noreferrer">
              Blog
            </a>
            <a href={siteConfig.links.kakao} target="_blank" rel="noreferrer">
              Kakao Channel
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
