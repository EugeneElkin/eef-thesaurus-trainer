import styled from 'styled-components';
import { useState } from "react";
import { IValueDescriptor } from "../../types/i-value-descriptor";

interface IUploadingPageComponentProps {
    clickUploadButtonHandler: (words?: string) => void;
}

const Div = styled.div`
& textarea {
    min-width: 300px;
    width: 500px;
    max-width: 800px;
    min-height: 100px;
    height: 300px;
    max-height: 400px;
    margin: 5px 0;
}
& p {
    margin: 3px 0;
}
& p.warn {
    color: #ac7e01;
}
`;

export const UploadingPageComponent = (props: IUploadingPageComponentProps) => {
    const [rawText, setRawText] = useState<IValueDescriptor<string>>({ isValid: true });

    const handleRawTextWasChanged = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const value: string = event.currentTarget.value;

        setRawText({
            isValid: true,
            value
        })
    }

    return (
        <Div>
            <p>Put word constructions in the following format:</p>
            <p>complex synonym 1[, complex synonym 2][, ....] -- simple synonym 1[, simple synonym 2][, ....]</p>
            <p className="warn">!!! A word construction that is started with "~" symbol will be ignored</p>
            <div>
                <textarea
                    value={rawText.value}
                    onChange={handleRawTextWasChanged}>
                </textarea>
            </div>
            <div>
                <button onClick={() => props.clickUploadButtonHandler(rawText.value)}>Upload</button>
            </div>
        </Div>
    );
}

