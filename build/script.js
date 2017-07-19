'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//                          Classes                               :
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

/*==================== Build brain ==========================*/
var BuildBrain = function () {
	function BuildBrain() {
		_classCallCheck(this, BuildBrain);
	}

	_createClass(BuildBrain, null, [{
		key: 'build',
		value: function build() {

			var brainContainer = document.createElement('div');
			brainContainer.className = 'mx-brain';

			var firstChildEl = document.createElement('div');
			brainContainer.appendChild(firstChildEl);

			document.body.appendChild(brainContainer);
		}
	}, {
		key: 'memory',
		value: function memory() {
			window.memoryArray = [];
		}
	}, {
		key: 'toRemember',
		value: function toRemember(pushField, pushEl) {
			var objElem = { field: pushField, id: pushEl };
			memoryArray.push(objElem);
		}
	}, {
		key: 'showLogs',
		value: function showLogs(pushField, pushEl) {

			var brain = document.getElementsByClassName('mx-brain');

			var logWrapper = document.createElement('div');

			var logNameField = document.createElement('span');
			logNameField.className = 'mx-log_name_field';
			logNameField.innerHTML = pushField;

			var logIDElem = document.createElement('span');
			logIDElem.className = 'mx-log_id_elem';
			logIDElem.innerHTML = pushEl;

			memoryArray.filter(function (el) {
				logWrapper.appendChild(logNameField);
				logWrapper.appendChild(logIDElem);

				brain[0].insertBefore(logWrapper, brain[0].firstChild);
			});
		}
	}]);

	return BuildBrain;
}();

/*==================== Build fields ==========================*/


var CreateFields = function () {
	function CreateFields(_id, _width) {
		_classCallCheck(this, CreateFields);

		this._id = _id;
		this._width = _width;
	}

	_createClass(CreateFields, [{
		key: 'createField',
		value: function createField() {
			var field = document.createElement('div');
			field.setAttribute('id', this._id);
			field.setAttribute('class', 'mx-filed');
			field.style.width = this._width;

			document.body.appendChild(field);
		}
	}]);

	return CreateFields;
}();

/*===================== Build cells ==========================*/


var CreateCells = function () {
	function CreateCells(idPrefix, countCells, _field, groupCell, dataKey) {
		_classCallCheck(this, CreateCells);

		this.idPrefix = idPrefix;
		this.countCells = countCells;
		this._field = _field;
		this.groupCell = groupCell;
		this.dataKey = dataKey;
	}

	_createClass(CreateCells, [{
		key: 'createCell',
		value: function createCell(_id) {

			var cells = document.createElement('span');
			cells.setAttribute('id', this.idPrefix + _id);
			cells.setAttribute('class', 'mx-cells ' + this.groupCell);
			cells.setAttribute('data-key', 'false');

			document.getElementById(this._field).appendChild(cells);
		}
	}, {
		key: 'createCells',
		value: function createCells() {
			for (var cC = 0; cC < this.countCells; cC++) {
				this.createCell(cC);
			}
		}
	}]);

	return CreateCells;
}();

/*================= Create field and Append cells in field =====================*/


var CreateOrganism = function () {
	function CreateOrganism(fieldID, fieldWidth, cellsPrefix, countCells, groupCell) {
		_classCallCheck(this, CreateOrganism);

		this.fieldID = fieldID;
		this.fieldWidth = fieldWidth;
		this.cellsPrefix = cellsPrefix;
		this.countCells = countCells;
		this.groupCell = groupCell;
	}

	_createClass(CreateOrganism, [{
		key: 'createOrgan',
		value: function createOrgan() {
			// create field
			var cField = new CreateFields(this.fieldID, this.fieldWidth);
			cField.createField();

			// create cell
			var cCell = new CreateCells(this.cellsPrefix, this.countCells, this.fieldID, this.groupCell);
			cCell.createCells();

			// create controller group cells
			var cContrGroupCells = new CreateControllerGroupCells(this.fieldID);
			cContrGroupCells.createControllerGroupCells();
		}
	}]);

	return CreateOrganism;
}();

