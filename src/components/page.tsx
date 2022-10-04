import * as React from "react";
import { connect } from "react-redux";
import { DataTransferService } from "../services/data-transfer-service";
import { Actions } from "../state/actions";
import { ICombinedReducersEntries } from "../state/reducers";
import { Thunks } from "../state/thunks";
import { TabType } from "../types/enums";
import { IAnswerEntry } from "../types/i-answer-entry";
import { IWordEntry } from "../types/i-word-entry";
import { IgnoredWordsPageComponent } from "./pages/ignored-words-page";
import { TrainingPageComponent } from "./pages/training-page";
import { UploadingPageComponent } from "./pages/uploading-page";
import { StatisticsComponent } from "./statistics";
import { IrregularWordsTrainingPageComponent } from "./pages/irrw-training-page";
import { DataWorkshopService } from "../services/data-workshop-service";
import { IRREGULAR_VERBS } from "../data/irregular-verbs";

interface IPageComponentProps {
    answersLog: IAnswerEntry[];
    currentIrrWord?: IWordEntry;
    currentQuestion?: IWordEntry;
    irrAnswersLog: IAnswerEntry[];
    selectedTab?: TabType;
    wordEntries?: IWordEntry[];
}

interface IPageComponentHandlers {
    clickIgnoredWordsTab: () => void;
    clickIrregularWordsTab: () => void;
    clickUploadingTab: () => void;
    clickTrainingTab: () => void;
    clickUploadWordsButton: (words?: string) => void;
    clickAnswerButton: (id: string, isAnswered: boolean, answer: string) => void;
    clickIrrAnswerButton: (id: string, isAnswered: boolean, answer: string) => void;
    clickNewRoundButton: () => void;
    setWordEntries: (wordEntries: IWordEntry[]) => void;
    setIrrWordEntries: (wordEntries: IWordEntry[]) => void;
}

interface IPageComponentHandlersWrapper {
    handlers: IPageComponentHandlers;
}

interface IPageComponentDescriptor extends IPageComponentProps, IPageComponentHandlersWrapper {
}

export class PageComponent extends React.Component<IPageComponentDescriptor> {
    public componentDidMount() {
        DataTransferService.LoadWordEntries().then((result) => {
            this.props.handlers.setWordEntries(result);
        });

        this.props.handlers.setIrrWordEntries(DataWorkshopService.ParseWords(IRREGULAR_VERBS));
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
                        <div className={"tab-ignored-words grid-item" +
                            (this.props.selectedTab === TabType.IGNOTED_WORDS_TAB ? " active" : "")}
                            onClick={this.props.handlers.clickIgnoredWordsTab}>Ignored Words</div>
                        <div className={"tab-irregular-words grid-item" +
                            (this.props.selectedTab === TabType.IRREGULAR_WORDS_TAB ? " active" : "")}
                            onClick={this.props.handlers.clickIrregularWordsTab}>Irregular Words</div>
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
                        answersLog={this.props.answersLog}
                        wordEntry={this.props.currentQuestion}
                        clickCheckButtonHandler={this.props.handlers.clickAnswerButton}
                        clickNewRoundButtonHandler={this.props.handlers.clickNewRoundButton} />
                );
            case TabType.IRREGULAR_WORDS_TAB:
                return (
                    <IrregularWordsTrainingPageComponent
                        answersLog={this.props.irrAnswersLog}
                        wordEntry={this.props.currentIrrWord}
                        clickCheckButtonHandler={this.props.handlers.clickIrrAnswerButton}
                    />
                );
            case TabType.IGNOTED_WORDS_TAB:
                return (
                    <IgnoredWordsPageComponent
                        ignoredWords={this.props.wordEntries ? this.props.wordEntries.filter((x) => x.isIgnored) : []} />
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
        answersLog: state ? state.appReducer.answersLog : [],
        currentIrrWord: state ? state.appReducer.currentIrrWord : undefined,
        currentQuestion: state ? state.appReducer.currentQuestion : undefined,
        irrAnswersLog: state ? state.appReducer.irrAnswerLog : [],
        selectedTab: state ? state.appReducer.selectedTab : undefined,
        wordEntries: state ? state.appReducer.wordEntries : undefined,
    };
};

const mapComponentEventsToReduxDispatches: (dispatch: any) => IPageComponentHandlersWrapper =
    (dispatch) => {
        return {
            handlers: {
                clickAnswerButton: (id: string, isAnswered: boolean, answer: string) => {
                    dispatch(Thunks.app.clickCheckAnswerBtn(Math.random(), id, isAnswered, answer))
                        .then((wordEntries: IWordEntry[] | undefined) => {
                            DataTransferService.SaveWordEntries(wordEntries ? wordEntries : []);
                        });
                },
                clickIrrAnswerButton: (id: string, isAnswered: boolean, answer: string) => {
                    dispatch(Actions.app.clickCheckIrrAnswerBtn(Math.random(), id, isAnswered, answer));
                },
                clickIgnoredWordsTab: () => {
                    dispatch(Actions.app.pickIgnoredWordsTab());
                },
                clickIrregularWordsTab: () => {
                    dispatch(Actions.app.pickIrregularWordsTab());
                },
                clickNewRoundButton: () => {
                    dispatch(Thunks.app.clickNewRoundBtn(Math.random()))
                        .then((wordEntries: IWordEntry[] | undefined) => {
                            DataTransferService.SaveWordEntries(wordEntries ? wordEntries : []);
                        });
                },
                clickTrainingTab: () => {
                    dispatch(Actions.app.pickTrainingTab());
                },
                clickUploadWordsButton: (words?: string) => {
                    dispatch(Thunks.app.clickUploadBtn(Math.random(), words))
                        .then((wordEntries: IWordEntry[] | undefined) => {
                            DataTransferService.SaveWordEntries(wordEntries ? wordEntries : []);
                        });
                },
                clickUploadingTab: () => {
                    dispatch(Actions.app.pickUploadingTab());
                },
                setIrrWordEntries: (irrWordEntries: IWordEntry[]) => {
                    dispatch(Actions.app.setIrrWordEntries(Math.random(), irrWordEntries));
                },
                setWordEntries: (wordEntries: IWordEntry[]) => {
                    dispatch(Actions.app.setWordEntries(Math.random(), wordEntries));
                },
            },
        };
    };

export const ConnectedPageComponent: any = connect(
    mapReduxStateToComponentProps,
    mapComponentEventsToReduxDispatches,
)(PageComponent);
