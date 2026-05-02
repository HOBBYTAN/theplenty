import Link from "next/link";
import InquiryForm from "./InquiryForm";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "문의하기 | PLENTY CONVENTION",
  description: "PLENTY CONVENTION 기업행사 및 웨딩 문의 페이지입니다.",
};

export default function InquiryPage() {
  return (
    <main className="inquiry-page">
      <section className="inquiry-hero">
        <div className="container inquiry-hero-inner">
          <div className="inquiry-hero-main">
            <Link href="/" className="brand brand-text inquiry-brand" aria-label="PLENTY CONVENTION 홈으로 이동">
              PLENTY CONVENTION
            </Link>
            <p className="eyebrow">CONTACT</p>
            <h1>중요한 행사를 위한 전담 상담</h1>
            <p>
              기업행사는 전용 양식 접수 후 담당자가 빠르게 연락드립니다.
              웨딩은 카카오톡 채널에서 일정과 견적을 안내드립니다.
            </p>
            <div className="inquiry-choice-row">
              <a className="inquiry-choice inquiry-choice-primary" href="#corporate-form">
                <span>기업문의</span>
                <small>Corporate event form</small>
              </a>
              <a className="inquiry-choice" href={siteConfig.links.kakao} target="_blank" rel="noreferrer noopener">
                <span>웨딩문의</span>
                <small>Kakao consultation</small>
              </a>
            </div>
          </div>

          <aside className="inquiry-care-card" aria-label="문의 안내">
            <p className="eyebrow">PLENTY CARE</p>
            <h2>남겨주신 내용은 담당자가 직접 확인합니다.</h2>
            <ul>
              <li>행사 규모와 목적에 맞춘 공간 안내</li>
              <li>일정, 좌석, 식음 구성 검토</li>
              <li>접수 후 빠른 담당자 회신</li>
            </ul>
          </aside>
        </div>
      </section>

      <section id="corporate-form" className="section inquiry-form-section">
        <div className="container inquiry-layout">
          <div className="inquiry-form-copy">
            <p className="eyebrow">CORPORATE EVENT</p>
            <h2>기업 행사 상담 신청</h2>
            <p>
              행사명, 일정, 인원과 운영 형태를 남겨주시면 공간 구성과 진행 가능 범위를 확인해 안내드립니다.
            </p>
            <div className="inquiry-process" aria-label="문의 진행 순서">
              <span>01 접수</span>
              <span>02 담당자 확인</span>
              <span>03 상담 안내</span>
            </div>
          </div>
          <InquiryForm />
        </div>
      </section>
    </main>
  );
}
