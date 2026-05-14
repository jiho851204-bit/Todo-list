import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://assignment-todolist-api.vercel.app/api';
const TENANT_ID = 'JHKim';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const res = await fetch(`${BASE_URL}/${TENANT_ID}/images/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[upload proxy] 외부 API 오류 (${res.status}):`, errorText);
      return NextResponse.json(
        { error: 'Upload failed', detail: errorText },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[upload proxy] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
