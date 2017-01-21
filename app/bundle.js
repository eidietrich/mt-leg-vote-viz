/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	// var json1 = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/60708/legislators.json',
	//     out_mini_house = $('#minimap_house'),
	//     out_mini_senate = $('#minimap_senate');

	// var json = './../data/test.json';

	// $.getJSON(json,function(data){
	//   var output_house = "",
	//       output_senate = "";
	//   $.each(data.legislators, function(i){
	//     if (data.legislators[i].House == "HD") {
	//       output_house += "<div class='"+data.legislators[i].PartyAbbrev+"'>"+data.legislators[i].District+"</div>"
	//     }
	//   });
	//   $.each(data.legislators, function(i){
	//     if (data.legislators[i].House == "SD") {
	//       output_senate += "<div class='"+data.legislators[i].PartyAbbrev+"'>"+data.legislators[i].District+"</div>"
	//     }
	//   });
	//   out_mini_house.html(output_house);
	//   out_mini_senate.html(output_senate);
	// });

	document.write('hello app');
	console.log('hello app');

/***/ }
/******/ ]);