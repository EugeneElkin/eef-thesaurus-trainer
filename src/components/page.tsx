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
import { useEffect, useState } from "react";

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

export const PageComponent = (props: IPageComponentDescriptor) => {
    useEffect(() => {
        DataTransferService.LoadWordEntries().then((result) => {
            props.handlers.setWordEntries(result);
        });
        props.handlers.setIrrWordEntries(DataWorkshopService.ParseWords(IRREGULAR_VERBS));
    }, [props.handlers]);

    const detectComponent = (tabType?: TabType): React.ReactNode => {
        switch (tabType) {
            case TabType.TRAINING_TAB:
                return (
                    <TrainingPageComponent
                        answersLog={props.answersLog}
                        wordEntry={props.currentQuestion}
                        clickCheckButtonHandler={props.handlers.clickAnswerButton}
                        clickNewRoundButtonHandler={props.handlers.clickNewRoundButton} />
                );
            case TabType.IRREGULAR_WORDS_TAB:
                return (
                    <IrregularWordsTrainingPageComponent
                        answersLog={props.irrAnswersLog}
                        wordEntry={props.currentIrrWord}
                        clickCheckButtonHandler={props.handlers.clickIrrAnswerButton}
                    />
                );
            case TabType.IGNOTED_WORDS_TAB:
                return (
                    <IgnoredWordsPageComponent
                        ignoredWords={props.wordEntries ? props.wordEntries.filter((x) => x.isIgnored) : []} />
                );
            case TabType.UPLOADING_TAB:
            default:
                return (
                    <UploadingPageComponent
                        clickUploadButtonHandler={props.handlers.clickUploadWordsButton} />
                );
        }
    }

    return (
        <React.Fragment>
            <div className="header-container">
                <h1>Thesaurus Trainer</h1>
                <StatisticsComponent wordEntries={props.wordEntries} />
            </div>
            <div className="main-container">
                <div className="tabs-container">
                    <div className={"tab-uploading grid-item" +
                        (props.selectedTab === undefined || props.selectedTab === TabType.UPLOADING_TAB ? " active" : "")}
                        onClick={props.handlers.clickUploadingTab}>Uploading</div>
                    <div className={"tab-training grid-item" +
                        (props.selectedTab === TabType.TRAINING_TAB ? " active" : "")}
                        onClick={props.handlers.clickTrainingTab}>Training</div>
                    <div className={"tab-ignored-words grid-item" +
                        (props.selectedTab === TabType.IGNOTED_WORDS_TAB ? " active" : "")}
                        onClick={props.handlers.clickIgnoredWordsTab}>Ignored Words</div>
                    <div className={"tab-irregular-words grid-item" +
                        (props.selectedTab === TabType.IRREGULAR_WORDS_TAB ? " active" : "")}
                        onClick={props.handlers.clickIrregularWordsTab}>Irregular Words (ENG)</div>
                </div>
                <div className="content-container">
                    {detectComponent(props.selectedTab)}
                </div>
            </div>
        </React.Fragment>
    );
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
