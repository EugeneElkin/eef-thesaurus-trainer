import { combineReducers, Reducer } from "redux";

import { TabType } from "../types/enums";
import { AppActionType, IAppAction } from "./actions";

interface IAppReduxState {
    selectedTab?: TabType;
}

export interface ICombinedReducersEntries {
    appReducer: IAppReduxState;
}

const initialAppReducerState: IAppReduxState = {
};

const appReducer: Reducer = (state: IAppReduxState = initialAppReducerState, action: IAppAction): IAppReduxState => {
    switch (action.type) {
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
