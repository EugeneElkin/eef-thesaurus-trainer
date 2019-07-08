import { Action } from "redux";

import { DataTransferService } from "../services/data-transfer-service";
import { WordEntry } from "../types/word-entry";

export interface IAppAction extends Action<number> {
    value?: any;
}

export enum AppActionType {
    CLICK_UPLOAD_BTN,
    PICK_UPLOADING_TAB = 1,
    PICK_TRAINING_TAB,
    CLICK_CHECK_ANSWER_BTN,
}

const app = {
    clickCheckAnswerBtn: (id: string, isAnswered: boolean) => {
        return {
            type: AppActionType.CLICK_CHECK_ANSWER_BTN,
            value: {
                id: id,
                isAnswered: isAnswered,
            },
        }
    },
    clickUploadBtn: (words?: string) => {
        const entries: WordEntry[] = DataTransferService.parseWords(words);
        return {
            type: AppActionType.CLICK_UPLOAD_BTN,
            value: {
                current: DataTransferService.getRandomWordEntry(entries),
                entries: entries,
            }
        }
    },
    pickUploadingTab: () => ({
        type: AppActionType.PICK_UPLOADING_TAB,
    }),
    pickTrainingTab: () => ({
        type: AppActionType.PICK_TRAINING_TAB,
    }),
};

export const Actions = {
    app,
};
