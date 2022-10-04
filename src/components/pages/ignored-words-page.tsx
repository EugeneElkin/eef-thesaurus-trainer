import styled from "styled-components";
import { IWordEntry } from "../../types/i-word-entry";

interface IIgnoredWordsPageComponentProps {
    ignoredWords: IWordEntry[];
}

const Div = styled.div`
& .log-item {
    color: green;
}

& .log-item .left {
    color: rgb(83, 83, 83);
}
`;

export const IgnoredWordsPageComponent = (props: IIgnoredWordsPageComponentProps) => {
    return (
        <Div>
            {
                props.ignoredWords.map((ent, index) =>
                    (<div key={index} className="log-item"><span className="left">{ent.left}</span> -- {ent.right.join(", ")}</div>),
                )
            }
        </Div>
    )
}
