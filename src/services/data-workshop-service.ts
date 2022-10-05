import { v4 as uuid } from "uuid";
import { IWordEntry } from "../types/i-word-entry";

export class DataWorkshopService {

    // Rate is in range of [0, 1)
    public static GetRandomWordEntry(rate: number, wordEntries?: IWordEntry[]): IWordEntry | undefined {
        const uncheckedEntries: IWordEntry[] = wordEntries
            ? wordEntries.filter((ent) => !ent.isChecked && !ent.isIgnored)
            : [];
        const unckeckedNum: number = uncheckedEntries.length;
        const randomIndex: number = unckeckedNum > 0 ? Math.floor(rate * (unckeckedNum)) : -1;
        const targetEntry: IWordEntry | undefined = randomIndex !== -1 ? uncheckedEntries[randomIndex] : undefined;
        return targetEntry;
    }

    public static ResetCheckedUnansweredWords(words: IWordEntry[]): IWordEntry[] {
        words.forEach((ent) => {
            if (!ent.isAnswered && ent.isChecked) {
                ent.isChecked = false;
            }
        });

        return words;
    }

    public static ParseWords(words?: string): IWordEntry[] {
        const entries: IWordEntry[] = [];

        if (words) {
            const lines: string[] = words.split("\n");

            for (const line of lines) {
                const sides: string[] = line.split(/--|[\\—\\–]/);
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
                const wordEntry: IWordEntry = {
                    id: uuid(),
                    isAnswered: false,
                    isChecked: false,
                    isIgnored: line[0] === "~",
                    left: leftWords.map((w) => w.trim()),
                    right: rightWords.map((w) => w.trim()),
                };

                entries.push(wordEntry);
            }
        }

        return entries;
    }
}
