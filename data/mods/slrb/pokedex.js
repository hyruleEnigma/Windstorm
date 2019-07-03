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
	// CJer
	porygon: {
		inherit: true,
		baseStats: {hp: 105, atk: 100, def: 110, spa: 125, spd: 115, spe: 80},
	},	
	// fart
	kartana: {
		inherit: true,
		types: ['Fairy', 'Steel'],
	},
	// MdPikachu
	pikachu: {
		inherit: true,
		baseStats: {hp: 70, atk: 110, def: 80, spa: 100, spd: 100, spe: 180},
	},
	// Moxie Latios
	latiosmega: {
		inherit: true,
		abilities: {0: 'Moxie'},
		types: ['Dragon', 'Ground'],
		baseStats: {hp: 80, atk: 160, def: 100, spa: 130, spd: 120, spe: 110},
	},
};

exports.BattlePokedex = BattlePokedex;
