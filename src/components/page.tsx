import * as React from "react";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";

import { Actions } from "../state/actions";
import { ICombinedReducersEntries } from "../state/reducers";
import { TabType } from "../types/enums";
import { WordEntry } from "../types/word-entry";
import { StatisticsComponent } from "./statistics";
import { TrainingPageComponent } from "./training-page";
import { UploadingPageComponent } from "./uploading-page";

interface IPageComponentProps {
    selectedTab?: TabType
    wordEntries?: WordEntry[];
    currentQuestion?: WordEntry;
}

interface IPageComponentHandlers {
    clickUploadingTab: () => void;
    clickTrainingTab: () => void;
    clickUploadWordsButton: (words?: string) => void;
    clickAnswerButton: (id: string, isAnswered: boolean) => void;
}

interface IPageComponentHandlersWrapper {
    handlers: IPageComponentHandlers
}

interface IPageComponentDescriptor extends IPageComponentProps, IPageComponentHandlersWrapper {
}

export class PageComponent extends React.Component<IPageComponentDescriptor> {
    constructor(props: IPageComponentDescriptor) {
        super(props);
    }

    public render() {
        return (
            <React.Fragment>
                <div className="header-container">
                    <h1>Thesaurus Trainer</h1>
                    <StatisticsComponent wordEntries={this.props.wordEntries} />
                </div>
                <div className="main-container">
                    <div className="tabs-container">
                        <div className={"tab-uploading grid-item" +
                            (this.props.selectedTab === undefined || this.props.selectedTab === TabType.UPLOADING_TAB ? " active" : "")}
                            onClick={this.props.handlers.clickUploadingTab}>Uploading</div>
                        <div className={"tab-training grid-item" +
                            (this.props.selectedTab === TabType.TRAINING_TAB ? " active" : "")}
                            onClick={this.props.handlers.clickTrainingTab}>Training</div>
                    </div>
                    <div className="content-container">
                        {this.detectComponent(this.props.selectedTab)}
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private detectComponent(tabType?: TabType): any {
        switch (tabType) {
            case TabType.TRAINING_TAB:
                return (
                    <TrainingPageComponent
                        wordEntry={this.props.currentQuestion}
                        clickCheckButtonHandler={this.props.handlers.clickAnswerButton} />
                );
            case TabType.UPLOADING_TAB:
            default:
                return (
                    <UploadingPageComponent
                        clickUploadButtonHandler={this.props.handlers.clickUploadWordsButton} />
                );
        }
    }
}

const mapReduxStateToComponentProps: (state: ICombinedReducersEntries) => IPageComponentProps = (state) => {
    return {
        currentQuestion: state ? state.appReducer.currentQuestion : undefined,
        selectedTab: state ? state.appReducer.selectedTab : undefined,
        wordEntries: state ? state.appReducer.wordEntries : undefined,
    };
};

const mapComponentEventsToReduxDispatches: (dispatch: Dispatch<Action<number>>) => IPageComponentHandlersWrapper =
    (dispatch) => {
        return {
            handlers: {
                clickAnswerButton: (id: string, isAnswered: boolean) => {
                    dispatch(Actions.app.clickCheckAnswerBtn(id, isAnswered));
                },
                clickUploadingTab: () => {
                    dispatch(Actions.app.pickUploadingTab());
                },
                clickUploadWordsButton: (words?: string) => {
                    dispatch(Actions.app.clickUploadBtn(words));
                },
                clickTrainingTab: () => {
                    dispatch(Actions.app.pickTrainingTab());
                },
            },
        };
    };

export const ConnectedPageComponent: any = connect(
    mapReduxStateToComponentProps,
    mapComponentEventsToReduxDispatches,
)(PageComponent);

