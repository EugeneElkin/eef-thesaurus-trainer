import * as React from "react";

import { IValueDescriptor } from "../types/i-value-descriptor";
import { WordEntry } from "../types/word-entry";

export interface ITrainingPageComponentProps {
    wordEntry?: WordEntry;
    clickCheckButtonHandler: (id: string, isAnswered: boolean) => void;
}

interface ITrainingPageComponentState {
    answer: IValueDescriptor<string>;
}

export class TrainingPageComponent extends React.Component<ITrainingPageComponentProps, ITrainingPageComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            answer: {
                isValid: true,
                value: undefined,
            },
        };

        this.handleAnswerWasChanged = this.handleAnswerWasChanged.bind(this);
        this.proceedAnswer = this.proceedAnswer.bind(this);
    }

    public componentDidMount() {

    }

    public render() {

        const randomRight: string = this.props.wordEntry ? this.props.wordEntry.right.join(", ") : "-- none --";

        return (
            <div className="training-container">
                <div className="card-container">
                    <div className="title">Card</div>
                    <p className="simple-synonym">{randomRight}</p>
                    <div className="answer">
                        <input
                            type="text"
                            onChange={this.handleAnswerWasChanged}
                            value={this.state.answer.value} />
                    </div>
                    <div className="check-button">
                        <button
                            disabled={typeof this.props.wordEntry === 'undefined'}
                            onClick={this.proceedAnswer}
                        >Check</button>
                    </div>
                </div>
            </div>
        );
    }

    private proceedAnswer(): void {
        if (!this.props.wordEntry || !this.state.answer.value) {
            return;
        }

        const randomLeft: string[] = this.props.wordEntry.left;
        const targetEntryId: string = this.props.wordEntry.id;
        const isAnswered: boolean = randomLeft.includes(this.state.answer.value);

        // TODO: add effects then waiter and then proceed.
        this.props.clickCheckButtonHandler(targetEntryId, isAnswered);

        this.setState((state, props) => ({
            answer: {
                isValid: true,
                value: "",
            },
        }));
    }

    private handleAnswerWasChanged(event: React.ChangeEvent<HTMLInputElement>): void {
        const value: string = event.currentTarget.value;
        this.setState((state, props) => ({
            answer: {
                isValid: true,
                value: value,
            },
        }));
    }
}