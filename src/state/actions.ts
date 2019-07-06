import { Action } from "redux";

export interface IAppAction extends Action<number> {
    value?: any;
}

export enum AppActionType {
    PICK_UPLOADING_TAB = 1,
    PICK_TRAINING_TAB
}

const app = {
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
