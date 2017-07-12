'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* ----------------------------------------------------------------
							Classes
---------------------------------------------------------------- */

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
		}
	}]);

	return CreateOrganism;
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
			}
		}
	}]);

	return DestRestCell;
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

					var d = new DestRestCell(thisCellID);
					d.destroyCell();
				}

				if (getDataRestoration == 'cellRestoration') {
					// The process of recovery

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

/* ----------------------------------------------------------------
							Helpers
---------------------------------------------------------------- */

/*======================== Cycle ================================*/


var reqAnimationFrame = function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
		setTimeout(callback, 1000 / 60);
	};
}();

/* ----------------------------------------------------------------
-------------------------------------------------------------------
---------------------------------------------------------------- */
;(function () {

	// create field
	var createOrgan = new CreateOrganism('field1', '900px', 'cell_', 330, 'group_1');
	createOrgan.createOrgan();

	var groupEl1 = new EachCells('group_1');
	groupEl1.addEventClick();

	function draw() {
		setTimeout(function () {
			// ______________________ code...

			groupEl1.eachGroupCells();

			// ______________________ code...
			reqAnimationFrame(draw);
		}, 1000 / 20);
	}
	draw();
})();