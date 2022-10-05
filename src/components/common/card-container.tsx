import styled from "styled-components";

export interface ICardContainerProps {
    children: React.ReactNode
}

const Div = styled.div`
border: 1px solid black;
width: 300px;
height: 200px;
box-shadow: 3px 3px 2px gray;
box-sizing: content-box;
margin: 10px auto;


& .title {
    padding: 5px 10px;
    background-color: #C1CAD6;
    color: #474B24;
}
& .simple-synonym {
    padding: 5px 10px;
    text-align: center;
}
& .answer {
    padding: 5px 10px;
    text-align: center;
}

& .check-button {
    padding: 5px 10px;
    text-align: right;
}
`;

export const CardContainer = (props: ICardContainerProps) => {
    return (
        <Div>{props.children}</Div>
    );
}