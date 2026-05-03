"use client";

import { useEffect, useRef, useState } from "react";
import InquiryForm from "./inquiry/InquiryForm";
import { siteConfig } from "@/lib/site";

export default function ContactInquiryPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCorporateForm, setShowCorporateForm] = useState(false);
  const panelRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  const scrollToElement = (element: HTMLElement | null) => {
    if (!element) {
      return;
    }

    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    const offset = isMobile ? 86 : 18;
    window.scrollTo({
      top: window.scrollY + element.getBoundingClientRect().top - offset,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const openPanel = () => {
      setIsOpen(true);
      setShowCorporateForm(false);
      window.setTimeout(() => {
        scrollToElement(panelRef.current);
      }, 60);
    };

    window.addEventListener("plenty:inquiry-open", openPanel);
    return () => window.removeEventListener("plenty:inquiry-open", openPanel);
  }, []);

  const openCorporateForm = () => {
    setShowCorporateForm(true);
    window.setTimeout(() => {
      scrollToElement(formRef.current);
    }, 80);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <aside ref={panelRef} className="contact-inquiry-panel" aria-label="문의 신청 패널">
      <div className="contact-inquiry-head">
        <div>
          <p className="eyebrow">REQUEST</p>
          <h3>상담 유형을 선택해 주세요.</h3>
        </div>
        <button type="button" className="panel-close-button" onClick={() => setIsOpen(false)} aria-label="신청 패널 닫기">
          닫기
        </button>
      </div>

      <div className="request-choice-grid">
        <button
          type="button"
          className={`request-choice-card${showCorporateForm ? " request-choice-card-active" : ""}`}
          onClick={openCorporateForm}
          aria-expanded={showCorporateForm}
          aria-controls="corporate-inline-form"
        >
          <span>기업문의</span>
          <small>기업 행사, 컨퍼런스, 연회 상담 입력</small>
        </button>
        <a className="request-choice-card request-choice-card-soft" href={siteConfig.links.kakao} target="_blank" rel="noreferrer noopener">
          <span>웨딩문의</span>
          <small>카카오톡 채널에서 빠른 웨딩 상담</small>
        </a>
      </div>

      {showCorporateForm ? (
        <div id="corporate-inline-form" ref={formRef} className="contact-form-embed">
          <InquiryForm />
        </div>
      ) : (
        <p className="contact-request-note">
          기업 행사는 신청서를 작성해 주시면 담당자가 확인 후 연락드립니다. 웨딩 상담은 카카오톡 채널로 바로 연결됩니다.
        </p>
      )}
    </aside>
  );
}
