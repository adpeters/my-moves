/// <reference path="./interfaces.ts" />

import * as React from "react";
import * as Events from "../events.tsx";

export class MoveDetail extends React.Component<{}, IMoveState> {
    constructor(props) {
        super(props);
        this.state = {
            move: null
        };
    };

    componentDidMount() {
        var that = this;
        Events.ee.addListener("moveSelected", function(move: IMove) {
            that.setState({move: move});
        });
    };

    componentWillUnmount() {
        Events.ee.removeListener("moveSelected");
    };

    render() {
        var move = this.state.move;
        if (move === null) {
            return (
                <div>
                    <h4>Please select a move.</h4>
                </div>
            );
        } else {
            var divId = "move-" + this.state.move.MoveID;
            return (
                <div id={divId}>
                    <h2>Viewing Move {this.state.move.MoveID}</h2>
                </div>
            );
        }
    };
}