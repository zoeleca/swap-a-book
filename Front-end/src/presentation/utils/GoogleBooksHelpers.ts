export const categories = [
  "Fiction", "Fantasy", "ChildrenStory", "Adventure", "Novel", "Mystery",
  "Crime", "Detective"
];

export const normalizeCategory = (raw: string): string | null => {
  const match = categories.find(cat =>
    raw.toLowerCase().includes(cat.toLowerCase())
  );
  return match || null;
};

const languageMap: Record<string, string> = {
  en: "English",
  fr: "French",
  es: "Spanish",
  de: "German",
  zh: "Chinese",
  hi: "Hindi",
  ar: "Arabic",
  bn: "Bengali",
  ru: "Russian",
  pt: "Portuguese",
  ja: "Japanese",
  ur: "Urdu",
  id: "Indonesian",
  sw: "Swahili",
  mr: "Marathi",
  te: "Telugu",
  tr: "Turkish",
  ko: "Korean",
  ta: "Tamil",
  vi: "Vietnamese"
};

export const getLanguageName = (code: string): string | null => {
  return languageMap[code] || null;
};
