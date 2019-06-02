"use strict";

gsuiBlocksManager.prototype.__mouseup = function() {
	const blcsEditing = this.__blcsEditing,
		mdBlc = this.__mdBlc,
		muFn = gsuiBlocksManager.__mouseupFns.get( this.__status );

	if ( muFn ) {
		muFn.call( this, blcsEditing, mdBlc );
	}
	this.__eventReset();
	if ( mdBlc ) {
		mdBlc.classList.remove( "gsui-hover" );
		this.__mdTarget.classList.remove( "gsui-hover" );
		this.__mdTarget =
		this.__mdBlc = null;
	}
	delete gsuiBlocksManager._focused;
};

gsuiBlocksManager.__mouseupFns = new Map( [
	[ "moving", function( blcsEditing ) {
		if ( this.__valueB || Math.abs( this.__valueA ) > .000001 ) {
			this.managercallMoving( blcsEditing, this.__valueA, this.__valueB );
		}
	} ],
	[ "deleting", function( blcsEditing ) {
		if ( blcsEditing.size || this.__blcsSelected.size ) {
			this.managercallDeleting( blcsEditing );
		}
	} ],
	[ "cropping-a", function( blcsEditing, mdBlc ) {
		if ( Math.abs( this.__valueA ) > .000001 ) {
			this.managercallCroppingA.call( this, blcsEditing, this.__valueA );
		}
	} ],
	[ "cropping-b", function( blcsEditing, mdBlc ) {
		if ( Math.abs( this.__valueA ) > .000001 ) {
			this.managercallCroppingB.call( this, blcsEditing, this.__valueA );
		}
	} ],
	[ "selecting-1", function( blcsEditing, mdBlc ) {
		if ( mdBlc ) {
			blcsEditing.set( mdBlc.dataset.id, mdBlc );
		}
		if ( blcsEditing.size ) {
			this.managercallSelecting( blcsEditing );
		}
	} ],
	[ "selecting-2", function( blcsEditing ) {
		this.__selection.classList.add( "gsuiBlocksManager-selection-hidden" );
		if ( blcsEditing.size ) {
			this.managercallSelecting( blcsEditing );
		}
	} ],
] );
