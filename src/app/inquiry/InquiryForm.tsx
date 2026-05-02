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
  website: string;
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
  website: "",
};

type SubmitStatus = "idle" | "sending" | "success" | "error";

export default function InquiryForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

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

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit || submitStatus === "sending") {
      return;
    }

    setSubmitStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT || "/api/inquiry/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(result?.message || "문의 발송에 실패했습니다.");
      }

      setForm(initialState);
      setSubmitStatus("success");
      setStatusMessage(result?.message || "문의가 정상적으로 발송되었습니다.");
    } catch (error) {
      setSubmitStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "문의 발송에 실패했습니다.");
    }
  };

  return (
    <form className="inquiry-form" onSubmit={submit}>
      <input
        className="form-honeypot"
        tabIndex={-1}
        autoComplete="off"
        value={form.website}
        onChange={(event) => update("website", event.target.value)}
        aria-hidden="true"
      />
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
        <button className="btn btn-solid" type="submit" disabled={!canSubmit || submitStatus === "sending"}>
          {submitStatus === "sending" ? "메일 발송 중" : "작성 완료 후 메일 보내기"}
        </button>
        <p>작성 완료 시 {siteConfig.contact.email} 메일로 발송됩니다.</p>
      </div>
      {statusMessage ? (
        <p className={`form-status form-status-${submitStatus}`} role="status">
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}
