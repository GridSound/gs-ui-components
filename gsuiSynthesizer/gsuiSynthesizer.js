"use strict";

class gsuiSynthesizer extends HTMLElement {
	constructor() {
		const root = gsuiSynthesizer.template.cloneNode( true ),
			elNewOsc = root.querySelector( ".gsuiSynthesizer-newOsc" ),
			elOscList = root.querySelector( ".gsuiSynthesizer-oscList" );

		super();
		this._root = root;
		this._lfo = null;
		this._waveList = [];
		this._elOscList = elOscList;
		this._uiOscs = new Map();
		Object.seal( this );

		elNewOsc.onclick = this._onclickNewOsc.bind( this );
		new gsuiReorder( {
			rootElement: elOscList,
			direction: "column",
			dataTransferType: "oscillator",
			itemSelector: ".gsuiOscillator",
			handleSelector: ".gsuiOscillator-grip",
			parentSelector: ".gsuiSynthesizer-oscList",
			onchange: this._onchangeReorder.bind( this ),
		} );
	}

	// .........................................................................
	connectedCallback() {
		if ( !this.firstChild ) {
			this.classList.add( "gsuiSynthesizer" );
			this.append( ...this._root.children );
			this.querySelector( ".gsuiSynthesizer-lfo" ).append( this._lfo );
		}
	}

	// .........................................................................
	setLFO( lfo ) {
		this._lfo = lfo;
	}
	setWaveList( arr ) {
		this._waveList = arr;
		this._uiOscs.forEach( o => o.addWaves( arr ) );
	}
	getOscillator( id ) {
		return this._uiOscs.get( id );
	}

	// .........................................................................
	addOscillator( id, osc ) {
		const uiOsc = document.createElement( "gsui-oscillator" );

		this._uiOscs.set( id, uiOsc );
		uiOsc.addWaves( this._waveList );
		uiOsc.dataset.id = id;
		this._elOscList.append( uiOsc );
	}
	removeOscillator( id ) {
		const osc = this._uiOscs.get( id );

		if ( osc ) {
			osc.remove();
			this._uiOscs.delete( id );
		}
	}
	reorderOscillators( obj ) {
		gsuiReorder.listReorder( this._elOscList, obj );
	}

	// events:
	// .........................................................................
	_onclickNewOsc() {
		GSUI.dispatchEvent( this, "gsuiSynthesizer", "addOscillator" );
	}
	_onchangeReorder() {
		const oscs = gsuiReorder.listComputeOrderChange( this._elOscList, {} );

		GSUI.dispatchEvent( this, "gsuiSynthesizer", "reorderOscillator", oscs );
	}
}

customElements.define( "gsui-synthesizer", gsuiSynthesizer );

gsuiSynthesizer.template = document.querySelector( "#gsuiSynthesizer-template" );
gsuiSynthesizer.template.remove();
gsuiSynthesizer.template.removeAttribute( "id" );
