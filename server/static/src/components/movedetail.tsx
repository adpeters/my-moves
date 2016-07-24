/// <reference path="./interfaces.ts" />

import * as React from "react";
import * as Events from "../events.tsx";
import * as Utils from "../utils.tsx";

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
            var move = this.state.move;
            return (
                <div id={divId}>
                    <h2>Viewing Move {this.state.move.MoveID}</h2>
                    <table>
                        <tbody>
                            <tr><th>Start Date/Time</th><td>{move.StartDate.toLocaleDateString()} <small>{move.StartDate.toLocaleTimeString()}</small></td></tr>
                            <tr><th>MoveID</th><td>{move.MoveID}</td></tr>
                            <tr><th>Activity</th><td>{move.Activity}</td></tr>
                            <tr><th>Duration</th><td>{Utils.getTimeString(move.Duration)}</td></tr>
                            <tr><th>Distance (miles)</th><td>{(move.Distance).toFixed(2)}</td></tr>
                            <tr><th>Ascent (ft)</th><td>{move.Ascent} <small>{Utils.getTimeString(move.TimeAscent)}</small></td></tr>
                            <tr><th>Descent (ft)</th><td>{move.Descent} <small>{Utils.getTimeString(move.TimeDescent)}</small></td></tr>
                            <tr><th>Average Speed (mph)</th><td>{(move.SpeedAvg).toFixed(2)}</td></tr>
                            <tr><th>Max Speed (mph)</th><td>{(move.SpeedMax).toFixed(2)}</td></tr>
                            <tr><th>Cadence</th><td>{move.CadenceAvg}</td></tr>
                            <tr><th>Calories</th><td>{move.Calories}</td></tr>
                            <tr><th>Average HR</th><td>{move.HrAvg}</td></tr>
                            <tr><th>Max HR</th><td>{move.HrMax}</td></tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    };
}