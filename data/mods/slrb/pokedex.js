'use strict';

/**@type {{[k: string]: ModdedTemplateData}} */
let BattlePokedex = {
	/*
	// Example
	speciesid: {
		inherit: true, // Always use this, makes the pokemon inherit its default values from the parent mod (gen7)
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100}, // the base stats for the pokemon
	},
	*/

	// fart
	kartana: {
		inherit: true,
		types: ['Fairy', 'Steel'],
	},
	// CJer
	porygon: {
		inherit: true,
		baseStats: {hp: 105, atk: 100, def: 110, spa: 125, spd: 115, spe: 80},
	},	

	// MdPikachu
	pikachu: {
		inherit: true,
		baseStats: {hp: 70, atk: 110, def: 80, spa: 100, spd: 100, spe: 180},
	},	
};

exports.BattlePokedex = BattlePokedex;
