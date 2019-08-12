import * as React from "react";
import { IWordEntry } from "../../types/i-word-entry";

interface IIgnoredWordsPageComponentProps {
    ignoredWords: IWordEntry[]
}

export class IgnoredWordsPageComponent extends React.Component<IIgnoredWordsPageComponentProps> {

    public render() {
        return (
            <div className="ignored-words-container">
                {
                    this.props.ignoredWords.map(ent =>
                        (<div className="log-item"><span className="left">{ent.left}</span> -- {ent.right.join(", ")}</div>)
                    )
                }
            </div>
        );
    }
}