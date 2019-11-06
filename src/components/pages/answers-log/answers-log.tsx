import "./answers-log.css";

import * as React from "react";

import { IAnswerEntry } from "../../../types/i-answer-entry";

export interface IAnswersLogComponentComponentProps {
    log: IAnswerEntry[];
}

export class AnswersLogComponent extends React.Component<IAnswersLogComponentComponentProps> {
    constructor(props: IAnswersLogComponentComponentProps) {
        super(props);
    }

    public render() {
        const log: IAnswerEntry[] = [...this.props.log].reverse();
        return (
            <div className="answers-log-container">
                <div className="caption">Answers Log:</div>
                {
                    log.map((logEntry, index) =>
                        (<div className="answer-log-item" key={index}>
                            <span className={logEntry.isAnswered ? "true" : "false"}>{logEntry.orig} -- {logEntry.answer}</span>
                        </div>),
                    )
                }
            </div>
        );
    }
}
