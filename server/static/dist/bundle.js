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
	var movelist_1 = __webpack_require__(3);
	ReactDOM.render(React.createElement(movelist_1.MoveList, {compiler: "TypeScript", framework: "React"}), document.getElementById("movelist"));


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
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var MoveListItem = (function (_super) {
	    __extends(MoveListItem, _super);
	    function MoveListItem(props) {
	        _super.call(this, props);
	    }
	    ;
	    MoveListItem.prototype.render = function () {
	        return React.createElement("li", null, this.props.move.MoveID);
	    };
	    return MoveListItem;
	}(React.Component));
	exports.MoveListItem = MoveListItem;
	var MoveList = (function (_super) {
	    __extends(MoveList, _super);
	    function MoveList(props) {
	        _super.call(this, props);
	        this.state = {
	            data: []
	        };
	    }
	    ;
	    MoveList.prototype.componentDidMount = function () {
	        this.loadMovesFromServer();
	    };
	    MoveList.prototype.render = function () {
	        var moveList = this.state.data.map(function (value, index, array) {
	            // console.log(value);
	            return (React.createElement(MoveListItem, {move: value, key: index}));
	        });
	        // <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
	        return (React.createElement("div", null, React.createElement("ul", null, moveList), React.createElement("a", {href: "/api/moves"}, "Test Link")));
	    };
	    ;
	    MoveList.prototype.loadMovesFromServer = function () {
	        var that = this;
	        var request = new XMLHttpRequest();
	        request.open('GET', '/api/moves', true);
	        request.onload = function () {
	            if (request.status >= 200 && request.status < 400) {
	                // Success!
	                var data = JSON.parse(request.responseText);
	                // var typedData : IMove = data as IMove;
	                that.setState({ data: data });
	            }
	            else {
	                console.log('Error getting moves!');
	            }
	        };
	        request.onerror = function () {
	            console.log('connection error');
	            // There was a connection error of some sort
	        };
	        request.send();
	    };
	    ;
	    return MoveList;
	}(React.Component));
	exports.MoveList = MoveList;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map