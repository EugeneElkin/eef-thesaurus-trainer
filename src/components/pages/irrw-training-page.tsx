import { IValueDescriptor } from "../../types/i-value-descriptor";
import { IWordEntry } from "../../types/i-word-entry";
import { IAnswerEntry } from "../../types/i-answer-entry";
import { AnswersLogComponent } from "../common/answers-log";
import { Fragment, useState } from "react";
import { CardContainer } from "../common/card-container";

export interface IIrregularWordsTrainingPageComponentProps {
    answersLog: IAnswerEntry[];
    wordEntry?: IWordEntry;
    clickCheckButtonHandler: (id: string, isAnswered: boolean, answer: string) => void;
}

export const IrregularWordsTrainingPageComponent = (props: IIrregularWordsTrainingPageComponentProps) => {
    const [answer1, setAnswer1] = useState<IValueDescriptor<string>>({ isValid: true, value: "" });
    const [answer2, setAnswer2] = useState<IValueDescriptor<string>>({ isValid: true, value: "" });
    const firstForm: string = props.wordEntry ? props.wordEntry.left[0] : "-- none --";

    const proceedAnswer = (): void => {
        if (!props.wordEntry || !answer1.value || !answer2.value) {
            return;
        }
        const answ1: string = answer1.value.trim();
        const answ2: string = answer2.value.trim();
        const verbForms: string[] = props.wordEntry.right;
        const targetEntryId: string = props.wordEntry.id;
        const isAnswered: boolean = verbForms[0] === answ1 && verbForms[1] === answ2;

        // TODO: add effects then waiter and then proceed.
        props.clickCheckButtonHandler(targetEntryId, isAnswered, `${answ1}, ${answ2} (${verbForms.join(",")})`);
        setAnswer1({
            isValid: true,
            value: "",
        });
        setAnswer2({
            isValid: true,
            value: "",
        });
    };

    const detectEnterAndProceedAnswer = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Enter") {
            proceedAnswer();
        }
    };

    const handleAnswer1WasChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value: string = event.target.value;
        setAnswer1({
            isValid: true,
            value,
        });
    };

    const handleAnswer2WasChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value: string = event.target.value;
        setAnswer2({
            isValid: true,
            value,
        });
    };

    return (
        <Fragment>
            <CardContainer>
                <div className="title">Card</div>
                <p className="simple-synonym">{firstForm}</p>
                <div className="answer">
                    <input
                        type="text"
                        onChange={(e) => handleAnswer1WasChanged(e)}
                        onKeyPress={(e) => detectEnterAndProceedAnswer(e)}
                        value={answer1.value} />
                </div>
                <div className="answer">
                    <input
                        type="text"
                        onChange={(e) => handleAnswer2WasChanged(e)}
                        onKeyPress={(e) => detectEnterAndProceedAnswer(e)}
                        value={answer2.value} />
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
