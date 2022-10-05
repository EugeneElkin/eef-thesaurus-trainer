import * as React from "react";
import { Fragment, useState } from "react";

import { IAnswerEntry } from "../../types/i-answer-entry";
import { IValueDescriptor } from "../../types/i-value-descriptor";
import { IWordEntry } from "../../types/i-word-entry";
import { AnswersLogComponent } from "../common/answers-log";
import { CardContainer } from "../common/card-container";

export interface ITrainingPageComponentProps {
    answersLog: IAnswerEntry[];
    wordEntry?: IWordEntry;
    clickCheckButtonHandler: (id: string, isAnswered: boolean, answer: string) => void;
    clickNewRoundButtonHandler: () => void;
}

export const TrainingPageComponent = (props: ITrainingPageComponentProps) => {
    const [answer, setAnswer] = useState<IValueDescriptor<string>>({ isValid: true, value: "" });
    const randomRight: string = props.wordEntry ? props.wordEntry.right.join(", ") : "-- none --";
    const umlautSiblingMap = new Map<string, string>([
        ["a", "ä"],
        ["o", "ö"],
        ["u", "ü"],
        ["b", "ß"],
    ]);
    const umlautSiblingKeys = Array.from(umlautSiblingMap).map(([key, value]) => (key));

    const proceedAnswer = (): void => {
        if (!props.wordEntry || !answer.value) {
            return;
        }
        const answ: string = answer.value.trim();
        const randomLeft: string[] = props.wordEntry.left;
        const targetEntryId: string = props.wordEntry.id;
        const isAnswered: boolean = randomLeft.includes(answ);

        // TODO: add effects then waiter and then proceed.
        props.clickCheckButtonHandler(targetEntryId, isAnswered, answ);
        setAnswer({
            isValid: true,
            value: "",
        });
    };

    const defineAction = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.altKey && umlautSiblingKeys.includes(event.key)) {
            event.stopPropagation();
            event.preventDefault();
            const umlaut = umlautSiblingMap.get(event.key);
            setAnswer({
                isValid: true,
                value: `${answer.value}${umlaut}`,
            });
        }

        if (event.key === "Enter") {
            proceedAnswer();
        }
    };

    const handleAnswerWasChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value: string = event.currentTarget.value;
        setAnswer({
            isValid: true,
            value,
        });
    };

    return (
        <Fragment>
            <button onClick={props.clickNewRoundButtonHandler}>New round</button>
            <CardContainer>
                <div className="title">Card</div>
                <p className="simple-synonym">{randomRight}</p>
                <div className="answer">
                    <input
                        type="text"
                        disabled={typeof props.wordEntry === "undefined"}
                        onChange={(e) => handleAnswerWasChanged(e)}
                        onKeyDown={(e) => defineAction(e)}
                        value={answer.value} />
                </div>
                <div className="check-button">
                    <button
                        disabled={typeof props.wordEntry === "undefined"}
                        onClick={(e) => proceedAnswer()}
                    >Check</button>
                </div>
            </CardContainer>
            <AnswersLogComponent log={props.answersLog} />
        </Fragment>
    );
}

