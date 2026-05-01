"use client";

import { FormEvent, useMemo, useState } from "react";
import { siteConfig } from "@/lib/site";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  eventName: string;
  eventDate: string;
  dateUndecided: boolean;
  guests: string;
  eventType: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  eventName: "",
  eventDate: "",
  dateUndecided: false,
  guests: "",
  eventType: "식사",
  message: "",
};

export default function InquiryForm() {
  const [form, setForm] = useState<FormState>(initialState);

  const canSubmit = useMemo(
    () =>
      form.name.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      form.company.trim() &&
      form.eventName.trim() &&
      (form.dateUndecided || form.eventDate) &&
      form.guests.trim() &&
      form.eventType.trim(),
    [form],
  );

  const update = (key: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = `[PLENTY 기업문의] ${form.company || "회사명 미입력"} / ${form.eventName || "행사명 미입력"}`;
    const body = [
      "PLENTY CONVENTION 기업문의",
      "",
      `성명: ${form.name}`,
      `이메일: ${form.email}`,
      `휴대전화: ${form.phone}`,
      `회사명: ${form.company}`,
      `행사명: ${form.eventName}`,
      `예상행사일자: ${form.dateUndecided ? "일정미정" : form.eventDate}`,
      `인원(규모): ${form.guests}`,
      `행사형태: ${form.eventType}`,
      "",
      "기타문의사항:",
      form.message || "-",
    ].join("\n");

    window.location.href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="inquiry-form" onSubmit={submit}>
      <div className="form-row">
        <label htmlFor="name">*성명</label>
        <input id="name" required value={form.name} onChange={(event) => update("name", event.target.value)} />
      </div>
      <div className="form-row">
        <label htmlFor="email">*이메일</label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="phone">*휴대전화</label>
        <input
          id="phone"
          type="text"
          inputMode="tel"
          required
          placeholder="010-0000-0000"
          value={form.phone}
          onChange={(event) => update("phone", event.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="company">*회사명</label>
        <input id="company" required value={form.company} onChange={(event) => update("company", event.target.value)} />
      </div>
      <div className="form-row">
        <label htmlFor="eventName">*행사명</label>
        <input
          id="eventName"
          required
          value={form.eventName}
          onChange={(event) => update("eventName", event.target.value)}
        />
      </div>
      <div className="form-row form-row-date">
        <label htmlFor="eventDate">*예상행사일자</label>
        <div className="field-inline">
          <input
            id="eventDate"
            type="date"
            required={!form.dateUndecided}
            disabled={form.dateUndecided}
            value={form.eventDate}
            onChange={(event) => update("eventDate", event.target.value)}
          />
          <label className="check-field">
            <input
              type="checkbox"
              checked={form.dateUndecided}
              onChange={(event) => update("dateUndecided", event.target.checked)}
            />
            일정미정
          </label>
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="guests">*인원(규모)</label>
        <input
          id="guests"
          type="number"
          min="1"
          required
          placeholder="예: 120"
          value={form.guests}
          onChange={(event) => update("guests", event.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="eventType">*행사형태</label>
        <select id="eventType" required value={form.eventType} onChange={(event) => update("eventType", event.target.value)}>
          <option value="식사">식사</option>
          <option value="식사+미팅">식사+미팅</option>
          <option value="미팅">미팅</option>
          <option value="기타">기타</option>
        </select>
      </div>
      <div className="form-row form-row-message">
        <label htmlFor="message">기타문의사항</label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
        />
      </div>
      <p className="required-note">* 필수입력사항입니다.</p>
      <div className="form-submit-row">
        <button className="btn btn-solid" type="submit" disabled={!canSubmit}>
          작성 완료 후 메일 보내기
        </button>
        <p>작성 완료 시 {siteConfig.contact.email} 메일로 발송됩니다.</p>
      </div>
    </form>
  );
}
