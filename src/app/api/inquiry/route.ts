import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type InquiryPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  eventName?: unknown;
  eventDate?: unknown;
  dateUndecided?: unknown;
  guests?: unknown;
  eventType?: unknown;
  message?: unknown;
  website?: unknown;
};

type NormalizedInquiry = {
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

const eventTypes = new Set(["식사", "식사+미팅", "미팅", "기타"]);
const inquiryToEmail = process.env.INQUIRY_TO_EMAIL || "rsvn@h-kitchen.co.kr";
const plentyAddress = "서울 서초구 반포대로 222, 옴니버스파크 로비층, PLENTY CONVENTION";
const plentyPhone = "02-3477-8884";

function clean(value: unknown, maxLength = 1000) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeInquiry(payload: InquiryPayload) {
  const inquiry: NormalizedInquiry = {
    name: clean(payload.name, 80),
    email: clean(payload.email, 120),
    phone: clean(payload.phone, 60),
    company: clean(payload.company, 120),
    eventName: clean(payload.eventName, 160),
    eventDate: clean(payload.eventDate, 40),
    dateUndecided: payload.dateUndecided === true,
    guests: clean(payload.guests, 40),
    eventType: clean(payload.eventType, 40),
    message: clean(payload.message, 3000),
  };

  if (clean(payload.website, 200)) {
    return { error: "문의 접수가 완료되었습니다." };
  }

  if (!inquiry.name || !inquiry.email || !inquiry.phone || !inquiry.company || !inquiry.eventName) {
    return { error: "필수 입력값을 확인해주세요." };
  }

  if (!isEmail(inquiry.email)) {
    return { error: "이메일 형식을 확인해주세요." };
  }

  if (!inquiry.dateUndecided && !inquiry.eventDate) {
    return { error: "예상 행사일자 또는 일정미정을 선택해주세요." };
  }

  const guestCount = Number(inquiry.guests);
  if (!inquiry.guests || Number.isNaN(guestCount) || guestCount < 1) {
    return { error: "인원(규모)을 확인해주세요." };
  }

  if (!eventTypes.has(inquiry.eventType)) {
    return { error: "행사형태를 확인해주세요." };
  }

  return { inquiry };
}

function buildMailContent(inquiry: NormalizedInquiry) {
  const eventDate = inquiry.dateUndecided ? "일정미정" : inquiry.eventDate;
  const rows = [
    ["성명", inquiry.name],
    ["이메일", inquiry.email],
    ["휴대전화", inquiry.phone],
    ["회사명", inquiry.company],
    ["행사명", inquiry.eventName],
    ["예상행사일자", eventDate],
    ["인원(규모)", inquiry.guests],
    ["행사형태", inquiry.eventType],
    ["기타문의사항", inquiry.message || "-"],
  ];

  const text = [
    "PLENTY CONVENTION 기업문의",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <th style="width:150px;padding:12px 14px;background:#f4f7f2;border:1px solid #d9e2da;text-align:left;color:#344638;">${escapeHtml(label)}</th>
          <td style="padding:12px 14px;border:1px solid #d9e2da;color:#18241d;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;line-height:1.6;color:#18241d;">
      <h1 style="margin:0 0 18px;font-size:22px;color:#344638;">PLENTY CONVENTION 기업문의</h1>
      <table style="border-collapse:collapse;width:100%;max-width:720px;">${htmlRows}</table>
    </div>`;

  return { text, html };
}

function buildCustomerReplyContent(inquiry: NormalizedInquiry) {
  const eventDate = inquiry.dateUndecided ? "일정미정" : inquiry.eventDate;
  const rows = [
    ["행사명", inquiry.eventName],
    ["예상 행사일자", eventDate],
    ["인원(규모)", inquiry.guests],
    ["행사형태", inquiry.eventType],
  ];

  const text = [
    `안녕하세요, ${inquiry.name} 고객님.`,
    "품격 있는 웨딩·컨벤션홀 PLENTY입니다.",
    "",
    "문의를 남겨주셔서 감사합니다.",
    "담당자가 접수 내용을 확인한 뒤 빠른 시일 내 답변드리겠습니다.",
    "",
    "접수 내용",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `PLENTY CONVENTION`,
    `대표번호 ${plentyPhone}`,
    plentyAddress,
  ].join("\n");

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <th style="width:132px;padding:13px 0;color:#617a67;font-size:13px;font-weight:700;text-align:left;border-bottom:1px solid #e4ece5;">${escapeHtml(label)}</th>
          <td style="padding:13px 0;color:#18241d;font-size:14px;font-weight:600;text-align:right;border-bottom:1px solid #e4ece5;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const html = `
    <div style="margin:0;padding:0;background:#f5f8f4;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#f5f8f4;">
        <tr>
          <td align="center" style="padding:36px 16px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;border-collapse:collapse;background:#ffffff;border:1px solid #dce7df;border-radius:28px;overflow:hidden;box-shadow:0 18px 46px rgba(20,35,26,0.10);">
              <tr>
                <td style="padding:34px 34px 28px;background:linear-gradient(135deg,#14231a 0%,#314437 100%);color:#ffffff;">
                  <p style="margin:0 0 58px;color:rgba(255,255,255,0.80);font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:600;letter-spacing:0.08em;">PLENTY</p>
                  <p style="margin:0;color:rgba(255,255,255,0.70);font-size:12px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;">Inquiry Received</p>
                  <h1 style="margin:12px 0 0;color:#ffffff;font-family:Georgia,'Times New Roman','Apple SD Gothic Neo','Malgun Gothic',serif;font-size:34px;line-height:1.24;font-weight:600;letter-spacing:-0.03em;">문의를 남겨주셔서 감사합니다.</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:34px;">
                  <p style="margin:0;color:#18241d;font-size:18px;line-height:1.7;font-weight:700;">안녕하세요, ${escapeHtml(inquiry.name)} 고객님.</p>
                  <p style="margin:14px 0 0;color:#34443a;font-size:16px;line-height:1.78;">
                    품격 있는 웨딩·컨벤션홀 <strong style="color:#314437;">PLENTY</strong>입니다.<br />
                    문의를 남겨주셔서 감사합니다. 담당자가 접수 내용을 확인한 뒤 빠른 시일 내 답변드리겠습니다.
                  </p>

                  <div style="margin:28px 0 0;padding:22px 24px;border:1px solid #dce7df;border-radius:22px;background:#fbfdfb;">
                    <p style="margin:0 0 8px;color:#617a67;font-size:12px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">Request Summary</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;">
                      ${htmlRows}
                    </table>
                  </div>

                  <p style="margin:26px 0 0;color:#5c6a61;font-size:14px;line-height:1.72;">
                    빠른 확인이 필요한 경우 대표번호 또는 카카오 채널을 통해 문의해주세요.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:24px 34px 32px;background:#fbfaf5;border-top:1px solid #e8efe9;">
                  <p style="margin:0;color:#14231a;font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:600;letter-spacing:0.08em;">PLENTY CONVENTION</p>
                  <p style="margin:10px 0 0;color:#526159;font-size:13px;line-height:1.7;">
                    대표번호 ${plentyPhone}<br />
                    ${escapeHtml(plentyAddress)}<br />
                    ${escapeHtml(inquiryToEmail)}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>`;

  return { text, html };
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as InquiryPayload;
    const normalized = normalizeInquiry(payload);

    if ("error" in normalized) {
      return NextResponse.json({ message: normalized.error }, { status: 400 });
    }

    const smtpUser = process.env.SMTP_USER || "rsvn@h-kitchen.co.kr";
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpPass) {
      return NextResponse.json(
        { message: "SMTP 비밀번호가 설정되지 않았습니다. 관리자에게 문의해주세요." },
        { status: 500 },
      );
    }

    const smtpPort = Number(process.env.SMTP_PORT || "465");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "outbound.daouoffice.com",
      port: smtpPort,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE !== "false" : smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const adminMail = buildMailContent(normalized.inquiry);
    const customerMail = buildCustomerReplyContent(normalized.inquiry);
    const from = {
      name: process.env.SMTP_FROM_NAME || "PLENTY CONVENTION 문의",
      address: process.env.SMTP_FROM || smtpUser,
    };

    await Promise.all([
      transporter.sendMail({
        from,
        to: inquiryToEmail,
        replyTo: {
          name: normalized.inquiry.name,
          address: normalized.inquiry.email,
        },
        subject: `[PLENTY 기업문의] ${normalized.inquiry.company} / ${normalized.inquiry.eventName}`,
        text: adminMail.text,
        html: adminMail.html,
      }),
      transporter.sendMail({
        from,
        to: normalized.inquiry.email,
        replyTo: inquiryToEmail,
        subject: "[PLENTY] 문의를 남겨주셔서 감사합니다.",
        text: customerMail.text,
        html: customerMail.html,
      }),
    ]);

    return NextResponse.json({ message: "문의가 정상적으로 발송되었습니다." });
  } catch (error) {
    console.error("Failed to send PLENTY inquiry", error);
    return NextResponse.json(
      { message: "메일 발송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 },
    );
  }
}
