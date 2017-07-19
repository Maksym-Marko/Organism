// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//                          Classes                               :
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

/*==================== Build brain ==========================*/
class BuildBrain{

	static build(){

		let brainContainer = document.createElement( 'div' );
		brainContainer.className = 'mx-brain';

		let firstChildEl = document.createElement( 'div' );
		brainContainer.appendChild( firstChildEl );

		document.body.appendChild( brainContainer );

	}

	static memory(){
		window.memoryArray = [];
	}

	static toRemember( pushField, pushEl ){
		let objElem = { field: pushField, id: pushEl };
		memoryArray.push( objElem );
	}

	static showLogs( pushField, pushEl ){

		let brain = document.getElementsByClassName( 'mx-brain' );

		let logWrapper = document.createElement( 'div' );

		let logNameField = document.createElement( 'span' );
		logNameField.className = 'mx-log_name_field';
		logNameField.innerHTML = pushField;

		let logIDElem = document.createElement( 'span' );
		logIDElem.className = 'mx-log_id_elem';
		logIDElem.innerHTML = pushEl;

		memoryArray.filter( function( el){
			logWrapper.appendChild( logNameField );
			logWrapper.appendChild( logIDElem );

			brain[0].insertBefore( logWrapper, brain[0].firstChild );

		} );
	}

}

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

		// create controller group cells
		let cContrGroupCells = new CreateControllerGroupCells( this.fieldID );
		cContrGroupCells.createControllerGroupCells();
	}

}

/*===================== Controller group cells ======================*/
class CreateControllerGroupCells{
	constructor( _fieldContrBy ){
		this.fieldContrBy = _fieldContrBy;
	}

	createControllerGroupCells(){
		let fieldContrBy = document.getElementById( this.fieldContrBy );
		let controllerGroupCells = document.createElement( 'div' );
		controllerGroupCells.setAttribute( 'class', 'mx-controller_group_cells' );
		controllerGroupCells.setAttribute( 'id', 'controller_' + this.fieldContrBy );
		fieldContrBy.insertBefore( controllerGroupCells, this.nextSibling );

		let displayInfo = document.createElement( 'span' );
		displayInfo.setAttribute( 'class', 'mx-contr_display_info' );
		displayInfo.setAttribute( 'id', 'displayInfo_' + this.fieldContrBy );

		let testText = document.createTextNode( 'All ok!)' );
		displayInfo.appendChild( testText );

		controllerGroupCells.appendChild( displayInfo );
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

			setTimeout( () => {
				let elemInfo2 = new InfoAboutCells( _restorationCell, 'All ok!)' );
				elemInfo2.setInfoController();
			}, 4000 );
			
		}
	}
}

/*====================== Info about cells  ==========================*/
class InfoAboutCells{

	constructor( nodeCell, _innerText ){

		this.nodeCell = nodeCell;
		this._innerText = _innerText;

	}

	setInfoController(){

		let strucktCellID = this.nodeCell.getAttribute( 'id' );
		let parentField = this.nodeCell.parentNode;
		let displayInfo = parentField.getElementsByClassName( 'mx-contr_display_info' );

		displayInfo[0].innerHTML = this._innerText;

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

				// Destroy cell
				let d = new DestRestCell( thisCellID );
				d.destroyCell();					

			}
			
			if( getDataRestoration == 'cellRestoration' ){ // The process of recovery

				// Restoration cells
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

					// set info
					let IDElement = groupElement.getAttribute( 'id' );
					let elemInfo = new InfoAboutCells( groupElement, IDElement );
					elemInfo.setInfoController();

					// remember
					let idGroup = groupElement.parentNode.getAttribute( 'id' );
					BuildBrain.toRemember( idGroup, IDElement );

					// Show logs
					BuildBrain.showLogs( idGroup, IDElement );
				}				

			}			
		}

	}

}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//                          Helpers                               :
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

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

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//                                                                :
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
;( function(){

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
	let createOrgan = new CreateOrganism( 'field1', '900px', 'cell1_', 330, 'group_1' );
	createOrgan.createOrgan();

	/* field 2 */
	let createOrgan2 = new CreateOrganism( 'field2', '900px', 'cell2_', 100, 'group_2' );
	createOrgan2.createOrgan();

	/* field 3 */
	let createOrgan3 = new CreateOrganism( 'field3', '500px', 'cell3_', 170, 'group_3' );
	createOrgan3.createOrgan();

	/* --------------------------------------- */
	/* each fields | click the cell */
	/* each field 1 */ 
	let groupEl1 = new EachCells( 'group_1' );	
	groupEl1.addEventClick();

	/* each field 2 */
	let groupEl2 = new EachCells( 'group_2' );	
	groupEl2.addEventClick();

	/* each field 3 */
	let groupEl3 = new EachCells( 'group_3' );	
	groupEl3.addEventClick();
	
	// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//                            Loop                                :
	// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	function draw(){
		setTimeout( () => {
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
		}, 1000/20 );
	}
	draw();

} )();