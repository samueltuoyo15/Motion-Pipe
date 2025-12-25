import { chunk } from "stunk";

export type Language = 'EN' | 'FR' | 'ES' | 'DE';

export const languageChunk = chunk<Language>("EN");
