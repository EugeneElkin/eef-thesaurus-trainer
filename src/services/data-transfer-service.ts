import { IWordEntry } from "../types/i-word-entry";

export class DataTransferService {
    public static SaveWordEntries(entries: IWordEntry[]): void {
        localStorage.setItem(this.wordEntriesKey, JSON.stringify(entries));
    }

    public static LoadWordEntries(): Promise<IWordEntry[]> {
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
