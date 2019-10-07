import { combineReducers, Reducer } from "redux";

import { DataTransferService } from "../services/data-transfer-service";
import { DataWorkshopService } from "../services/data-workshop-service";
import { TabType } from "../types/enums";
import { IAnswerEntry } from "../types/i-answer-entry";
import { IWordEntry } from "../types/i-word-entry";
import { AppActionType, IAppAction } from "./actions";

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

const appReducer: Reducer = (currentState: IAppReduxState = initialAppReducerState, action: IAppAction): IAppReduxState => {

    // TODO: Find a solution how to provide action interfaces simply
    const reducers = {
        [AppActionType.CLICK_CHECK_ANSWER_BTN]: (state: IAppReduxState) => {
            // TODO: Shrink body into some function
            const wordEntries: IWordEntry[] = state.wordEntries ? state.wordEntries : [];
            const targetEntry: IWordEntry | undefined = wordEntries.find((ent) => ent.id === action.value.id);

            if (targetEntry) {
                targetEntry.isChecked = true;
                targetEntry.isAnswered = action.value.isAnswered;

                state.answersLog.push({
                    answer: action.value.answer,
                    isAnswered: action.value.isAnswered,
                    orig: targetEntry.left.join(", "),
                });
            }

            const current: IWordEntry | undefined = DataWorkshopService.GetRandomWordEntry(action.value.rate, state.wordEntries);
            // TODO: think how to move data saving out of a reducer
            DataTransferService.SaveWordEntries(state.wordEntries ? state.wordEntries : []);
            state.currentQuestion = current;
            return state;
        },
        [AppActionType.CLICK_NEW_ROUND_BTN]: (state: IAppReduxState) => {
            const entries: IWordEntry[] = DataWorkshopService.ResetCheckedUnansweredWords(state.wordEntries ? state.wordEntries : []);
            // TODO: think how to move data saving out of a reducer
            DataTransferService.SaveWordEntries(entries);
            state.currentQuestion = DataWorkshopService.GetRandomWordEntry(action.value.rate, entries);
            state.wordEntries = entries;
            state.answersLog = [];
            return state;
        },
        [AppActionType.CLICK_UPLOAD_BTN]: (state: IAppReduxState) => {
            const entries: IWordEntry[] = DataWorkshopService.ParseWords(action.value.words);
            // TODO: think how to move data saving out of a reducer
            DataTransferService.SaveWordEntries(entries);
            state.currentQuestion = DataWorkshopService.GetRandomWordEntry(action.value.rate, entries);
            state.wordEntries = entries;
            return state;
        },
        [AppActionType.PICK_IGNORED_WORDS_TAB]: (state: IAppReduxState) => {
            state.selectedTab = TabType.IGNOTED_WORDS_TAB;
            return state;
        },
        [AppActionType.PICK_UPLOADING_TAB]: (state: IAppReduxState) => {
            state.selectedTab = TabType.UPLOADING_TAB;
            return state;
        },
        [AppActionType.PICK_TRAINING_TAB]: (state: IAppReduxState) => {
            state.selectedTab = TabType.TRAINING_TAB;
            return state;
        },
        [AppActionType.SET_WORD_ENTIRES]: (state: IAppReduxState) => {
            state.currentQuestion = DataWorkshopService.GetRandomWordEntry(action.value.rate, action.value.wordEntries);
            state.wordEntries = action.value.wordEntries;
            return state;
        },
    };

    // This action helps to keep reducer pure
    const clonnedState: IAppReduxState = JSON.parse(JSON.stringify(currentState));
    const reducer = reducers[action.type];

    if (reducer) {
        return reducer(clonnedState);
    }

    return clonnedState;
};

export const rootReducer: Reducer<ICombinedReducersEntries> = combineReducers({
    appReducer,
});
