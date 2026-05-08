import { AnalysisResult } from "./types";

export const mockedAnalysisPool: AnalysisResult[] = [
  {
    id: "grilled-chicken-salad",
    foodName: "Grilled Chicken Salad",
    macros: { calories: 430, protein: 36, carbs: 18, fat: 22 },
    confidence: 0.89,
    notes: "Estimate based on visible dressing and chicken portion size.",
  },
  {
    id: "cheeseburger-fries",
    foodName: "Cheeseburger and Fries",
    macros: { calories: 910, protein: 38, carbs: 87, fat: 48 },
    confidence: 0.84,
    notes: "Portion and oil absorption can vary significantly by restaurant.",
  },
  {
    id: "oatmeal-berries",
    foodName: "Oatmeal with Berries",
    macros: { calories: 320, protein: 11, carbs: 52, fat: 8 },
    confidence: 0.92,
    notes: "Assumes water-based oats and a moderate berry serving.",
  },
  {
    id: "sushi-roll-plate",
    foodName: "Sushi Roll Plate",
    macros: { calories: 540, protein: 24, carbs: 64, fat: 19 },
    confidence: 0.83,
    notes: "Includes rice-heavy rolls and soy sauce.",
  },
];
