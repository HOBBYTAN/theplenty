import Image from "next/image";
import Link from "next/link";
import { blogItems, galleryItems, heroHighlights, siteConfig, spaceSections } from "@/lib/site";

const navItems = [
  { label: "공간", href: "#spaces" },
  { label: "갤러리", href: "#gallery" },
  { label: "블로그", href: "#blog" },
  { label: "문의", href: "#contact" },
];

const telHref = (value: string) => `tel:${value.replaceAll("-", "")}`;
const pdfName = (href: string) => href.split("/").at(-1) ?? "plenty-download.pdf";
const renderBrandText = (text: string) =>
  text.split("PLENTY").flatMap((part, index, arr) =>
    index < arr.length - 1
      ? [part, <span key={`plenty-${index}`} className="brand-en">PLENTY</span>]
      : [part],
  );

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
            href={siteConfig.links.kakao}
            target="_blank"
            rel="noreferrer noopener"
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
            <Image src={siteConfig.logos.white} alt="PLENTY CONVENTION" width={148} height={148} priority />
            <p className="hero-kicker">PLENTY CONVENTION</p>
            <h1>
              <span className="hero-title-line">압도적인 스케일과 섬세한 운영으로 완성하는</span>
              <span className="hero-title-line">
                프리미엄 컨벤션홀, <span className="brand-en">PLENTY</span>
              </span>
            </h1>
            <p className="hero-moment">For Every <span className="brand-en">PLENTY</span> Moment</p>
            <p className="hero-lead">
              {renderBrandText("PLENTY는 지식과 성과, 그리고 사랑이 완성되는 순간을 담아 풍요로운 시간을 나누는 품격 있는 공간입니다.")}
            </p>
            <div className="hero-chip-row" aria-label="서비스 범위">
              {heroHighlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="hero-action-row">
              <a
                className="btn btn-solid"
                href={siteConfig.links.kakao}
                target="_blank"
                rel="noreferrer noopener"
              >
                문의하기
              </a>
              <a className="btn btn-outline-light" href={siteConfig.links.blog} target="_blank" rel="noreferrer">
                공식 블로그 보기
              </a>
            </div>
            <p className="hero-location">{renderBrandText(siteConfig.contact.shortAddress)}</p>
          </div>
        </section>

        <section id="spaces" className="venue-section-wrap">
          {spaceSections.map((section) => (
            <section key={section.id} className="section section-soft venue-section" aria-labelledby={`${section.id}-title`}>
              <div className="container">
                <div className="section-head">
                  <p className="eyebrow">{section.eyebrow}</p>
                  <h2 id={`${section.id}-title`}>{renderBrandText(section.title)}</h2>
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
                        <h3>{renderBrandText(feature.title)}</h3>
                        <p>{renderBrandText(feature.description)}</p>
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
                      download={pdfName(action.href)}
                    >
                      {action.label}
                    </a>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </section>

        <section id="gallery" className="section">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">GALLERY</p>
              <h2>현장 갤러리</h2>
            </div>
            <div className="gallery-grid">
              {galleryItems.map((item) => (
                <figure key={item.title} className="gallery-card">
                  <div className="gallery-image">
                    <Image
                      src={item.image}
                      alt={`${item.title} 이미지`}
                      fill
                      sizes="(max-width: 1000px) 100vw, 33vw"
                    />
                  </div>
                  <figcaption>
                    <strong>{item.title}</strong>
                    <span>{renderBrandText(item.caption)}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
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
                  <h3>{renderBrandText(item.title)}</h3>
                  <p>{item.description}</p>
                  <a href={item.href} target="_blank" rel="noreferrer" className="blog-link">
                    자세히 보기
                  </a>
                </article>
              ))}
            </div>
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
                  href={siteConfig.links.kakao}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  문의하기
                </a>
                <a className="btn btn-outline" href={siteConfig.contact.mapUrl} target="_blank" rel="noreferrer">
                  네이버 지도 보기
                </a>
              </div>
            </article>

            <div className="contact-list" aria-label="연락처 정보">
              <a href={telHref(siteConfig.contact.mainTel)}>대표번호 {siteConfig.contact.mainTel}</a>
              <a href={telHref(siteConfig.contact.corporateTel)}>연회·기업 {siteConfig.contact.corporateTel}</a>
              <a href={telHref(siteConfig.contact.weddingTel)}>웨딩 {siteConfig.contact.weddingTel}</a>
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
              <a href={siteConfig.links.kakao} target="_blank" rel="noreferrer">
                카카오 채널 상담
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
