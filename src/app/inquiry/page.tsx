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
          <Link href="/" className="brand brand-text inquiry-brand" aria-label="PLENTY CONVENTION 홈으로 이동">
            PLENTY CONVENTION
          </Link>
          <p className="eyebrow">CONTACT</p>
          <h1>문의하기</h1>
          <p>
            기업행사는 아래 양식을 작성해 메일로 전달해 주세요. 웨딩 상담은 카카오톡 채널에서 더 빠르게 안내드립니다.
          </p>
          <div className="inquiry-choice-row">
            <a className="inquiry-choice" href="#corporate-form">
              기업문의
            </a>
            <a className="inquiry-choice" href={siteConfig.links.kakao} target="_blank" rel="noreferrer noopener">
              웨딩문의
            </a>
            <span className="kakao-note">카카오톡채널 - PLENTY</span>
          </div>
        </div>
      </section>

      <section id="corporate-form" className="section inquiry-form-section">
        <div className="container inquiry-layout">
          <div className="section-head">
            <p className="eyebrow">CORPORATE EVENT</p>
            <h2>기업문의 양식</h2>
          </div>
          <InquiryForm />
        </div>
      </section>
    </main>
  );
}
