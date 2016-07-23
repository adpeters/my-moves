import * as React from "react";

import { MoveList } from "./movelist";
import { MoveDetail } from "./movedetail";

export class MainPage extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className='row'>
                <div id='movelist' className='col-lg-4 col-sm-8'>
                    <MoveList />
                </div>
                <div id='movedetail' className='col-lg-8 col-sm-8'>
                    <MoveDetail />
                </div>
            </div>
        );
    };
}