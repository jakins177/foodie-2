import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import type { AnalysisResult } from "@/lib/types";

const MODEL = "gpt-4o-mini";

type OpenAIResponse = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
};

const getOutputText = (response: OpenAIResponse) => {
  if (response.output_text) {
    return response.output_text;
  }

  const textFromOutput = response.output
    ?.flatMap((item) => item.content ?? [])
    .find((content) => content.type === "output_text" && typeof content.text === "string")?.text;

  return textFromOutput;
};

const parseAnalysisJson = (raw: string) => {
  const fencedMatch = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidate = fencedMatch?.[1] ?? raw;
  return JSON.parse(candidate) as {
    foodName: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    confidence: number;
    notes: string;
  };
};

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OPENAI_API_KEY is not configured." }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const uploaded = formData.get("image");

    if (!(uploaded instanceof File)) {
      return NextResponse.json({ error: "Missing image upload." }, { status: 400 });
    }

    if (!uploaded.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image uploads are supported." }, { status: 400 });
    }

    const buffer = Buffer.from(await uploaded.arrayBuffer());
    const base64 = buffer.toString("base64");
    const imageDataUrl = `data:${uploaded.type};base64,${base64}`;

    const openAiRes = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text:
                  "Analyze this food image and estimate nutrition. Return ONLY minified JSON with fields: foodName(string), calories(number), protein(number), carbs(number), fat(number), confidence(number 0-1), notes(string).",
              },
              {
                type: "input_image",
                image_url: imageDataUrl,
              },
            ],
          },
        ],
        text: { format: { type: "text" } },
      }),
    });

    if (!openAiRes.ok) {
      const details = await openAiRes.text();
      console.error("OpenAI request failed", details);
      return NextResponse.json({ error: "Vision analysis failed." }, { status: 502 });
    }

    const responseJson = (await openAiRes.json()) as OpenAIResponse;
    const outputText = getOutputText(responseJson);

    if (!outputText) {
      return NextResponse.json({ error: "No analysis returned from model." }, { status: 502 });
    }

    const parsed = parseAnalysisJson(outputText);

    const data: AnalysisResult = {
      id: randomUUID(),
      foodName: parsed.foodName,
      macros: {
        calories: Number(parsed.calories),
        protein: Number(parsed.protein),
        carbs: Number(parsed.carbs),
        fat: Number(parsed.fat),
      },
      confidence: Number(parsed.confidence),
      notes: parsed.notes,
    };

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Analysis route failed", error);
    return NextResponse.json({ error: "Failed to analyze image." }, { status: 500 });
  }
}
