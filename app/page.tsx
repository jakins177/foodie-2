"use client";

import { useRef, useState } from "react";
import { Hero } from "@/components/Hero";
import { HistoryList } from "@/components/HistoryList";
import { ResultCard } from "@/components/ResultCard";
import { UploadPanel } from "@/components/UploadPanel";
import { AnalysisResult, HistoryEntry } from "@/lib/types";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const appRef = useRef<HTMLDivElement | null>(null);

  const onFileChange = (selectedFile: File | null) => {
    setError(null);
    if (!selectedFile) {
      setFile(null);
      setImagePreview(null);
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const onAnalyze = async () => {
    if (!file || !imagePreview) {
      setError("Upload an image before running analysis.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/analyze", { method: "POST" });
      if (!response.ok) {
        throw new Error("Failed to analyze image.");
      }

      const payload: { data: AnalysisResult } = await response.json();
      setResult(payload.data);
      setHistory((prev) => [
        {
          ...payload.data,
          imageUrl: imagePreview,
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ]);
    } catch (analysisError) {
      console.error("Analysis error", analysisError);
      setError("We couldn't process this image right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <Hero onGetStarted={() => appRef.current?.scrollIntoView({ behavior: "smooth" })} />

        <section ref={appRef} className="grid gap-4 lg:grid-cols-2">
          <UploadPanel imagePreview={imagePreview} onFileChange={onFileChange} onAnalyze={onAnalyze} loading={loading} error={error} />
          <div className={loading ? "animate-pulseSoft" : ""}>
            <ResultCard result={result} />
          </div>
        </section>

        <section>
          <HistoryList items={history} />
        </section>
      </div>
    </main>
  );
}
