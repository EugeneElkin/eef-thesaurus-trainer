import { IWordEntry } from "../types/i-word-entry";

export class DataMutationService {
    public static ResetCheckedUnansweredWords(words: IWordEntry[]): IWordEntry[] {
        const newWords: IWordEntry[] = [...words];        
        newWords.forEach(ent => {
            if (!ent.isAnswered && ent.isChecked) {
                ent.isChecked = false;
            }
        });

        return newWords;
    }
}