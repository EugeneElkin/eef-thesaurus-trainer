import * as React from "react";

import { IAnswerEntry } from "../../types/i-answer-entry";
import { IValueDescriptor } from "../../types/i-value-descriptor";
import { IWordEntry } from "../../types/i-word-entry";
import { AnswersLogComponent } from "./answers-log/answers-log";

export interface ITrainingPageComponentProps {
    answersLog: IAnswerEntry[];
    wordEntry?: IWordEntry;
    clickCheckButtonHandler: (id: string, isAnswered: boolean, answer: string) => void;
    clickNewRoundButtonHandler: () => void;
}

interface ITrainingPageComponentState {
    answer: IValueDescriptor<string>;
}

export class TrainingPageComponent extends React.Component<ITrainingPageComponentProps, ITrainingPageComponentState> {
    constructor(props: ITrainingPageComponentProps) {
        super(props);

        this.state = {
            answer: {
                isValid: true,
                value: "",
            },
        };

        this.handleAnswerWasChanged = this.handleAnswerWasChanged.bind(this);
        this.proceedAnswer = this.proceedAnswer.bind(this);
        this.detectEnterAndProceedAnswer = this.detectEnterAndProceedAnswer.bind(this);
    }

    public render() {

        const randomRight: string = this.props.wordEntry ? this.props.wordEntry.right.join(", ") : "-- none --";

        return (
            <div className="training-container">
                <button onClick={this.props.clickNewRoundButtonHandler}>New round</button>
                <div className="card-container">
                    <div className="title">Card</div>
                    <p className="simple-synonym">{randomRight}</p>
                    <div className="answer">
                        <input
                            type="text"
                            onChange={this.handleAnswerWasChanged}
                            onKeyPress={this.detectEnterAndProceedAnswer}
                            value={this.state.answer.value} />
                    </div>
                    <div className="check-button">
                        <button
                            disabled={typeof this.props.wordEntry === "undefined"}
                            onClick={this.proceedAnswer}
                        >Check</button>
                    </div>
                </div>
                <AnswersLogComponent log={this.props.answersLog} />
            </div>
        );
    }

    private detectEnterAndProceedAnswer(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.key === "Enter") {
            this.proceedAnswer();
        }
    }

    private proceedAnswer(): void {
        if (!this.props.wordEntry || !this.state.answer.value) {
            return;
        }
        const answer: string = this.state.answer.value.trim();

        const randomLeft: string[] = this.props.wordEntry.left;
        const targetEntryId: string = this.props.wordEntry.id;
        const isAnswered: boolean = randomLeft.includes(answer);

        // TODO: add effects then waiter and then proceed.
        this.props.clickCheckButtonHandler(targetEntryId, isAnswered, answer);

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
                value,
            },
        }));
    }
}