/*===================== Controller group cells ======================*/


var CreateControllerGroupCells = function () {
	function CreateControllerGroupCells(_fieldContrBy) {
		_classCallCheck(this, CreateControllerGroupCells);

		this.fieldContrBy = _fieldContrBy;
	}

	_createClass(CreateControllerGroupCells, [{
		key: 'createControllerGroupCells',
		value: function createControllerGroupCells() {
			var fieldContrBy = document.getElementById(this.fieldContrBy);
			var controllerGroupCells = document.createElement('div');
			controllerGroupCells.setAttribute('class', 'mx-controller_group_cells');
			controllerGroupCells.setAttribute('id', 'controller_' + this.fieldContrBy);
			fieldContrBy.insertBefore(controllerGroupCells, this.nextSibling);

			var displayInfo = document.createElement('span');
			displayInfo.setAttribute('class', 'mx-contr_display_info');
			displayInfo.setAttribute('id', 'displayInfo_' + this.fieldContrBy);

			var testText = document.createTextNode('All ok!)');
			displayInfo.appendChild(testText);

			controllerGroupCells.appendChild(displayInfo);
		}
	}]);

	return CreateControllerGroupCells;
}();

/*========================== Destroy and restoration Cell ============================*/


var DestRestCell = function () {
	function DestRestCell(destroyCellID) {
		_classCallCheck(this, DestRestCell);

		this.destroyCellID = destroyCellID;
	}

	_createClass(DestRestCell, [{
		key: 'destroyCell',
		value: function destroyCell() {
			var _destroyCell = document.getElementById(this.destroyCellID);
			var _destroyCellOpacity = _destroyCell.getAttribute('data-opacity');
			if (_destroyCellOpacity > 0) {
				_destroyCell.style.opacity = _destroyCellOpacity;
				_destroyCellOpacity -= 0.10;
				_destroyCell.setAttribute('data-opacity', _destroyCellOpacity);
			} else {
				_destroyCell.setAttribute('data-opacity', '0');
				_destroyCell.style.opacity = 0;

				// attr for restoration cell
				_destroyCell.removeAttribute('data-destroy');
				_destroyCell.setAttribute('data-restoration', 'cellRestoration');
			}
		}
	}, {
		key: 'restorationCell',
		value: function restorationCell() {
			var _restorationCell = document.getElementById(this.destroyCellID);
			var _restorationCellOpacity = _restorationCell.getAttribute('data-opacity');

			if (_restorationCellOpacity < 1) {
				_restorationCell.style.opacity = _restorationCellOpacity;
				_restorationCellOpacity = Number(_restorationCellOpacity) + 0.01;
				_restorationCell.setAttribute('data-opacity', _restorationCellOpacity);
			} else {
				_restorationCell.style.opacity = 1;
				_restorationCell.removeAttribute('data-opacity');
				_restorationCell.removeAttribute('style');
				_restorationCell.removeAttribute('data-restoration');

				_restorationCell.setAttribute('data-key', 'false');

				setTimeout(function () {
					var elemInfo2 = new InfoAboutCells(_restorationCell, 'All ok!)');
					elemInfo2.setInfoController();
				}, 4000);
			}
		}
	}]);

	return DestRestCell;
}();

/*====================== Info about cells  ==========================*/


var InfoAboutCells = function () {
	function InfoAboutCells(nodeCell, _innerText) {
		_classCallCheck(this, InfoAboutCells);

		this.nodeCell = nodeCell;
		this._innerText = _innerText;
	}

	_createClass(InfoAboutCells, [{
		key: 'setInfoController',
		value: function setInfoController() {

			var strucktCellID = this.nodeCell.getAttribute('id');
			var parentField = this.nodeCell.parentNode;
			var displayInfo = parentField.getElementsByClassName('mx-contr_display_info');

			displayInfo[0].innerHTML = this._innerText;
		}
	}]);

	return InfoAboutCells;
}();

