/// <reference path="./interfaces.ts" />

import * as React from "react";
import * as Events from "../events.tsx";

export class MoveListItem extends React.Component<IMoveListItemProps, {}> {
    constructor(props : IMoveListItemProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick() {
        this.props.setSelected(this.props.move);
    }

    render() {
        var cls = "h4 moveListItem";
        cls += this.props.isSelected ? " selected" : "";
        return <li className={cls} onClick={this.handleClick}>{this.props.move.StartDate.toLocaleDateString()} <small>{this.props.move.StartDate.toLocaleTimeString()}</small>
        <small style={{"float": "right"}}>{this.props.move.Distance.toFixed(2)} Mile {this.props.move.Activity}</small></li>;
    }
}

export class MoveList extends React.Component<{}, IMoveListState> {

    public state : IMoveListState;

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selected: null
        };
        this.setSelected = this.setSelected.bind(this);
    };

    setSelected(selectedMove: IMove) {
        var selMove = this.state.selected === selectedMove ? null : selectedMove;
        this.setState({ data: this.state.data, selected: selMove });
        Events.ee.emitEvent('moveSelected', [selMove]);
    }

    componentDidMount() {
        this.loadMovesFromServer();
    }

    render() {
        var curSelected = this.state.selected;
        var moveList = this.state.data.map((value: IMove, index: number, array: IMove[]) => {
            var selected = value === curSelected;
            return (
                <MoveListItem move={value} isSelected={selected} setSelected={this.setSelected} key={index} />
            );
        });

        return (
            <ul className="list-unstyled">
                {moveList}
            </ul>
        );
    };

    processMove(move: IMove) {
        move.StartDate = new Date(move.StartTime);
        if (move.ActivityID == "3") move.Activity = "Run";
        else if (move.ActivityID == "4") move.Activity = "Bike";
        else if (move.ActivityID == "11") move.Activity = "Hike";
        else move.Activity = "Unknown";

        move.Distance = move.Distance/1609.34;
        move.SpeedAvg = move.SpeedAvg*2.23694;
        move.SpeedMax = move.SpeedMax*2.23694;
    }

    loadMovesFromServer() {
        var that = this;
        var request = new XMLHttpRequest();
        request.open('GET', '/api/moves', true);

        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            // Success!
            var data = JSON.parse(request.responseText) as IMove[];
            for (var d in data) {
                that.processMove(data[d]);
            }
            data.sort(function(a,b) {
                return b.StartTime - a.StartTime;
            });
            that.setState({ data: data, selected: null });
          } else {
              console.log('Error getting moves!');
              // We reached our target server, but it returned an error
          }
        };

        request.onerror = function() {
            console.log('connection error');
        };

        request.send();
    };
}