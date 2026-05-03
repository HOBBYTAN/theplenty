"use client";

import { ReactNode } from "react";

type InquiryTriggerProps = {
  className?: string;
  children?: ReactNode;
};

export default function InquiryTrigger({ className, children = "문의하기" }: InquiryTriggerProps) {
  const openInquiry = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.dispatchEvent(new CustomEvent("plenty:inquiry-open"));
  };

  return (
    <button type="button" className={className} onClick={openInquiry}>
      {children}
    </button>
  );
}
