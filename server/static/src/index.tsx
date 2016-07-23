import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Events from "./events.tsx";

import { MainPage } from "./components/mainpage";
import { MoveList } from "./components/movelist";
import { MoveDetail } from "./components/movedetail";

Events.init();

ReactDOM.render(
    <MainPage />, document.getElementById("main")
);

