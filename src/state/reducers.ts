import { combineReducers, Reducer } from "redux";

import { TabType } from "../types/enums";
import { IWordEntry } from "../types/i-word-entry";
import { AppActionType, IAppAction } from "./actions";
import { DataTransferService } from "../services/data-transfer-service";
import { IAnswerEntry } from "../types/i-answer-entry";
import { DataMutationService } from "../services/data-mutation-service";

interface IAppReduxState {
    answersLog: IAnswerEntry[];
    currentQuestion?: IWordEntry;
    selectedTab?: TabType;
    wordEntries?: IWordEntry[];
}

export interface ICombinedReducersEntries {
    appReducer: IAppReduxState;
}

const initialAppReducerState: IAppReduxState = {
    answersLog: [],
};

const appReducer: Reducer = (state: IAppReduxState = initialAppReducerState, action: IAppAction): IAppReduxState => {
    switch (action.type) {
        case AppActionType.CLICK_CHECK_ANSWER_BTN:
            const newState: IAppReduxState = { ...state };
            const wordEntries: IWordEntry[] = newState.wordEntries ? newState.wordEntries : [];
            const targetEntry: IWordEntry | undefined = wordEntries.find(ent => ent.id === action.value.id);

            if (targetEntry) {
                targetEntry.isChecked = true;
                targetEntry.isAnswered = action.value.isAnswered;

                newState.answersLog.push({
                    answer: action.value.answer,
                    orig: targetEntry.left.join(", "),
                    isAnswered: action.value.isAnswered,
                });
            }

            const current: IWordEntry | undefined = DataTransferService.getRandomWordEntry(newState.wordEntries);
            DataTransferService.saveWordEntries(newState.wordEntries ? newState.wordEntries : []);

            newState.currentQuestion = current;

            return newState;
        case AppActionType.CLICK_NEW_ROUND_BTN:
            return function () {
                let entries: IWordEntry[] = DataMutationService.ResetCheckedUnansweredWords(state.wordEntries ? state.wordEntries : []);
                DataTransferService.saveWordEntries(entries);

                return {
                    ...state,
                    currentQuestion: DataTransferService.getRandomWordEntry(entries),
                    wordEntries: entries,
                }
            }();
        case AppActionType.CLICK_UPLOAD_BTN:
            const entries: IWordEntry[] = DataTransferService.parseWords(action.value);
            DataTransferService.saveWordEntries(entries);

            return {
                ...state,
                currentQuestion: DataTransferService.getRandomWordEntry(entries),
                wordEntries: entries,
            }
        case AppActionType.PICK_IGNORED_WORDS_TAB:
            return {
                ...state,
                selectedTab: TabType.IGNOTED_WORDS_TAB,
            };
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
        case AppActionType.SET_WORD_ENTIRES:
            return {
                ...state,
                currentQuestion: DataTransferService.getRandomWordEntry(action.value),
                wordEntries: action.value,
            }
        default:
            return state;
    }
};

export const rootReducer: Reducer<ICombinedReducersEntries> = combineReducers({
    appReducer,
});
