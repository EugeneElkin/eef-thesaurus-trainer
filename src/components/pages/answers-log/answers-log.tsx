import { IAnswerEntry } from "../../../types/i-answer-entry";
import styled from 'styled-components';

export interface IAnswersLogComponentComponentProps {
    log: IAnswerEntry[];
}

const Div = styled.div`
& .caption {
    color: gray;
}
& .log-item span.true {
    color: green;
}
& .log-item span.false {
    color: red;
}
`;

export const AnswersLogComponent = (props: IAnswersLogComponentComponentProps) => {
    const log: IAnswerEntry[] = [...props.log].reverse();

    return (
        <Div>
            <div className="caption">Answers Log:</div>
            {
                log.map((logEntry, index) =>
                (<div className="log-item" key={index}>
                    <span className={logEntry.isAnswered ? "true" : "false"}>{logEntry.orig} -- {logEntry.answer}</span>
                </div>),
                )
            }
        </Div>
    );
};
