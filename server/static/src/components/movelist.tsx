import * as React from "react";

export interface AppProps { compiler: string; framework: string; }

export interface MoveProps { move: IMove; }

export interface IMoveListState {
    data: IMove[]
}

export interface IMove {
    ActivityID: string;
    AltitudeHigh: number;
    AltitudeLow: number;
    Ascent: number;
    CadenceAvg: number;
    CadenceMax: number;
    Calories: number;
    Descent: number;
    Distance: number;
    Duration: number;
    HrAvg: number;
    HrMax: number;
    HrMin: number;
    HrZone: number;
    Latitude: string;
    Longitude: string;
    MoveID: string;
    Notes: string;
    SpeedAvg: number;
    SpeedMax: number;
    StartTime: number;
    StartDate: Date;
    TempAvg: number;
    TempMax: number;
    TempMin: number;
    TimeAscent: number;
    TimeDescent: number;
    TimeFlat: number;
}

export class MoveListItem extends React.Component<MoveProps, {}> {
    constructor(props : MoveProps) {
        super(props);
    };

    render() {
        return <li>{this.props.move.MoveID}</li>;
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
            // console.log(value);
            return (
                <MoveListItem move={value} key={index} />
            );
        });
        // <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>

        return (
            <div>
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
            var data = JSON.parse(request.responseText) as IMove[];
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