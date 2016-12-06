"use strict";

gsUIComponents[ "gs-ui-span-editable" ] = function( element, data ) {
	var escaped,
		value,
		placeholder = "",
		clazz = element.classList,
		span = element.querySelector( "span" ),
		input = element.querySelector( "input" );

	element.ondblclick = function( e ) {
		input.value = value;
		clazz.add( "gs-ui--editing" );
		input.focus();
		input.select();
	};
	input.onblur = function() {
		if ( !escaped ) {
			element._setValue( this.value );
			clazz.remove( "gs-ui--editing" );
		}
		escaped = false;
	};
	input.onkeydown = function( e ) {
		e.stopPropagation();
		if ( e.keyCode === 13 || e.keyCode === 27 ) {
			escaped = e.keyCode === 27;
			if ( !escaped ) {
				element._setValue( this.value );
			}
			clazz.remove( "gs-ui--editing" );
		}
	};

	element._getValue = function( val ) {
		return value;
	};
	element._setValue = function( val ) {
		val = val.trim();
		if ( val === placeholder ) {
			val = "";
		}
		clazz.toggle( "gs-ui--empty", !val );
		span.textContent = val || placeholder;
		if ( val !== value ) {
			value = val;
			data.onchange && data.onchange( value );
		}
	};
	element._setPlaceholder = function( s ) {
		placeholder = s.trim();
		if ( !value ) {
			element._setValue( s );
		}
	};
};
