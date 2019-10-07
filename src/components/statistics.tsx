import * as React from "react";
import { IWordEntry } from "../types/i-word-entry";

interface IStatisticsComponentProps {
    wordEntries?: IWordEntry[];
}

export class StatisticsComponent extends React.Component<IStatisticsComponentProps> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        const activeWordEntries = this.props.wordEntries ? this.props.wordEntries.filter((ent) => !ent.isIgnored) : [];
        const wordsNumber: number = activeWordEntries.length;
        const checkedWordsNum: number = activeWordEntries.filter((ent) => ent.isChecked).length;
        const answeredWordsNum: number = activeWordEntries.filter((ent) => ent.isAnswered).length;
        const successRate: number = checkedWordsNum === 0 ? 0 : answeredWordsNum / checkedWordsNum * 100;

        return (
            <div className="statistics-container">
                <div>loaded words: {wordsNumber}</div>
                <div>checked words: {checkedWordsNum}</div>
                <div>answered words: {answeredWordsNum}</div>
                <div>success rate: {successRate}%</div>
            </div>
        );
    }
}
