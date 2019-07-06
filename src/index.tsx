import "./index.css";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";

import { ConnectedPageComponent } from "./components/page";
import { rootReducer } from "./state/reducers";

export const store = createStore(rootReducer);

ReactDOM.render(
    <ConnectedPageComponent store={store} />,
    document.getElementById("root"),
);
