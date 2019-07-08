import { v4 as uuid } from "uuid";
import { WordEntry } from "../types/word-entry";

export class DataTransferService {

    public static parseWords(words?: string): WordEntry[] {
        let entries: WordEntry[] = [];

        if (words) {
            const lines: string[] = words.split("\n");

            for (let i: number = 0; i < lines.length; i++) {
                const sides: string[] = lines[i].split("--");
                if (sides.length < 2) {
                    continue;
                }
                const leftWords: string[] = sides[0].trim().split(",");
                if (leftWords.length < 1) {
                    continue;
                }
                const rightWords: string[] = sides[1].trim().split(",");
                if (rightWords.length < 1) {
                    continue;
                }
                const wordEntry: WordEntry = {
                    id: uuid(),
                    left: leftWords.map(w => w.trim()),
                    right: rightWords.map(w => w.trim()),
                    isAnswered: false,
                    isChecked: false
                };

                entries.push(wordEntry);
            }
        }

        return entries;
    }

    public static getRandomWordEntry(wordEntries?: WordEntry[]): WordEntry | undefined {
        const uncheckedEntries: WordEntry[] = wordEntries
            ? wordEntries.filter(ent => !ent.isChecked)
            : [];
        const unckeckedNum: number = uncheckedEntries.length;

        const randomIndex: number = unckeckedNum > 0 ? Math.floor(Math.random() * (unckeckedNum)) : -1;
        const targetEntry: WordEntry | undefined = randomIndex !== -1 ? uncheckedEntries[randomIndex] : undefined;

        return targetEntry;
    }
}