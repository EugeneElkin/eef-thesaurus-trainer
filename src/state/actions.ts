import { Action } from "redux";
import { IWordEntry } from "../types/i-word-entry";

export interface IAppAction extends Action<number> {
    value?: any;
}

export enum AppActionType {
    CLICK_CHECK_ANSWER_BTN = 1,
    CLICK_NEW_ROUND_BTN,
    CLICK_UPLOAD_BTN,
    PICK_IGNORED_WORDS_TAB,
    PICK_UPLOADING_TAB,
    PICK_TRAINING_TAB,
    SET_WORD_ENTIRES,
}

const app = {
    clickCheckAnswerBtn: (rate: number, id: string, isAnswered: boolean, answer: string) => ({
        type: AppActionType.CLICK_CHECK_ANSWER_BTN,
        value: {
            answer,
            id,
            isAnswered,
            rate,
        },
    }),
    clickNewRoundBtn: (rate: number) => ({
        type: AppActionType.CLICK_NEW_ROUND_BTN,
        value: {
            rate,
        },
    }),
    clickUploadBtn: (rate: number, words?: string) => ({
        type: AppActionType.CLICK_UPLOAD_BTN,
        value: {
            rate,
            words,
        },
    }),
    pickIgnoredWordsTab: () => ({
        type: AppActionType.PICK_IGNORED_WORDS_TAB,
    }),
    pickTrainingTab: () => ({
        type: AppActionType.PICK_TRAINING_TAB,
    }),
    pickUploadingTab: () => ({
        type: AppActionType.PICK_UPLOADING_TAB,
    }),
    setWordEntries: (rate: number, wordEntries: IWordEntry[]) => ({
        type: AppActionType.SET_WORD_ENTIRES,
        value: {
            rate,
            wordEntries,
        },
    }),
};

export const Actions = {
    app,
};
