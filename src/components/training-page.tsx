import * as React from "react";

import { IValueDescriptor } from "../types/i-value-descriptor";
import { WordEntry } from "../types/word-entry";

export interface ITrainingPageComponentProps {
    wordEntries?: WordEntry[];
    clickCheckButtonHandler: (id?: string, answer?: string) => void;
    setCurrentQuestion?: () => void;
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
            },
        };

        this.handleAnswerWasChanged = this.handleAnswerWasChanged.bind(this);
    }

    public componentDidMount() {
        
    }

    public render() {
        const uncheckedEntries: WordEntry[] = this.props.wordEntries
            ? this.props.wordEntries.filter(ent => !ent.isChecked)
            : [];
        const unckeckedNum: number = uncheckedEntries.length;

        const randomIndex: number = unckeckedNum > 0 ? Math.floor(Math.random() * (unckeckedNum)) : -1;
        const targetEntry: WordEntry | undefined = randomIndex !== -1 ? uncheckedEntries[randomIndex] : undefined;

        const targetEntryId: string | undefined = targetEntry ? targetEntry.id : undefined;
        const ramdomRight: string = targetEntry ? targetEntry.right.join(", ") : "-- none --";

        return (
            <div className="training-container">
                <div className="card-container">
                    <div className="title">Card</div>
                    <p className="simple-synonym">{ramdomRight}</p>
                    <div className="answer">
                        <input type="text" onChange={this.handleAnswerWasChanged} />
                    </div>
                    <div className="check-button">
                        <button
                            disabled={typeof targetEntry === 'undefined'}
                            onClick={() => { this.props.clickCheckButtonHandler(targetEntryId, this.state.answer.value) }}
                        >Check</button>
                    </div>
                </div>
            </div>
        );
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