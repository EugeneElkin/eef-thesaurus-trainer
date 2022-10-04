import styled from "styled-components";
import { IWordEntry } from "../types/i-word-entry";

interface IStatisticsComponentProps {
    wordEntries?: IWordEntry[];
}

const Div = styled.div`
margin: 0 20px 0 50px;
`;

export const StatisticsComponent = (props: IStatisticsComponentProps) => {
    const activeWordEntries = props.wordEntries ? props.wordEntries.filter((ent) => !ent.isIgnored) : [];
    const wordsNumber: number = activeWordEntries.length;
    const checkedWordsNum: number = activeWordEntries.filter((ent) => ent.isChecked).length;
    const answeredWordsNum: number = activeWordEntries.filter((ent) => ent.isAnswered).length;
    const successRate: number = checkedWordsNum === 0 ? 0 : answeredWordsNum / checkedWordsNum * 100;

    return (
        <Div>
            <div>loaded words: {wordsNumber}</div>
            <div>checked words: {checkedWordsNum}</div>
            <div>answered words: {answeredWordsNum}</div>
            <div>success rate: {successRate}%</div>
        </Div>
    );
};
