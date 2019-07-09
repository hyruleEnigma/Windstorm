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
		abilities: {0: 'Arcane Tactics'},
		types: ['Psychic', 'Fairy'],
	},
	// A Phantom
	phantump: {
		inherit: true,
		abilities: {0: 'Phantom Flex'},
		baseStats: {hp: 86, atk: 100, def: 96, spa: 140, spd: 120, spe: 76},
	},
	// ArchasTL
	lilligant: {
		inherit: true,
		abilities: {0: 'AFK'},
	},
	// Barton
	clefable: {
		inherit: true,
		abilities: {0: 'Vibrant'},
	},
	// Barton
	houndour: {
		inherit: true,
		abilities: {0: 'Fluffy Paws'},
	},
	// Big Boy Teddy
	bewear: {
		inherit: true,
		abilities: {0: 'Fur Coat'},
	},
	// brownisaur
	bulbasaur: {
		inherit: true,
		types: ['Fairy', 'Psychic'],
		abilities: {0: 'Sweet Disguise'},
	},
	// CJer
	porygon: {
		inherit: true,
		baseStats: {hp: 105, atk: 100, def: 110, spa: 125, spd: 115, spe: 80},
		abilities: {0: 'Corrosion'},
	},
	// CJtheGold
	marshadow: {
		inherit: true,
		abilities: {0: 'Shadow Nerd'},
	},
	// fart
	kartana: {
		inherit: true,
		types: ['Fairy', 'Steel'],
	},
	// Flare
	zoroark: {
		inherit: true,
		abilities: {0: 'Super Illusion'},
	},
	// GeoffBruedly
	feebas: {
		inherit: true,
		baseStats: {hp: 100, atk: 150, def: 90, spa: 180, spd: 160, spe: 90},
		abilities: {0: 'Primordial Sea'},
	},
	// hyruleEnigma
	aegislash: {
		inherit: true,
		abilities: {0: 'Red Tunic'},
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
		baseStats: {hp: 64, atk: 118, def: 92, spa: 118, spd: 92, spe: 121},
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
