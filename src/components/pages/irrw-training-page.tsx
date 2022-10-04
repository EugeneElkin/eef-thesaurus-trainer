import * as React from "react";
import { IValueDescriptor } from "../../types/i-value-descriptor";
import { IWordEntry } from "../../types/i-word-entry";
import { IAnswerEntry } from "../../types/i-answer-entry";
import { AnswersLogComponent } from "../common/answers-log";

export interface IIrregularWordsTrainingPageComponentProps {
    answersLog: IAnswerEntry[];
    wordEntry?: IWordEntry;
    clickCheckButtonHandler: (id: string, isAnswered: boolean, answer: string) => void;
}

interface IIrregularWordsTrainingPageComponentState {
    answer1: IValueDescriptor<string>;
    answer2: IValueDescriptor<string>;
}

export class IrregularWordsTrainingPageComponent
    extends React.Component<IIrregularWordsTrainingPageComponentProps, IIrregularWordsTrainingPageComponentState> {

    constructor(props: IIrregularWordsTrainingPageComponentProps) {
        super(props);

        this.state = {
            answer1: {
                isValid: true,
                value: "",
            },
            answer2: {
                isValid: true,
                value: "",
            },
        };

        this.handleAnswer1WasChanged = this.handleAnswer1WasChanged.bind(this);
        this.handleAnswer2WasChanged = this.handleAnswer2WasChanged.bind(this);
        this.proceedAnswer = this.proceedAnswer.bind(this);
        this.detectEnterAndProceedAnswer = this.detectEnterAndProceedAnswer.bind(this);
    }
    public render() {

        const firstForm: string = this.props.wordEntry ? this.props.wordEntry.left[0] : "-- none --";

        return (
            <div className="irregular-words-training-container">
                <div className="card-container">
                    <div className="title">Card</div>
                    <p className="simple-synonym">{firstForm}</p>
                    <div className="answer">
                        <input
                            type="text"
                            onChange={this.handleAnswer1WasChanged}
                            onKeyPress={this.detectEnterAndProceedAnswer}
                            value={this.state.answer1.value} />
                    </div>
                    <div className="answer">
                        <input
                            type="text"
                            onChange={this.handleAnswer2WasChanged}
                            onKeyPress={this.detectEnterAndProceedAnswer}
                            value={this.state.answer2.value} />
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

    private handleAnswer1WasChanged(event: React.ChangeEvent<HTMLInputElement>): void {
        const value: string = event.target.value;

        this.setState((state, props) => {
            return {
                answer1: {
                    isValid: true,
                    value,
                },
            };
        });
    }

    private handleAnswer2WasChanged(event: React.ChangeEvent<HTMLInputElement>): void {
        const value: string = event.target.value;

        this.setState((state, props) => {
            return {
                answer2: {
                    isValid: true,
                    value,
                },
            };
        });
    }

    private proceedAnswer(): void {
        if (!this.props.wordEntry || !this.state.answer1.value || !this.state.answer2.value) {
            return;
        }
        const answer1: string = this.state.answer1.value.trim();
        const answer2: string = this.state.answer2.value.trim();

        const verbForms: string[] = this.props.wordEntry.right;
        const targetEntryId: string = this.props.wordEntry.id;
        const isAnswered: boolean = verbForms[0] === answer1 && verbForms[1] === answer2;

        // TODO: add effects then waiter and then proceed.
        this.props.clickCheckButtonHandler(targetEntryId, isAnswered, `${answer1}, ${answer2} (${verbForms.join(",")})`);

        this.setState((state, props) => ({
            answer1: {
                isValid: true,
                value: "",
            },
            answer2: {
                isValid: true,
                value: "",
            },
        }));
    }
}