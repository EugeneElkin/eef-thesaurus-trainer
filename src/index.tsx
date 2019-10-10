import * as React from "react";
import * as ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { ConnectedPageComponent } from "./components/page";
import "./index.css";
import { rootReducer } from "./state/reducers";

export const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <ConnectedPageComponent store={store} />,
    document.getElementById("root"),
);
