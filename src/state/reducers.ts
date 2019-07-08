import { combineReducers, Reducer } from "redux";

import { TabType } from "../types/enums";
import { WordEntry } from "../types/word-entry";
import { AppActionType, IAppAction } from "./actions";
import { DataTransferService } from "../services/data-transfer-service";

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
        case AppActionType.CLICK_CHECK_ANSWER_BTN:
            const newState: IAppReduxState = { ...state };
            const wordEntries: WordEntry[] = newState.wordEntries ? newState.wordEntries : [];
            const targetEntry: WordEntry | undefined = wordEntries.find(ent => ent.id === action.value.id);

            if (targetEntry) {
                targetEntry.isChecked = true;
                targetEntry.isAnswered = action.value.isAnswered;
            }

            const current: WordEntry | undefined = DataTransferService.getRandomWordEntry(newState.wordEntries);
            newState.currentQuestion = current;

            return newState;
        case AppActionType.CLICK_UPLOAD_BTN:
            return {
                ...state,
                currentQuestion: action.value.current,
                wordEntries: action.value.entries,
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
        default:
            return state;
    }
};

export const rootReducer: Reducer<ICombinedReducersEntries> = combineReducers({
    appReducer,
});
