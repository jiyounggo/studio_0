import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type InquiryRequestBody = {
  inquiryType?: unknown;
  selectedServices?: unknown;
  name?: unknown;
  phone?: unknown;
  company?: unknown;
  budget?: unknown;
  message?: unknown;
};

function getString(
  value: unknown,
  maxLength = 1000
) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function getServices(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string"
    )
    .map((item) => item.trim().slice(0, 100))
    .filter(Boolean);
}

function formatPhone(value: string) {
  return value
    .replace(/[^\d-]/g, "")
    .slice(0, 13);
}

function isValidPhone(value: string) {
  const numbers = value.replace(/\D/g, "");

  return (
    numbers.length === 10 ||
    numbers.length === 11
  );
}

export async function POST(request: Request) {
  try {
    const googleSheetUrl =
      process.env.GOOGLE_SHEET_INQUIRY_URL;

    const secret =
      process.env.GOOGLE_SHEET_INQUIRY_SECRET;

    if (!googleSheetUrl || !secret) {
      return NextResponse.json(
        {
          success: false,
          message:
            "문의 접수 서버 설정이 완료되지 않았습니다.",
        },
        { status: 500 }
      );
    }

    const body =
      (await request.json()) as InquiryRequestBody;

    const inquiryType = getString(
      body.inquiryType,
      100
    );

    const selectedServices = getServices(
      body.selectedServices
    );

    const name = getString(body.name, 50);
    const phone = formatPhone(
      getString(body.phone, 30)
    );
    const company = getString(body.company, 100);
    const budget = getString(body.budget, 100);
    const message = getString(body.message, 2000);

    if (!inquiryType) {
      return NextResponse.json(
        {
          success: false,
          message: "선택한 서비스가 없습니다.",
        },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "이름을 입력해주세요.",
        },
        { status: 400 }
      );
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "올바른 휴대폰 번호를 입력해주세요.",
        },
        { status: 400 }
      );
    }

    const response = await fetch(googleSheetUrl, {
      method: "POST",
      headers: {
        "Content-Type":
          "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        secret,
        inquiryType,
        selectedServices,
        name,
        phone,
        company,
        budget,
        message,
      }),
      cache: "no-store",
      redirect: "follow",
    });

    const responseText = await response.text();

    let result: {
      success?: boolean;
      message?: string;
    };

    try {
      result = JSON.parse(responseText);
    } catch {
      throw new Error(
        "문의 저장 결과를 확인하지 못했습니다."
      );
    }

    if (!response.ok || !result.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            result.message ||
            "문의 저장에 실패했습니다.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "문의가 접수되었습니다.",
    });
  } catch (error) {
    console.error("문의 접수 오류:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "문의 접수 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}