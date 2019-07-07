import { combineReducers, Reducer } from "redux";

import { TabType } from "../types/enums";
import { WordEntry } from "../types/word-entry";
import { AppActionType, IAppAction } from "./actions";

interface IAppReduxState {
    selectedTab?: TabType;
    wordEntries?: WordEntry[];
    currentQuestion?: WordEntry;
}

export interface ICombinedReducersEntries {
    appReducer: IAppReduxState;
}

const initialAppReducerState: IAppReduxState = {
};

const appReducer: Reducer = (state: IAppReduxState = initialAppReducerState, action: IAppAction): IAppReduxState => {
    switch (action.type) {
        case AppActionType.CLIK_UPLOAD_BTN:
            return {
                ...state,
                wordEntries: action.value,
            }
        case AppActionType.PICK_UPLOADING_TAB:
            return {
                ...state,
                selectedTab: TabType.UPLOADING_TAB,
            };
        case AppActionType.PICK_TRAINING_TAB:
            return {
                ...state,
                selectedTab: TabType.TRAINING_TAB,
            };
        case AppActionType.SET_CURRENT_QUESTION:
            return {
                ...state,
                currentQuestion: action.value,
            }
        default:
            return state;
    }
};

export const rootReducer: Reducer<ICombinedReducersEntries> = combineReducers({
    appReducer,
});
