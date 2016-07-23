interface IMoveListItemProps { move: IMove; setSelected: any; isSelected: boolean; }

interface IMoveState { move: IMove; }

interface IMoveListState {
    data: IMove[]
    selected: IMove
}

interface IMove {
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