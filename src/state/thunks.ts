import { Dispatch } from "redux";
import { Actions } from "./actions";
import { ICombinedReducersEntries } from "./reducers";

const app = {
    clickCheckAnswerBtn: (rate: number, id: string, isAnswered: boolean, answer: string) => {
        return (dispatch: Dispatch, getState: () => ICombinedReducersEntries) => {
            return new Promise((resolve, reject) => {
                dispatch(Actions.app.clickCheckAnswerBtn(rate, id, isAnswered, answer));
                resolve(getState().appReducer.wordEntries);
            });
        };
    },
    clickNewRoundBtn: (rate: number) => {
        return (dispatch: Dispatch, getState: () => ICombinedReducersEntries) => {
            return new Promise((resolve, reject) => {
                dispatch(Actions.app.clickNewRoundBtn(rate));
                resolve(getState().appReducer.wordEntries);
            });
        };
    },
    clickUploadBtn: (rate: number, words?: string) => {
        return (dispatch: Dispatch, getState: () => ICombinedReducersEntries) => {
            return new Promise((resolve, reject) => {
                dispatch(Actions.app.clickUploadBtn(rate, words));
                resolve(getState().appReducer.wordEntries);
            });
        };
    },
};

export const Thunks = {
    app,
};
