import * as React from "react";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { ConnectedPageComponent } from "./components/page";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { rootReducer } from "./state/reducers";
import { createRoot } from 'react-dom/client';

export const store = createStore(rootReducer, applyMiddleware(thunk));

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <ConnectedPageComponent store={store} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