/*========================= Each cells =============================*/


var EachCells = function () {
	function EachCells(groupCell) {
		_classCallCheck(this, EachCells);

		this.groupCell = groupCell;
	}

	_createClass(EachCells, [{
		key: 'eachGroupCells',
		value: function eachGroupCells() {
			// Check click on cell

			var elems = document.getElementsByClassName(this.groupCell);
			for (var w = 0; w < elems.length; w++) {
				var groupElement = elems[w];

				var getDataDestroy = groupElement.getAttribute('data-destroy');
				var getDataRestoration = groupElement.getAttribute('data-restoration');

				var thisCellID = groupElement.getAttribute('id');

				if (getDataDestroy == 'cellDestroy') {
					// The destruction process			

					// Destroy cell
					var d = new DestRestCell(thisCellID);
					d.destroyCell();
				}

				if (getDataRestoration == 'cellRestoration') {
					// The process of recovery

					// Restoration cells
					var r = new DestRestCell(thisCellID);
					r.restorationCell();
				}
			}
		}
	}, {
		key: 'addEventClick',
		value: function addEventClick() {

			var groupElems = document.getElementsByClassName(this.groupCell);

			var _loop = function _loop(e) {
				var groupElement = groupElems[e];

				groupElement.onclick = function () {

					var getDataKey = groupElement.getAttribute('data-key');
					if (getDataKey == 'false') {
						groupElement.setAttribute('data-key', 'true');
						groupElement.setAttribute('data-destroy', 'cellDestroy');
						groupElement.setAttribute('data-opacity', '1');

						// set info
						var IDElement = groupElement.getAttribute('id');
						var elemInfo = new InfoAboutCells(groupElement, IDElement);
						elemInfo.setInfoController();

						// remember
						var idGroup = groupElement.parentNode.getAttribute('id');
						BuildBrain.toRemember(idGroup, IDElement);

						// Show logs
						BuildBrain.showLogs(idGroup, IDElement);
					}
				};
			};

			for (var e = 0; e < groupElems.length; e++) {
				_loop(e);
			}
		}
	}]);

	return EachCells;
}();

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//                          Helpers                               :
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

/*======================== Cycle ================================*/


var reqAnimationFrame = function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
		setTimeout(callback, 1000 / 60);
	};
}();

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//                                                                :
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
;(function () {

	// Build brain
	BuildBrain.build();

	// init memory
	BuildBrain.memory();

	// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//                             Init                               :
	// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	/* --------------------------------------- */
	/* create fields */
	/* field 1 */
	var createOrgan = new CreateOrganism('field1', '900px', 'cell1_', 330, 'group_1');
	createOrgan.createOrgan();

	/* field 2 */
	var createOrgan2 = new CreateOrganism('field2', '900px', 'cell2_', 100, 'group_2');
	createOrgan2.createOrgan();

	/* field 3 */
	var createOrgan3 = new CreateOrganism('field3', '500px', 'cell3_', 170, 'group_3');
	createOrgan3.createOrgan();

	/* --------------------------------------- */
	/* each fields | click the cell */
	/* each field 1 */
	var groupEl1 = new EachCells('group_1');
	groupEl1.addEventClick();

	/* each field 2 */
	var groupEl2 = new EachCells('group_2');
	groupEl2.addEventClick();

	/* each field 3 */
	var groupEl3 = new EachCells('group_3');
	groupEl3.addEventClick();

	// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//                            Loop                                :
	// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	function draw() {
		setTimeout(function () {
			// ______________________ //

			// ___ Bypass the cells ___
			// group 1
			groupEl1.eachGroupCells();

			// group 2
			groupEl2.eachGroupCells();

			// group 3
			groupEl3.eachGroupCells();

			// ______________________ //
			reqAnimationFrame(draw);
		}, 1000 / 20);
	}
	draw();
})();