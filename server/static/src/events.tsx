import * as EventEmitter from "wolfy87-eventemitter";

export var ee;

export function init() {
    console.log('initializing EventEmitter');
    ee = new EventEmitter();
}