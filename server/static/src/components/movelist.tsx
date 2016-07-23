/// <reference path="./interfaces.ts" />

import * as React from "react";
import * as Events from "../events.tsx";

export class MoveListItem extends React.Component<IMoveProps, { selected: boolean }> {
    constructor(props : IMoveProps) {
        super(props);
        this.state = {
            selected: false
        };
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick() {
        console.log('clicked ' + this.props.move.MoveID);
        if (!this.state.selected) { 
            Events.ee.emitEvent('moveSelected', [this.props.move]);
        } else {
            Events.ee.emitEvent('moveSelected', [null]);
        }
        this.setState({selected: !this.state.selected});
    }

    render() {
        var cls = "h4 moveListItem";
        cls += this.state.selected ? " selected" : "";
        return <li className={cls} onClick={this.handleClick}>{this.props.move.StartDate.toLocaleDateString()} <small>{this.props.move.StartDate.toLocaleTimeString()}</small></li>;
    }
}

export class MoveList extends React.Component<{}, IMoveListState> {

    public state : IMoveListState;

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    };

    componentDidMount() {
        this.loadMovesFromServer();
    }

    render() {
        var moveList = this.state.data.map((value: IMove, index: number, array: IMove[]) => {
            return (
                <MoveListItem move={value} key={index} />
            );
        });

        return (
            <ul className="list-unstyled">
                {moveList}
            </ul>
        );
    };

    loadMovesFromServer() {
        var that = this;
        var request = new XMLHttpRequest();
        request.open('GET', '/api/moves', true);

        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            // Success!
            var data = JSON.parse(request.responseText) as IMove[];
            for (var d in data) {
                data[d].StartDate = new Date(data[d].StartTime);
            }
            that.setState({ data: data });
          } else {
              console.log('Error getting moves!');
              // console.error(this.props.url, status, err.toString());
            // We reached our target server, but it returned an error

          }
        };

        request.onerror = function() {
            console.log('connection error');
          // There was a connection error of some sort
        };

        request.send();
    };
}