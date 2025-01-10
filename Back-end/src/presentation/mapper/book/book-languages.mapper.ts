import { BookLanguagesModel } from "../../../domain/library/models/book-languages.model";

export function toDomainLanguage(language: string): BookLanguagesModel {
  const domainMap: Record<string, BookLanguagesModel> = {
    English: BookLanguagesModel.English,
    Chinese: BookLanguagesModel.Chinese,
    Hindi: BookLanguagesModel.Hindi,
    Spanish: BookLanguagesModel.Spanish,
    French: BookLanguagesModel.French,
    Arabic: BookLanguagesModel.Arabic,
    Bengali: BookLanguagesModel.Bengali,
    Portuguese: BookLanguagesModel.Portuguese,
    Russian: BookLanguagesModel.Russian,
    Urdu: BookLanguagesModel.Urdu,
    Indonesian: BookLanguagesModel.Indonesian,
    German: BookLanguagesModel.German,
    Japanese: BookLanguagesModel.Japanese,
    Swahili: BookLanguagesModel.Swahili,
    Marathi: BookLanguagesModel.Marathi,
    Telugu: BookLanguagesModel.Telugu,
    Turkish: BookLanguagesModel.Turkish,
    Korean: BookLanguagesModel.Korean,
    Tamil: BookLanguagesModel.Tamil,
    Vietnamese: BookLanguagesModel.Vietnamese,
  };

  return domainMap[language] || undefined;
}

export function fromDomainLanguage(language: BookLanguagesModel): string {
  const languageMap: Record<BookLanguagesModel, string> = {
    [BookLanguagesModel.English]: "English",
    [BookLanguagesModel.Chinese]: "Chinese",
    [BookLanguagesModel.Hindi]: "Hindi",
    [BookLanguagesModel.Spanish]: "Spanish",
    [BookLanguagesModel.French]: "French",
    [BookLanguagesModel.Arabic]: "Arabic",
    [BookLanguagesModel.Bengali]: "Bengali",
    [BookLanguagesModel.Portuguese]: "Portuguese",
    [BookLanguagesModel.Russian]: "Russian",
    [BookLanguagesModel.Urdu]: "Urdu",
    [BookLanguagesModel.Indonesian]: "Indonesian",
    [BookLanguagesModel.German]: "German",
    [BookLanguagesModel.Japanese]: "Japanese",
    [BookLanguagesModel.Swahili]: "Swahili",
    [BookLanguagesModel.Marathi]: "Marathi",
    [BookLanguagesModel.Telugu]: "Telugu",
    [BookLanguagesModel.Turkish]: "Turkish",
    [BookLanguagesModel.Korean]: "Korean",
    [BookLanguagesModel.Tamil]: "Tamil",
    [BookLanguagesModel.Vietnamese]: "Vietnamese",
  };
  return languageMap[language];
}
