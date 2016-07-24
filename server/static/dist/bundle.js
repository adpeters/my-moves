/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var Events = __webpack_require__(3);
	var mainpage_1 = __webpack_require__(5);
	Events.init();
	ReactDOM.render(React.createElement(mainpage_1.MainPage, null), document.getElementById("main"));


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var EventEmitter = __webpack_require__(4);
	function init() {
	    console.log('initializing EventEmitter');
	    exports.ee = new EventEmitter();
	}
	exports.init = init;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = EventEmitter;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var movelist_1 = __webpack_require__(6);
	var movedetail_1 = __webpack_require__(7);
	var MainPage = (function (_super) {
	    __extends(MainPage, _super);
	    function MainPage(props) {
	        _super.call(this, props);
	    }
	    ;
	    MainPage.prototype.render = function () {
	        return (React.createElement("div", {className: 'row'}, React.createElement("div", {id: 'movelist', className: 'col-lg-4 col-sm-8'}, React.createElement(movelist_1.MoveList, null)), React.createElement("div", {id: 'movedetail', className: 'col-lg-8 col-sm-8'}, React.createElement(movedetail_1.MoveDetail, null))));
	    };
	    ;
	    return MainPage;
	}(React.Component));
	exports.MainPage = MainPage;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="./interfaces.ts" />
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var Events = __webpack_require__(3);
	var MoveListItem = (function (_super) {
	    __extends(MoveListItem, _super);
	    function MoveListItem(props) {
	        _super.call(this, props);
	        this.handleClick = this.handleClick.bind(this);
	    }
	    ;
	    MoveListItem.prototype.handleClick = function () {
	        this.props.setSelected(this.props.move);
	    };
	    MoveListItem.prototype.render = function () {
	        var cls = "h4 moveListItem";
	        cls += this.props.isSelected ? " selected" : "";
	        return React.createElement("li", {className: cls, onClick: this.handleClick}, this.props.move.StartDate.toLocaleDateString(), " ", React.createElement("small", null, this.props.move.StartDate.toLocaleTimeString()), React.createElement("small", {style: { "float": "right" }}, this.props.move.Distance.toFixed(2), " Mile ", this.props.move.Activity));
	    };
	    return MoveListItem;
	}(React.Component));
	exports.MoveListItem = MoveListItem;
	var MoveList = (function (_super) {
	    __extends(MoveList, _super);
	    function MoveList(props) {
	        _super.call(this, props);
	        this.state = {
	            data: [],
	            selected: null
	        };
	        this.setSelected = this.setSelected.bind(this);
	    }
	    ;
	    MoveList.prototype.setSelected = function (selectedMove) {
	        var selMove = this.state.selected === selectedMove ? null : selectedMove;
	        this.setState({ data: this.state.data, selected: selMove });
	        Events.ee.emitEvent('moveSelected', [selMove]);
	    };
	    MoveList.prototype.componentDidMount = function () {
	        this.loadMovesFromServer();
	    };
	    MoveList.prototype.render = function () {
	        var _this = this;
	        var curSelected = this.state.selected;
	        var moveList = this.state.data.map(function (value, index, array) {
	            var selected = value === curSelected;
	            return (React.createElement(MoveListItem, {move: value, isSelected: selected, setSelected: _this.setSelected, key: index}));
	        });
	        return (React.createElement("ul", {className: "list-unstyled"}, moveList));
	    };
	    ;
	    MoveList.prototype.processMove = function (move) {
	        move.StartDate = new Date(move.StartTime);
	        if (move.ActivityID == "3")
	            move.Activity = "Run";
	        else if (move.ActivityID == "4")
	            move.Activity = "Bike";
	        else if (move.ActivityID == "11")
	            move.Activity = "Hike";
	        else
	            move.Activity = "Unknown";
	        move.Distance = move.Distance / 1609.34;
	        move.SpeedAvg = move.SpeedAvg * 2.23694;
	        move.SpeedMax = move.SpeedMax * 2.23694;
	    };
	    MoveList.prototype.loadMovesFromServer = function () {
	        var that = this;
	        var request = new XMLHttpRequest();
	        request.open('GET', '/api/moves', true);
	        request.onload = function () {
	            if (request.status >= 200 && request.status < 400) {
	                // Success!
	                var data = JSON.parse(request.responseText);
	                for (var d in data) {
	                    that.processMove(data[d]);
	                }
	                data.sort(function (a, b) {
	                    return a.StartTime - b.StartTime;
	                });
	                that.setState({ data: data, selected: null });
	            }
	            else {
	                console.log('Error getting moves!');
	            }
	        };
	        request.onerror = function () {
	            console.log('connection error');
	        };
	        request.send();
	    };
	    ;
	    return MoveList;
	}(React.Component));
	exports.MoveList = MoveList;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="./interfaces.ts" />
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var Events = __webpack_require__(3);
	var Utils = __webpack_require__(8);
	var MoveDetail = (function (_super) {
	    __extends(MoveDetail, _super);
	    function MoveDetail(props) {
	        _super.call(this, props);
	        this.state = {
	            move: null
	        };
	    }
	    ;
	    MoveDetail.prototype.componentDidMount = function () {
	        var that = this;
	        Events.ee.addListener("moveSelected", function (move) {
	            that.setState({ move: move });
	        });
	    };
	    ;
	    MoveDetail.prototype.componentWillUnmount = function () {
	        Events.ee.removeListener("moveSelected");
	    };
	    ;
	    MoveDetail.prototype.render = function () {
	        var move = this.state.move;
	        if (move === null) {
	            return (React.createElement("div", null, React.createElement("h4", null, "Please select a move.")));
	        }
	        else {
	            var divId = "move-" + this.state.move.MoveID;
	            var move = this.state.move;
	            return (React.createElement("div", {id: divId}, React.createElement("h2", null, "Viewing Move ", this.state.move.MoveID), React.createElement("table", null, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", null, "Start Date/Time"), React.createElement("td", null, move.StartDate.toLocaleDateString(), " ", React.createElement("small", null, move.StartDate.toLocaleTimeString()))), React.createElement("tr", null, React.createElement("th", null, "MoveID"), React.createElement("td", null, move.MoveID)), React.createElement("tr", null, React.createElement("th", null, "Activity"), React.createElement("td", null, move.Activity)), React.createElement("tr", null, React.createElement("th", null, "Duration"), React.createElement("td", null, Utils.getTimeString(move.Duration))), React.createElement("tr", null, React.createElement("th", null, "Distance (miles)"), React.createElement("td", null, (move.Distance).toFixed(2))), React.createElement("tr", null, React.createElement("th", null, "Ascent (ft)"), React.createElement("td", null, move.Ascent, " ", React.createElement("small", null, Utils.getTimeString(move.TimeAscent)))), React.createElement("tr", null, React.createElement("th", null, "Descent (ft)"), React.createElement("td", null, move.Descent, " ", React.createElement("small", null, Utils.getTimeString(move.TimeDescent)))), React.createElement("tr", null, React.createElement("th", null, "Average Speed (mph)"), React.createElement("td", null, (move.SpeedAvg).toFixed(2))), React.createElement("tr", null, React.createElement("th", null, "Max Speed (mph)"), React.createElement("td", null, (move.SpeedMax).toFixed(2))), React.createElement("tr", null, React.createElement("th", null, "Cadence"), React.createElement("td", null, move.CadenceAvg)), React.createElement("tr", null, React.createElement("th", null, "Calories"), React.createElement("td", null, move.Calories)), React.createElement("tr", null, React.createElement("th", null, "Average HR"), React.createElement("td", null, move.HrAvg)), React.createElement("tr", null, React.createElement("th", null, "Max HR"), React.createElement("td", null, move.HrMax))))));
	        }
	    };
	    ;
	    return MoveDetail;
	}(React.Component));
	exports.MoveDetail = MoveDetail;


/***/ },
/* 8 */
/***/ function(module, exports) {

	//utils.tsx
	"use strict";
	//returns duration in form H:m:s from milliseconds integer
	function getTimeString(time) {
	    var durationStr = Math.floor(time / 1000 / 60 / 60) + ":";
	    durationStr += Math.floor(time / 1000 / 60 % 60) + ":";
	    durationStr += Math.floor(time / 1000 % 60);
	    return durationStr;
	}
	exports.getTimeString = getTimeString;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map