import { Action } from "redux";

import { DataTransferService } from "../services/data-transfer-service";
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
    clickCheckAnswerBtn: (id: string, isAnswered: boolean, answer: string) => {
        return {
            type: AppActionType.CLICK_CHECK_ANSWER_BTN,
            value: {
                answer: answer,
                id: id,
                isAnswered: isAnswered,
            },
        }
    },
    clickNewRoundBtn: () => ({
        type: AppActionType.CLICK_NEW_ROUND_BTN
    }),
    clickUploadBtn: (words?: string) => ({
        type: AppActionType.CLICK_UPLOAD_BTN,
        value: words,
    }),
    pickIgnoredWordsTab: () => ({
        type: AppActionType.PICK_IGNORED_WORDS_TAB,
    }),
    pickUploadingTab: () => ({
        type: AppActionType.PICK_UPLOADING_TAB,
    }),
    pickTrainingTab: () => ({
        type: AppActionType.PICK_TRAINING_TAB,
    }),
    setWordEntries: (wordEntries: IWordEntry[]) => ({
        type: AppActionType.SET_WORD_ENTIRES,
        value: wordEntries,
    }),
};

export const Actions = {
    app,
};
