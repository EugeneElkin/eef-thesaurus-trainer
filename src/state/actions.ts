import { Action } from "redux";

import { DataTransferService } from "../services/data-transfer-service";
import { IWordEntry } from "../types/i-word-entry";

export interface IAppAction extends Action<number> {
    value?: any;
}

export enum AppActionType {
    CLICK_UPLOAD_BTN,
    PICK_UPLOADING_TAB = 1,
    PICK_TRAINING_TAB,
    CLICK_CHECK_ANSWER_BTN,
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
    clickUploadBtn: (words?: string) => ({
            type: AppActionType.CLICK_UPLOAD_BTN,
            value: words,
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
