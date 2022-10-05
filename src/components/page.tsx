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
import styled from "styled-components";

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

const Div = styled.div`
& .header-container {
    display: flex;
    flex-direction: row;
    justify-content: start;
}
& .main-container {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 30px 1fr;
    box-sizing: content-box;
    & .tabs-container {
        display: grid;
        height: 30px;
        grid-template-columns: auto auto auto auto;
        justify-content: start;
        box-sizing: content-box;
        bottom: -1px;
        z-index: 2;
        position: relative;
        & .grid-item {
            text-align: center;
            cursor: pointer;
            color: #474B24;
            font-weight: bold;
            background-color: #C1CAD6;
            border: 1px solid black;
            border-collapse: collapse;
            border-spacing: 0;
            border-right: none;
            padding: 5px 10px;
        }
        & .grid-item:hover {
            color: #D16666;
        }
        & .grid-item.active {
            background-color: white;
            border-bottom: none;
        }
        & .grid-item:first-child {
            border-radius: 8px 0 0 0;
        }
        & .grid-item:nth-last-child(1) {
            border-radius: 0 8px 0 0;
            border-right: 1px solid black;
        }
    }
    & .content-container {
        padding: 10px;
        border: 1px solid black;
        border-collapse: collapse;
        border-spacing: 0px;
        border-radius: 0 8px 8px 8px;
        box-sizing: content-box;
        z-index: 0;
        box-shadow: 3px 3px 2px gray;
    } 
}
`;

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
        <Div>
            <div className="header-container">
                <h1>Thesaurus Trainer</h1>
                <StatisticsComponent wordEntries={props.wordEntries} />
            </div>
            <div className="main-container">
                <div className="tabs-container">
                    <div className={"grid-item" +
                        (props.selectedTab === undefined || props.selectedTab === TabType.UPLOADING_TAB ? " active" : "")}
                        onClick={props.handlers.clickUploadingTab}>Uploading</div>
                    <div className={"grid-item" +
                        (props.selectedTab === TabType.TRAINING_TAB ? " active" : "")}
                        onClick={props.handlers.clickTrainingTab}>Training</div>
                    <div className={"grid-item" +
                        (props.selectedTab === TabType.IGNOTED_WORDS_TAB ? " active" : "")}
                        onClick={props.handlers.clickIgnoredWordsTab}>Ignored Words</div>
                    <div className={"grid-item" +
                        (props.selectedTab === TabType.IRREGULAR_WORDS_TAB ? " active" : "")}
                        onClick={props.handlers.clickIrregularWordsTab}>Irregular Words (ENG)</div>
                </div>
                <div className="content-container">
                    {detectComponent(props.selectedTab)}
                </div>
            </div>
        </Div>
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
