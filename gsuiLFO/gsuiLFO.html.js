"use strict";

GSUI.setTemplate( "gsui-lfo", () => {
	return [
		GSUI.createElement( "div", { class: "gsuiLFO-head" },
			GSUI.createElement( "label", { class: "gsuiLFO-btn gsuiLFO-toggle", title: "Toggle LFO" },
				GSUI.createElement( "input", { class: "gsuiLFO-btnInput gsuiLFO-toggleCheckbox", name: "gsuiLFO-toggle", type: "checkbox" } ),
				GSUI.createElement( "i", { class: "gsuiLFO-btnIcon gsuiLFO-toggleIcon gsuiIcon", "data-icon": "toggle" } ),
			),
			GSUI.createElement( "span", { class: "gsuiLFO-title" }, "LFO" ),
		),
		GSUI.createElement( "div", { class: "gsuiLFO-graph" },
			GSUI.createElement( "div", { class: "gsuiLFO-wave" },
				GSUI.createElement( "gsui-periodicwave" ),
			),
			GSUI.createElement( "div", { class: "gsuiLFO-ampSigns" },
				GSUI.createElement( "label", { class: "gsuiLFO-btn gsuiLFO-ampSign" },
					GSUI.createElement( "input", { class: "gsuiLFO-btnInput gsuiLFO-ampSignRadio", name: "gsuiLFO-ampSign", type: "radio", value: "1" } ),
					GSUI.createElement( "i", { class: "gsuiLFO-btnIcon gsuiLFO-ampSignIcon gsuiIcon", "data-icon": "caret-up" } ),
				),
				GSUI.createElement( "label", { class: "gsuiLFO-btn gsuiLFO-ampSign" },
					GSUI.createElement( "input", { class: "gsuiLFO-btnInput gsuiLFO-ampSignRadio", name: "gsuiLFO-ampSign", type: "radio", value: "-1" } ),
					GSUI.createElement( "i", { class: "gsuiLFO-btnIcon gsuiLFO-ampSignIcon gsuiIcon", "data-icon": "caret-down" } ),
				),
			),
		),
		[
			[ "delay", "delay", 0, 4, .03125 ],
			[ "attack", "attack", 0, 4, .03125 ],
			[ "speed", "speed", .25, 18, .125 ],
			[ "amp", "amplitude", .001, 1, .001 ],
		].map( ( [ attr, title, min, max, step ] ) => (
			GSUI.createElement( "div", { class: `gsuiLFO-prop gsuiLFO-${ attr }`, title },
				GSUI.createElement( "div", { class: "gsuiLFO-propLabel" },
					GSUI.createElement( "span", null, attr ),
					GSUI.createElement( "div", { class: "gsuiLFO-propValue" } ),
				),
				GSUI.createElement( "div", { class: "gsuiLFO-propContent" },
					GSUI.createElement( "gsui-slider", { type: "linear-x", min, max, step, "mousemove-size": "800" } ),
				),
			)
		) ),
		GSUI.createElement( "div", { class: "gsuiLFO-prop gsuiLFO-type" },
			GSUI.createElement( "div", { class: "gsuiLFO-propLabel" }, "wave" ),
			GSUI.createElement( "div", { class: "gsuiLFO-propContent" },
				[
					[ "sine", "M 1 5 C 1 4 1 1 4 1 C 7 1 7 4 7 5 C 7 6 7 9 10 9 C 13 9 13 6 13 5" ],
					[ "triangle", "M 1 5 L 4 1 L 10 9 L 13 5" ],
					[ "sawtooth", "M 1 5 L 7 1 L 7 9 L 13 5" ],
					[ "square", "M 1 5 L 1 1 L 7 1 L 7 9 L 13 9 L 13 5" ],
				].map( ( [ w, dots ] ) => (
					GSUI.createElement( "label", { class: "gsuiLFO-btn gsuiLFO-typeBtn", title: w },
						GSUI.createElement( "input", { class: "gsuiLFO-btnInput gsuiLFO-typeRadio", name: "gsuiLFO-type", type: "radio", value: w } ),
						GSUI.createElementNS( "svg", { class: "gsuiLFO-btnIcon gsuiLFO-typeSVG", viewBox: "0 0 14 10" }, GSUI.createElementNS( "path", { d: dots } ) ),
					)
				) )
			),
		),
	].flat( 1 );
} );
