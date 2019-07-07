import { Action } from "redux";

import { DataTransferService } from "../services/data-transfer-service";

export interface IAppAction extends Action<number> {
    value?: any;
}

export enum AppActionType {
    CLIK_UPLOAD_BTN,
    PICK_UPLOADING_TAB = 1,
    PICK_TRAINING_TAB,
    SET_CURRENT_QUESTION,
}

const app = {
    clickUploadBtn: (words?: string) => ({
        type: AppActionType.CLIK_UPLOAD_BTN,
        value: DataTransferService.parseWords(words)
    }),
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
