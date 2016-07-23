import * as React from "react";
import * as ReactDOM from "react-dom";

import { MoveList } from "./components/movelist";

ReactDOM.render(
    <MoveList compiler="TypeScript" framework="React" />,
    document.getElementById("movelist")
);