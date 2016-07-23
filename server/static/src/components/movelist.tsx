/// <reference path="./interfaces.ts" />

import * as React from "react";

export class MoveListItem extends React.Component<MoveProps, {}> {
    constructor(props : MoveProps) {
        super(props);
    };

    render() {
        return <li className="h4 moveListItem">{this.props.move.StartDate.toLocaleDateString()} <small>{this.props.move.StartDate.toLocaleTimeString()}</small></li>;
    }
}

export class MoveList extends React.Component<AppProps, IMoveListState> {

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
            // value.StartDate = new Date(value.StartTime);
            return (
                <MoveListItem move={value} key={index} />
            );
        });
        // <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>

        return (
            <ul className="list-unstyled col-lg-4 col-sm-8">
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
            // var typedData : IMove = data as IMove;
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