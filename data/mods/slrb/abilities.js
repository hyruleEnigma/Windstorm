'use strict';

/**@type {{[k: string]: ModdedAbilityData}} */
let BattleAbilities = {
	/*
	// Example
	"abilityid": {
		desc: "", // long description
		shortDesc: "", // short description, shows up in /dt
		id: "abilityid",
		name: "Ability Name",
		// The bulk of an ability is not easily shown in an example since it varies
		// For more examples, see https://github.com/Zarel/Pokemon-Showdown/blob/master/data/abilities.js
	},
	*/
	// A
	arcanetactics: {
		desc: "Adds a fifth move to the user of Thunderbolt, Ice Beam, or Flamethrower. All neutral hits do 25% less damage.",
		shortDesc: "Adds Tbolt, Ice Beam, or Flamethrower. Neutral = 75%.",
		id: "arcanetactics",
		name: "Arcane Tactics",
		isNonstandard: "Custom",
		onSourceBasePowerPriority: 7,
		onSourceBasePower(basePower, attacker, defender, move) {
			let not_neutral = ['Ghost', 'Poison', 'Steel', 'Fighting', 'Psychic', 'Dragon'];
			if (!not_neutral.include(move.type)) {
				return this.chainModify(0.75);
			}
		},
	},
	// ArchasTL
	"afk": {
		shortDesc: "User transforms into ArchasTL at half health.",
		id: "afk",
		name: "AFK",
	},
	// A Phantom
	"phantomflex": {
		shortDesc: "This Pokemon's Ghost moves have priority raised by 1.",
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.type === 'Ghost') {
				return priority + 1;
			}
		},
		id: "phantomflex",
		name: "Phantom Flex",
	},

	// barton
	"vibrant": {
		shortDesc: "This Pokemon's Fairy moves have priority raised by 1.",
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.type === 'Fairy') {
				return priority + 1;
			}
		},
		id: "vibrant",
		name: "vibrant",
	},
	// CJtheGold
	shadownerd: {
		desc: "This Pokemon's Attack & Speed are raised by 1 stage if hit by a Dark- or Ghost-type attack.",
		shortDesc: "+1 Atk/Spe if hit by a Dark- or Ghost-type attack.",
		onAfterDamage(damage, target, source, effect) {
			if (effect && (effect.type === 'Dark' || effect.type === 'Ghost')) {
				this.boost({spe: 1, atk: 1});
			}
		},
		id: "shadownerd",
		name: "Shadow Nerd",
	},
	// fart
	heatrises: {
		desc: "Immunity to Fire- and Ground-type moves.",
		shortDesc: "Immunity to Fire- and Ground-type moves.",
		// Logia's type-changing itself is implemented in statuses.js
		id: "heatrises",
		name: "Heat Rises",
		isNonstandard: true,
		onTryHit: function (target, source, move) {
			if (target !== source && (move.type === 'Fire' || move.type === 'Ground')) {
				this.add('-immune', target, '[msg]', '[from] ability: Heat Rises');
				return null;
			}
		},
	},
	// Flare
	superillusion: {
		desc: "When this Pokemon switches in, it appears as the last unfainted Pokemon in its party until it takes supereffective direct damage from another Pokemon's attack. This Pokemon's actual level and HP are displayed instead of those of the mimicked Pokemon.",
		shortDesc: "This Pokemon appears as the last Pokemon in the party until it takes a supereffective hit.",
		id: "superillusion",
		name: "Super Illusion",
		isNonstandard: "Custom",
		isUnbreakable: true,
		onBeforeSwitchIn(pokemon) {
			pokemon.illusion = null;
			let i;
			for (i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				if (!pokemon.side.pokemon[i]) continue;
				if (!pokemon.side.pokemon[i].fainted) break;
			}
			if (!pokemon.side.pokemon[i]) return;
			if (pokemon === pokemon.side.pokemon[i]) return;
			pokemon.illusion = pokemon.side.pokemon[i];
			let move = this.getMove(pokemon.side.pokemon[i].set.moves[3]);
			pokemon.moveSlots[3] = {
				move: move.name,
				id: move.id,
				pp: move.pp,
				maxpp: move.pp,
				target: move.target,
				disabled: false,
				used: false,
				virtual: true,
			};
			pokemon.types = pokemon.illusion.types;
		},
		onAfterDamage(damage, target, source, effect) {
			if (target.illusion && effect && effect.effectType === 'Move' && effect.id !== 'confused'  && this.getEffectiveness(effect.type, target.getTypes()) > 0) {
				this.singleEvent('End', this.getAbility('Illusion'), target.abilityData, target, source, effect);
				target.types = ["Dark"];
				let move = this.getMove('Busted');
				target.moveSlots[3] = {
					move: move.name,
					id: move.id,
					pp: move.pp,
					maxpp: move.pp,
					target: move.target,
					disabled: false,
					used: false,
					virtual: true,
				};
			}
		},
		onEnd(pokemon) {
			if (pokemon.illusion) {
				this.debug('illusion cleared');
				pokemon.illusion = null;
				pokemon.types = ["Dark"];
				let details = pokemon.template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
				this.add('replace', pokemon, details);
				this.add('-end', pokemon, 'Illusion');
			}
		},
		onFaint(pokemon) {
			pokemon.illusion = null;
		},
	},
	// hyruleEnigma
	"redtunic": {
		desc: "If this Pokemon is an Aegislash, it changes to Blade Forme before attempting to use an attacking move, and changes to Shield Forme before attempting to use King's Shield; halves the power of Fire-type attacks against this Pokemon and halves burn damage.",
		shortDesc: "Stance Change + Heatproof + Prankster",
		onBeforeMove: function (attacker, defender, move) {
			if (attacker.template.baseSpecies !== 'Aegislash' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'kingsshield') return;
			let targetSpecies = (move.id === 'kingsshield' ? 'Aegislash' : 'Aegislash-Blade');
			if (attacker.template.species !== targetSpecies) attacker.formeChange(targetSpecies);
			},
		onModifyAtkPriority: 6,
		onSourceModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Red Tunic weaken');
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onSourceModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Red Tunic weaken');
				return this.chainModify(0.5);
			}
		},
		onModifySpA: function (atk, attacker, defender, move) {
			if (move.type === '???') {
				this.debug('Red Tunic boost');
				return this.chainModify(1.5);
			}
		},
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.category === 'Status') {
				move.pranksterBoosted = true;
				return priority + 1;
			}
		},
		onDamage: function (damage, target, source, effect) {
			if (effect && effect.id === 'brn') {
				return damage / 2;
			}
		},
		id: "redtunic",
		name: "Red Tunic",
	},
	// i want a lamp
	"flashdrive": {
		shortDesc: "This Pokemon's attacks that are not very effective on a target deal double damage.",
		onStart: function (pokemon) {
			let foespe = 0;
			let myspe = pokemon.getStat('spe', false,true);
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				foespe += target.getStat('spe', false, true);
			}
			if (foespe && foespe >= myspe) {
				this.boost({spe: 1});
			} else {
				this.boost({spa: 1});
			}
		},
		onModifyDamage: function (damage, source, target, move) {
			if (move.typeMod < 0) {
				this.debug('Flashdrive boost');
				return this.chainModify(2);
			}
		},
		id: "flashdrive",
		name: "Flashdrive",
	},
	// Lumi Q
	jolthaymaker: {
		desc: "This Pokemon's punch-based attacks have their power multiplied by 2.",
		shortDesc: "This Pokemon's punch-based attacks have 2x power.",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Jolt Haymaker boost');
				return this.chainModify(2);
			}
		},
		id: "jolthaymaker",
		name: "Jolt Haymaker",
	},
	// MajesticLucario
	"fallenwarriors": {
		shortDesc: "Ability gains effects of Adaptability & Serene Grace if all allies have fainted.",
		id: "fallenwarriors",
		name: "Fallen Warriors",
		onModifyMove: function (move, pokemon) {
			if (pokemon.side.pokemon.length == 1) {
				move.stab = 2;
			}
		},
	},
	// Tauon
	galewingsv1: {
		desc: "This Pokemon's Flying-type moves have their priority increased by 1.",
		shortDesc: "This Pokemon's Flying-type moves have their priority increased by 1.",
		id: "galewingsv1",
		name: "Gale Wings v1",
		isNonstandard: "Custom",
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.type === 'Flying') return priority + 1;
		},
	},
	// Tenshi
	miraclesand: {
		desc: "If Sandstorm is active, this Pokemon's Speed and Defense are multiplied by 1.5. This Pokemon takes no damage from Sandstorm.",
		shortDesc: "If Sandstorm is active, this Pokemon's Spe/Def are 1.5x; immunity to Sandstorm.",
		onImmunity: function (type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onSwitchOut: function (pokemon) {
			pokemon.happiness = 255;
		},
		onModifySpe: function (spe, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.5);
			}
		},
		onModifyDef: function (def) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.5);
			}
		},
		id: "miraclesand",
		name: "Miracle Sand",
	},
	// VanillaBobcat
	"foodcoma": {
		shortDesc: "This Pokemon skips every other turn instead of using a move.",
		onResidual(pokemon) {
			if (pokemon.baseTemplate.baseSpecies !== 'Persian' || pokemon.transformed) {
				return;
			}
			if (pokemon.hp <= pokemon.maxhp / 2 && pokemon.template.speciesid === 'persian') {
				pokemon.formeChange('Persian-Alola', this.effect, true, '[silent]');
			}
		},
		onStart(pokemon) {
			pokemon.removeVolatile('truant');
			if (pokemon.activeTurns && (pokemon.moveThisTurnResult !== undefined || !this.willMove(pokemon))) {
				pokemon.addVolatile('truant');
			}
		},
		onBeforeMovePriority: 9,
		onBeforeMove(pokemon) {
			if (pokemon.removeVolatile('truant')) {
				this.add('cant', pokemon, 'ability: Truant');
				return false;
			}
			pokemon.addVolatile('truant');
		},
		effect: {},
		id: "foodcoma",
		name: "Food Coma",
	},	
	// yo boi arthurlis
	"harvestingsummer": {
		desc: "Half damage from Fire/Ice. 50% chance to respawn item. Weight doubled.",
		shortDesc: "Thick Fat / Heavy Metal / Harvest",
		onModifyWeight(weight) {
			return weight * 2;
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onResidual(pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland']) || this.randomChance(1, 2)) {
				if (pokemon.hp && !pokemon.item && this.getItem(pokemon.lastItem).isBerry) {
					pokemon.setItem(pokemon.lastItem);
					pokemon.lastItem = '';
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Harvest');
				}
			}
		},
		id: "harvestingsummer",
		name: "Harvesting Summer",
	},
	
};

exports.BattleAbilities = BattleAbilities;
