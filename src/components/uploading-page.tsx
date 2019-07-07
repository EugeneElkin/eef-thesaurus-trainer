import * as React from "react";

import { IValueDescriptor } from "../types/i-value-descriptor";

interface IUploadingPageComponentProps {
    clickUploadButtonHandler: (words?: string) => void;
}

interface IUploadingPageComponentState {
    rawText: IValueDescriptor<string>
}

export class UploadingPageComponent extends React.Component<IUploadingPageComponentProps, IUploadingPageComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            rawText: {
                isValid: true,
            },
        };

        this.handleRawTextWasChanged = this.handleRawTextWasChanged.bind(this);
    }

    public render() {
        return (
            <div className="uploading-container">
                <div>Put word constructions in the following format:</div>
                <div>complex synonym 1[, complex synonym 2][, ...] -- simple synonym 1[, simple synonym 2][, ...]</div>
                <div>
                    <textarea
                        value={this.state.rawText.value}
                        onChange={this.handleRawTextWasChanged}>
                    </textarea>
                </div>
                <div>
                    <button onClick={() => this.props.clickUploadButtonHandler(this.state.rawText.value)}>Upload</button>
                </div>
            </div>
        );
    }

    private handleRawTextWasChanged(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        const value: string = event.currentTarget.value;

        this.setState((state, props) => ({
            rawText: {
                isValid: true,
                value: value,
            },
        }));
    }
}