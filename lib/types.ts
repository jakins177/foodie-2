export interface MacroBreakdown {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface AnalysisResult {
  id: string;
  foodName: string;
  macros: MacroBreakdown;
  confidence: number;
  notes: string;
}

export interface HistoryEntry extends AnalysisResult {
  timestamp: string;
  imageUrl: string;
}
