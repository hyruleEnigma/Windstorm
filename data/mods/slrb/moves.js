'use strict';

// Used for bumbadadabum and Snaquaza's move
const RandomStaffBrosTeams = require('./random-teams');
const Pokemon = require(/** @type {any} */ ('../../../.sim-dist/pokemon')).Pokemon;

/** @type {{[k: string]: ModdedMoveData}} */
let BattleMovedex = {
	/*
	// Example
	"moveid": {
		accuracy: 100, // a number or true for always hits
		basePower: 100, // Not used for Status moves, base power of the move, number
		category: "Physical", // "Physical", "Special", or "Status"
		desc: "", // long description
		shortDesc: "", // short description, shows up in /dt
		id: "moveid",
		name: "Move Name",
		pp: 10, // unboosted PP count
		priority: 0, // move priority, -6 -> 6
		flags: {}, // Move flags https://github.com/Zarel/Pokemon-Showdown/blob/master/data/moves.js#L1-L27
		secondary: {
			status: "tox",
			chance: 20,
		}, // secondary, set to null to not use one. Exact usage varies, check data/moves.js for examples
		target: "normal", // What does this move hit?
		// normal = the targeted foe, self = the user, allySide = your side (eg light screen), foeSide = the foe's side (eg spikes), all = the field (eg raindance). More can be found in data/moves.js
		type: "Water", // The move's type
		// Other useful things
		noPPBoosts: true, // add this to not boost the PP of a move, not needed for Z moves, dont include it otherwise
		isZ: "crystalname", // marks a move as a z move, list the crystal name inside
		zMoveEffect: '', // for status moves, what happens when this is used as a Z move? check data/moves.js for examples
		zMoveBoost: {atk: 2}, // for status moves, stat boost given when used as a z move
		critRatio: 2, // The higher the number (above 1) the higher the ratio, lowering it lowers the crit ratio
		drain: [1, 2], // recover first num / second num % of the damage dealt
		heal: [1, 2], // recover first num / second num % of the target's HP
	},
	*/
	// Please keep sets organized alphabetically based on staff member name!	
	
	souptime: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "If the user is a Kartana, the user's primary type becomes a random type, matching this move.",
		shortDesc: "Changes user/move type to fire, water, or grass.",
		id: "souptime",
		name: "Soup Time!",
		isNonstandard: "Custom",
		pp: 15,
		priority: 0,
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Conversion", source);
		},
		onModifyMove(move, pokemon) {
			let types = ['Fire','Water','Grass'];
			let randomType = this.sample(types);
			move.type = randomType;
			pokemon.addType(randomType);
			this.add('-start', pokemon, 'typeadd', randomType);
		},
		onHit(target, source) {
			this.add('-anim', source, "Spectral Thief", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	// fart
	soupstealing7starstrike: {
		accuracy: true,
		basePower: 195,
		category: "Physical",
		desc: "Matches the most recent of the user's Soup Time! typing changes. Defaults to Fairy if Soup Time! has not been used.",
		shortDesc: "Matches current Soup Time! type or Fairy.",
		id: "soupstealing7starstrike",
		name: "Soup-Stealing 7-Star Strike",
		isNonstandard: "Custom",
		pp: 1,
		priority: 0,
		flags: {},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onModifyMove(move, pokemon) {
			let thirdType = pokemon.types[pokemon.types.length-1];
			move.type = thirdType;
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Rock Polish', source);
			this.add('-anim', source, 'Let\'s Snuggle Forever', target);
		},
		onHit() {
			this.add(`c|+fart|did someone say soup?`);
		},
		isZ: "fartiumz",
		target: "normal",
		type: "Normal",
	},
	
	// Tenshi Nagae
	divinebork: {
		basePower: 130,
		accuracy: 100,
		category: "Physical",
		desc: "This move summons Sandstorm and boosts the user's Attack by one stage the first time it's used.",
		shortDesc: "User's Atk +1 once only. Summons Sandstorm.",
		id: "divinebork",
		name: "Divine Bork",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, protect: 1, contact: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Meteor Mash', target);
		},
		onAfterMove(pokemon) {
			if (pokemon.happiness == 255) {
				this.add('-activate', pokemon, 'ability: Bork');
				this.boost({atk: 1}, pokemon, pokemon, 'move: Bork');
				pokemon.happiness = pokemon.happiness - 1;
			}
		},
		onAfterMoveSecondarySelf() {
			this.field.setWeather('sandstorm');
		},
		target: "normal",
		type: "Normal",
	},
	
	
	"bruceboost": {
		basePower: 100,
		accuracy: 100,
		category: "Special",
		desc: "Has a 10% chance to raise the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage.",
		shortDesc: "10% chance to raise all stats by 1 (not acc/eva).",
		id: "bruceboost",
		name: "Bruce Boost",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Conversion", source);
		},
		onPrepareHit(target, source, move) {
			this.add('-anim', source, 'Judgment', target);
			this.add('-anim', target, 'Extreme Evoboost', target);
		},
		secondary: {
			chance: 10,
			self: {
				boosts: {
					atk: 1,
					def: 1,
					spa: 1,
					spd: 1,
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Psychic",
	},
	
	"hyperlink": {
		accuracy: 100,
		basePower: 75,
		category: "Special",
		desc: "Has a 50% chance to force the target to switch.",
		id: "hyperlink",
		name: "Hyperlink",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onHit(target, source, move) {
			if (this.random(2) === 0) {
				target.forceSwitchFlag = true;
			}
		},
		target: "normal",
		type: "Fairy",
	},
	
	"swordbeam": {
		accuracy: true,
		basePower: 275,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.hp !== pokemon.maxhp) return move.basePower * 0.5;
			return move.basePower;
		},
		category: "Special",
		shortDesc: "Full HP: this move does not check accuracy.",
		id: "swordbeam",
		isNonstandard: "Custom",
		name: "Sword Beam",
		pp: 5,
		flags: {protect: 1, mirror: 1, distance: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			if(source.hp !== source.maxhp) {return false;}
			this.add('-anim', source, 'Searing Sunraze Smash', target);
		},
		secondary: null,
		target: "normal",
		type: "???",
	},
	
	"lamplust": {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Has a 30% chance to lower the target's accuracy by 1 stage.",
		shortDesc: "30% chance to lower the target's accuracy by 1.",
		id: "lamplust",
		name: "Lamp Lust",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Bug",
		zMovePower: 160,
		contestType: "Cool",
	},
	
	"sacredmist": {
		accuracy: 90,
		basePower: 110,
		isNonstandard: "Custom",
		category: "Special",
		desc: "If this move is successful, terrain becomes Misty Terrain. Cures status.",
		shortDesc: "Summons Misty Terrain; cures status.",
		id: "sacredmist",
		name: "Sacred Mist",
		pp: 10,
        priority: 0,
        flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source, move) {
			this.add('-anim', source, 'Judgment', target);
		},
		onModifyMove() {
			this.setTerrain('mistyterrain');
		},
		onHit(pokemon) {
			pokemon.cureStatus();
		},
		target: "normal",
		type: "Psychic",
        zMovePower: 185,
	},
	
	
	"malicedecree": {
		accuracy: 100,
		basePower: 130,
		category: "Special",
		desc: "Lowers a random stat of the user by 2.",
		shortDesc: "Lowers one of the user's stats by 2.",
		id: "malicedecree",
		isNonstandard: "Custom",
		name: "Malice Decree",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source, move) {
			this.add('-anim', source, 'Judgment', target);
		},
		onAfterMoveSecondarySelf(target) {
			let stats = [];
			for (let stat in target.boosts) {
				// @ts-ignore
				if (target.boosts[stat] > -6) {
					stats.push(stat);
				}
			}
			if (stats.length) {
				let randomStat = this.sample(stats);
				/**@type {{[k: string]: number}} */
				let boost = {};
				boost[randomStat] = -2;
				this.boost(boost);
			} else {
				return false;
			}
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	
	"report": {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "If both the user and the target have not fainted, the target is forced to switch out and be replaced with a random unfainted ally. This effect fails if the target used Ingrain previously, has the Suction Cups Ability, or this move hit a substitute. Ignores Electric immunity.",
		shortDesc: "Forces the target to switch to a random ally. Ignores Electric immunity.",
		id: "report",
		isViable: true,
		name: "/report",
		pp: 10,
		priority: -6,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source, move) {
			this.add('-anim', source, 'Judgment', target);
		},
		onEffectiveness(typeMod, type, move) {
			if (move.type !== 'Electric') return;
			let target = this.activeTarget;
			if (!target) return; // avoid crashing when called from a chat plugin
			// ignore effectiveness if the target is Ground type and immune to Electric
			if (!target.runImmunity('Electric')) {
				if (target.hasType('Ground')) return 0;
			}
		},
		ignoreImmunity: {'Electric': true},
		forceSwitch: true,
		target: "normal",
		type: "Electric",
		zMovePower: 160,
	},
	
	"stingpunch": {
		basePower: 65,
		accuracy: 100,
		category: "Physical",
		desc: "Raises the user's Speed by 2 stages if this move knocks out the target.",
		shortDesc: "Raises user's Speed by 2 if this KOes the target.",
		id: "stingpunch",
		name: "Sting Punch",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Meteor Mash', target);
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({spe: 2}, pokemon, pokemon, move);
		},
		target: "normal",
		type: "Bug",
	},
	
	"toasterbomb": {
		basePower: 110,
		accuracy: 95,
		category: "Special",
		desc: "Lowers the user's Defense and Special Defense by 1 stage.",
		shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
		id: "toasterbomb",
		name: "Toaster Bomb",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source, move) {
			this.add('-anim', source, 'Judgment', target);
		},
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	
	"busted": {
		basePower: 110,
		accuracy: 95,
		category: "Special",
		desc: "Lowers the user's Defense and Special Defense by 1 stage.",
		shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
		id: "busted",
		name: "Busted",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source, move) {
			this.add('-anim', source, 'Judgment', target);
		},
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	"yummycookies": {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "yummycookies",
		isNonstandard: "Custom",
		name: "Yummy Cookies!!!",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, punch: 1, heal: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source, move) {
			this.add('-anim', source, 'Judgment', target);
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	"triplenightmare": {
		accuracy: 90,
		basePower: 130,
		category: "Special",
		desc: "Lowers the user's Special Attack by 2 stages.",
		shortDesc: "Lowers the user's Sp. Atk by 2.",
		id: "triplenightmare",
		isNonstandard: "Custom",
		name: "Triple Nightmare",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Defog", target);
		},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	// Host Joe
	"infiniteabyss": {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Summons Trick Room and raises the user's Special Attack by one stage.",
		shortDesc: "User's Spe. -1; sets Trick Room.",
		id: "infiniteabyss",
		name: "Infinite Abyss",
		isNonstandard: "Custom",
		pp: 5,
		onModifyMove(move) {
			if (!this.pseudoWeather.trickroom) {
				move.pseudoWeather = 'trickroom';
			}
		},
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Coil", source);
			this.add('-anim', source, "Extreme Evoboost", source);
		},
		self: {
			boosts: {
				spe: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	"deusexmachina": {
		accuracy: 85,
		basePower: 120,
		category: "Special",
		desc: "This move has a 30% chance to boost Special Attack by two stages before attacking.",
		shortDesc: "30% +2 SpA before attack.",
		id: "deusexmachina",
		name: "Deus Ex Machina",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Coil", source);
		},
		onModifyMove(move, pokemon) {
			 var allies = pokemon.side.pokemon.filter(ally => ally === pokemon || !ally.fainted && !ally.status);
			if (allies.length == 1) {
				if ((Math.floor(Math.random() * 100)+1)<61) {
					this.boost({spa: 2}, pokemon);
					this.add('-anim', source, "Extreme Evoboost", source);
				}
			} else {
				if ((Math.floor(Math.random() * 100)+1)<31) {
					this.boost({spa: 2}, pokemon);
					this.add('-anim', source, "Extreme Evoboost", source);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 200,
	},
	"nerdslandering": {
		accuracy: 100,
		basePower: 130,
		category: "Special",
		desc: "This move has a 30% chance to burn. Summons sun.",
		shortDesc: "30% burn. Summons sun.",
		id: "nerdslandering",
		name: "Nerd Slandering",
		isNonstandard: "Custom",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, "Coil", source);
		},
		onModifyMove(move, pokemon) {
			this.field.setWeather('sunnyday');
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		secondary: {
			chance: 30,
			status: 'brn',
		},
		zMovePower: 200,
	},
	"poweroffluff": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Speed by 2 stages and its Attack by 1 stage.",
		shortDesc: "Raises the user's Speed by 2 and Attack by 1.",
		id: "poweroffluff",
		isNonstandard: "Custom",
		name: "Power of Fluff",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			spe: 2,
			atk: 1,
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cute",
	},
	"L": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Atk/SpA by 2 stages and its Spe by 1 stage.",
		shortDesc: "Raises the user's Atk/SpA by 2 and Spe by 1.",
		id: "l",
		isNonstandard: "Custom",
		name: "L",
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			spe: 1,
			atk: 2,
			spa: 2,
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source, move) {
			this.add('-anim', source, 'Judgment', target);
		},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('lEffect');
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Smart",
	},
	
	"takeastudybreak": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user falls asleep for the turn and restores all of its HP, curing itself of any major status condition in the process. Fails if the user has full HP, is already asleep, or if another effect is preventing sleep.",
		shortDesc: "1 turn Rest.",
		id: "takeastudybreak",
		isNonstandard: "Custom",
		name: "Take a Study Break",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onTryMove(pokemon) {
			if (pokemon.hp < pokemon.maxhp && pokemon.status !== 'slp' && !pokemon.hasAbility('comatose')) return;
			this.add('-fail', pokemon);
			return null;
		},
		onHit(target) {
			if (!target.setStatus('slp')) return false;
			target.statusData.time = 1;
			target.statusData.startTime = 1;
			this.heal(target.maxhp / 2); //Aeshetic only as the healing happens after you fall asleep in-game
			this.add('-status', target, 'slp', '[from] move: Rest');
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cute",
	},
	
	
	// CJer
	cjerseizure: {
		accuracy: 90,
		category: "Status",
		desc: "Boosts the user's Attack, Defense, and Speed by one stage.",
		shortDesc: "+1 atk, def, and spe.",
		id: "cjerseizure",
		name: "CJer Seizure™",
		isNonstandard: "Custom",
		pp: 10,
		priority: 0,
		flags: {protect:0, snatch: 1, mirror: 1},
		volatileStatus: 'seizing',
		effect: {
			noCopy: true,
			duration: 3,
			onHit(pokemon) {
				pokemon.addVolatile('torment');
				pokemon.addVolatile('taunt');
				//pokemon.addVolatile('confusion');
			},
			onStart(pokemon) {
				this.add('-start', pokemon, 'Torment');
				if (target.activeTurns && !this.willMove(target)) {
					this.effectData.duration++;
				}
				this.add('-start', pokemon, 'move: Taunt');
			},
			onResidualOrder: 12,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Torment');
				this.add('-end', pokemon, 'move: Taunt');
			},
			onDisableMove(pokemon) {
				if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
				for (const moveSlot of pokemon.moveSlots) {
					if (this.getMove(moveSlot.id).category === 'Status') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
		onTryMovePriority: 100,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		status: 'tox',
		secondary: null,
		target: "normal",
		type: "Electric",
	},
};

exports.BattleMovedex = BattleMovedex;
