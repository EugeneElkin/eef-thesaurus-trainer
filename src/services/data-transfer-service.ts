import { v4 as uuid } from "uuid";
import { IWordEntry } from "../types/i-word-entry";

export class DataTransferService {

    public static parseWords(words?: string): IWordEntry[] {
        let entries: IWordEntry[] = [];

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
                const wordEntry: IWordEntry = {
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

    public static getRandomWordEntry(wordEntries?: IWordEntry[]): IWordEntry | undefined {
        const uncheckedEntries: IWordEntry[] = wordEntries
            ? wordEntries.filter(ent => !ent.isChecked)
            : [];
        const unckeckedNum: number = uncheckedEntries.length;

        const randomIndex: number = unckeckedNum > 0 ? Math.floor(Math.random() * (unckeckedNum)) : -1;
        const targetEntry: IWordEntry | undefined = randomIndex !== -1 ? uncheckedEntries[randomIndex] : undefined;

        return targetEntry;
    }

    public static saveWordEntries(entries: IWordEntry[]): Promise<void> { 
        return new Promise((resolve, reject) => {
            localStorage.setItem(this.wordEntriesKey, JSON.stringify(entries));
            resolve();
        });
    }

    public static loadWordEntries(): Promise<IWordEntry[]> {
        return new Promise((resolve, reject) => {
            let wordEntries: IWordEntry[] = [];

            try {
                const storedEntries: string | null = localStorage.getItem(this.wordEntriesKey);
                if (storedEntries !== null) {
                    wordEntries = JSON.parse(storedEntries);
                }
            } catch (ex) {
                // TODO: handle somehow to add then a notifying message
                reject();
            }

            resolve(wordEntries);
        });
    }

    private static wordEntriesKey: string = "word-entries";
}