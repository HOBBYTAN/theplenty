"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import InquiryForm from "./inquiry/InquiryForm";
import { siteConfig } from "@/lib/site";

export default function ContactInquiryPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCorporateForm, setShowCorporateForm] = useState(false);
  const panelRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  const scrollToElement = useCallback((element: HTMLElement | null) => {
    if (!element) {
      return;
    }

    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    const offset = isMobile ? 86 : 88;
    window.scrollTo({
      top: window.scrollY + element.getBoundingClientRect().top - offset,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const openPanel = () => {
      setIsOpen(true);
      setShowCorporateForm(false);
    };

    window.addEventListener("plenty:inquiry-open", openPanel);
    return () => window.removeEventListener("plenty:inquiry-open", openPanel);
  }, [scrollToElement]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const isMobile = window.matchMedia("(max-width: 760px)").matches;
      scrollToElement(showCorporateForm && isMobile ? formRef.current : panelRef.current);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isOpen, scrollToElement, showCorporateForm]);

  const openCorporateForm = () => {
    setShowCorporateForm(true);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <aside
      ref={panelRef}
      className={`contact-inquiry-panel${showCorporateForm ? " contact-inquiry-panel-form" : ""}`}
      aria-label="문의 신청 패널"
    >
      <div className="contact-inquiry-head">
        <div>
          <p className="eyebrow">REQUEST</p>
          <h3>{showCorporateForm ? "기업 행사 문의를 남겨주세요." : "어떤 상담이 필요하신가요?"}</h3>
          <p>
            {showCorporateForm
              ? "필수 정보만 남겨주시면 담당자가 공간 구성과 가능 일정을 확인해 연락드립니다."
              : "기업 행사는 바로 신청서를 작성하고, 웨딩은 카카오톡 채널에서 빠르게 상담합니다."}
          </p>
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
        <div className="contact-request-note">
          <span>대표번호 {siteConfig.contact.mainTel}</span>
          <span>기업·연회 {siteConfig.contact.corporateTel}</span>
          <span>웨딩 {siteConfig.contact.weddingTel}</span>
        </div>
      )}
    </aside>
  );
}
