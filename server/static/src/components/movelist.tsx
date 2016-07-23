import * as React from "react";

export interface AppProps { compiler: string; framework: string; }

export interface MoveProps { moveID: string; }

export interface IMoveListItemState {
  moveID : string
}

export interface IMoveListState {
    data: string[]
}

export class MoveListItem extends React.Component<MoveProps, {}> {
    // public state : IMoveListItemState;

    constructor(props : MoveProps) {
        super(props);
        // this.state = {
        //     moveID: ""
        // };
    };

    render() {
        console.log(this.props);
        return <li>{this.props.moveID}</li>;
    }
}

export class MoveList extends React.Component<AppProps, IMoveListState> {

    public state : IMoveListState;

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        // console.log(this.state);
        // this.state = this.state.bind(this);
        // this.state = Store.getState();
    };

    componentDidMount() {
        this.loadMovesFromServer();
    }

    render() {
        var moveList = this.state.data.map((value: string, index: number, array: string[]) => {
            // console.log(index);
            // console.log(value);
            // console.log(array);
            return (
                <MoveListItem moveID={value["MoveID"]} key={index} />
            );
        });

        return (
            <div>
                <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
                <ul>
                    {moveList}
                </ul>
                <a href="/api/moves">Test Link</a>
            </div>
        );
    };

    loadMovesFromServer() {
        var that = this;
        var request = new XMLHttpRequest();
        request.open('GET', '/api/moves', true);

        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            // Success!
            var data = JSON.parse(request.responseText);
            // console.log(data);
            that.setState({ data: data});
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