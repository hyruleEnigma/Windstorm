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
	// A
	mew: {
		inherit: true,
		types: ['Psychic', 'Fairy'],
	},
	// A Phantom
	phantump: {
		inherit: true,
		baseStats: {hp: 86, atk: 100, def: 96, spa: 140, spd: 120, spe: 76},
	},
	// brownisaur
	bulbasaur: {
		inherit: true,
		types: ['Fairy', 'Psychic'],
	},
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
	// rYGLY
	monferno: {
		inherit: true,
		baseStats: {hp: 76, atk: 104, def: 71, spa: 104, spd: 71, spe: 108},
	},
	// VanillaBobcat
	persianalola: {
		inherit: true,
		abilities: {0: 'Harvest'},
	},
	// yo boi arthurlis
	torterra: {
		inherit: true,
		types: ['Grass', 'Rock'],
	},
};

exports.BattlePokedex = BattlePokedex;
