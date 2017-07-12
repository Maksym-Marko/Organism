/* ----------------------------------------------------------------
							Classes
---------------------------------------------------------------- */

/*==================== Build fields ==========================*/
class CreateFields{
	constructor( _id, _width ){
		this._id = _id;
		this._width = _width;
	}

	createField(){
		let field = document.createElement( 'div' );
		field.setAttribute( 'id', this._id );
		field.setAttribute( 'class', 'mx-filed' );		
		field.style.width = this._width;

		document.body.appendChild( field );
	}
}

/*===================== Build cells ==========================*/
class CreateCells{
	constructor( idPrefix, countCells, _field, groupCell, dataKey ){
		this.idPrefix = idPrefix;
		this.countCells = countCells;
		this._field = _field;
		this.groupCell = groupCell;
		this.dataKey = dataKey;
	}

	createCell( _id ){

		let cells = document.createElement( 'span' );
		cells.setAttribute( 'id', this.idPrefix + _id );
		cells.setAttribute( 'class', 'mx-cells ' + this.groupCell );
		cells.setAttribute( 'data-key', 'false' );

		document.getElementById( this._field ).appendChild( cells );
	}

	createCells(){
		for( let cC = 0; cC < this.countCells; cC++ ){
			this.createCell( cC );
		}
	}
}

/*================= Create field and Append cells in field =====================*/
class CreateOrganism{
	constructor( fieldID, fieldWidth, cellsPrefix, countCells, groupCell ){
		this.fieldID = fieldID;
		this.fieldWidth = fieldWidth;
		this.cellsPrefix = cellsPrefix;
		this.countCells = countCells;
		this.groupCell = groupCell;
	}

	createOrgan(){
		// create field
		let cField = new CreateFields( this.fieldID, this.fieldWidth );
		cField.createField();

		// create cell
		let cCell = new CreateCells( this.cellsPrefix, this.countCells, this.fieldID, this.groupCell );
		cCell.createCells();
	}
}

/*========================== Destroy and restoration Cell ============================*/
class DestRestCell{
	constructor( destroyCellID ){
		this.destroyCellID = destroyCellID;
	}

	destroyCell(){
		let _destroyCell = document.getElementById( this.destroyCellID );
		let _destroyCellOpacity = _destroyCell.getAttribute( 'data-opacity' );
		if( _destroyCellOpacity > 0 ){
			_destroyCell.style.opacity = _destroyCellOpacity;
			_destroyCellOpacity -= 0.10;
			_destroyCell.setAttribute( 'data-opacity', _destroyCellOpacity );
		} else{
			_destroyCell.setAttribute( 'data-opacity', '0' );
			_destroyCell.style.opacity = 0;

			// attr for restoration cell
			_destroyCell.removeAttribute( 'data-destroy' );
			_destroyCell.setAttribute( 'data-restoration', 'cellRestoration' );
		}
	}

	restorationCell(){
		let _restorationCell = document.getElementById( this.destroyCellID );
		let _restorationCellOpacity = _restorationCell.getAttribute( 'data-opacity' );		

		if( _restorationCellOpacity < 1 ){
			_restorationCell.style.opacity = _restorationCellOpacity;
			_restorationCellOpacity = Number( _restorationCellOpacity ) + 0.01;
			_restorationCell.setAttribute( 'data-opacity', _restorationCellOpacity );
		} else{
			_restorationCell.style.opacity = 1;
			_restorationCell.removeAttribute( 'data-opacity' );
			_restorationCell.removeAttribute( 'style' );
			_restorationCell.removeAttribute( 'data-restoration' );

			_restorationCell.setAttribute( 'data-key', 'false' );
		}
	}
}

/*========================= Each cells =============================*/
class EachCells{
	constructor( groupCell ){
		this.groupCell = groupCell;
	}

	eachGroupCells(){ // Check click on cell
		let elems = document.getElementsByClassName( this.groupCell );
		for( let w = 0; w < elems.length; w++ ){
			let groupElement = elems[w];
			
			let getDataDestroy = groupElement.getAttribute( 'data-destroy' );
			let getDataRestoration = groupElement.getAttribute( 'data-restoration' );

			let thisCellID = groupElement.getAttribute( 'id' );		
			
			if( getDataDestroy == 'cellDestroy' ){ // The destruction process			

				let d = new DestRestCell( thisCellID );
				d.destroyCell();

			}
			
			if( getDataRestoration == 'cellRestoration' ){ // The process of recovery

				let r = new DestRestCell( thisCellID );
				r.restorationCell();

			}

		}
	}

	addEventClick(){
		let groupElems = document.getElementsByClassName( this.groupCell );
		for( let e = 0; e < groupElems.length; e++ ){
			let groupElement = groupElems[e];			
			
			groupElement.onclick = function(){

				let getDataKey = groupElement.getAttribute( 'data-key' );
				if( getDataKey == 'false' ){
					groupElement.setAttribute( 'data-key', 'true' );
					groupElement.setAttribute( 'data-destroy', 'cellDestroy' );
					groupElement.setAttribute( 'data-opacity', '1' );
				}
				
			}			
		}
	}
}

/* ----------------------------------------------------------------
							Helpers
---------------------------------------------------------------- */

/*======================== Cycle ================================*/
let reqAnimationFrame = ( () =>{
	 return window.requestAnimationFrame
        || 	window.webkitRequestAnimationFrame
        || 	window.mozRequestAnimationFrame
        || 	window.oRequestAnimationFrame
        || 	window.msRequestAnimationFrame
        || 	function( callback ){
        	setTimeout( callback, 1000 / 60 );
        }
        ;
} )();

/* ----------------------------------------------------------------
-------------------------------------------------------------------
---------------------------------------------------------------- */
;( function(){

	// create field
	let createOrgan = new CreateOrganism( 'field1', '900px', 'cell_', 330, 'group_1' );
	createOrgan.createOrgan();

	let groupEl1 = new EachCells( 'group_1' );	
	groupEl1.addEventClick();
	
	function draw(){
		setTimeout( () => {
			// ______________________ code...

			groupEl1.eachGroupCells();

			// ______________________ code...
			reqAnimationFrame(draw);
		}, 1000/20 );
	}
	draw();

} )();