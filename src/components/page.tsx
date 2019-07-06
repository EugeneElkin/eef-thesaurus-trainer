import * as React from "react";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";

import { ICombinedReducersEntries } from "../state/reducers";
import { TabType } from "../types/enums";
import { TrainingPageComponent } from "./training-page";
import { UploadingPageComponent } from "./uploading-page";
import { Actions } from "../state/actions";

interface IPageComponentProps {
    selectedTab?: TabType
}

interface IpageComponentHandlers {
    clickUploadingTab: () => void;
    clickTrainingTab: () => void;
}

interface IPageComponentHandlersWrapper {
    handlers: IpageComponentHandlers
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
                <h1>Thesaurus Trainer</h1>

                <div className="main-container">
                    <div className="tabs-container">
                        <div className={"tab-uploading grid-item" +
                            (this.props.selectedTab === undefined || this.props.selectedTab === TabType.UPLOADING_TAB ? " active" : "")}
                            onClick={this.props.handlers.clickUploadingTab}>Uploading</div>
                        <div className={"tab-training grid-item" +
                            (this.props.selectedTab === TabType.TRAINING_TAB ? " active" : "")}
                            onClick={this.props.handlers.clickTrainingTab}>Training</div>
                    </div>
                    {this.detectComponent(this.props.selectedTab)}
                </div>
            </React.Fragment>
        );
    }

    private detectComponent(tabType?: TabType): any {
        switch (tabType) {
            case TabType.TRAINING_TAB:
                return (<TrainingPageComponent />);
            case TabType.UPLOADING_TAB:
            default:
                return (<UploadingPageComponent />);
        }
    }
}

const mapReduxStateToComponentProps: (state: ICombinedReducersEntries) => IPageComponentProps = (state) => {
    return {
        selectedTab: state ? state.appReducer.selectedTab : undefined,
    };
};

const mapComponentEventsToReduxDispatches: (dispatch: Dispatch<Action<number>>) => IPageComponentHandlersWrapper =
    (dispatch) => {
        return {
            handlers: {
                clickUploadingTab: () => {
                    dispatch(Actions.app.pickUploadingTab());
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

