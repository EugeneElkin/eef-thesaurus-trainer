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

        const wordsNumber: number = this.props.wordEntries ? this.props.wordEntries.length : 0;
        const checkedWordsNum: number = this.props.wordEntries
            ? this.props.wordEntries.filter(ent => ent.isChecked).length
            : 0;
        const answeredWordsNum: number = this.props.wordEntries
            ? this.props.wordEntries.filter(ent => ent.isAnswered).length
            : 0;
        const successRate: number = checkedWordsNum === 0
            ? 0
            : answeredWordsNum / checkedWordsNum * 100;

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
