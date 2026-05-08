import { NextResponse } from "next/server";
import { mockedAnalysisPool } from "@/lib/mockData";

export async function POST() {
  // Simulate network + inference delay to support loading UX.
  await new Promise((resolve) => setTimeout(resolve, 1400));

  // Simulate occasional failure to test error handling.
  if (Math.random() < 0.1) {
    return NextResponse.json({ error: "Analysis service is temporarily unavailable." }, { status: 503 });
  }

  const sample = mockedAnalysisPool[Math.floor(Math.random() * mockedAnalysisPool.length)];
  return NextResponse.json({ data: sample });
}
