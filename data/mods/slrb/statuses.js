'use strict';

/**@type {{[k: string]: ModdedEffectData}} */
let BattleStatuses = {
	/*
	// Example:
	userid: {
		noCopy: true,
		onStart: function () {
			this.add(`c|+Username|Switch In Message`);
		},
		onSwitchOut: function () {
			this.add(`c|+Username|Switch Out Message`);
		},
		onFaint: function () {
			this.add(`c|+Username|Faint Message`);
		},
		// Innate effects go here
	},
	*/
	// Please keep statuses organized alphabetically based on staff member name!
	
	afkrchastl: {
		noCopy: true,
		onStart: function () {
			//this.add(`c|+Kaiju Bunny|Hey there! Good luck!`);
		},
		onSwitchOut: function () {
			//this.add(`c|+Kaiju Bunny|Don't keep her from battling for too long!`);
		},
		onFaint: function () {
			//this.add(`c|+Kaiju Bunny|She tried her best... ;;`);
		},
		// Kaiju Rage Innate
		// onUpdate so toxic orb can activate after. Code mainly copied from Power Construct.
		onUpdate: function (pokemon) {
			if (pokemon.template.speciesid !== 'lilligant' || pokemon.transformed || pokemon.illusion || !pokemon.hp) return;
			if (pokemon.hp > pokemon.maxhp / 2) return;
			this.add('-activate', pokemon, 'ability: no longer AFK');
			pokemon.formeChange('Arceus-Ghost', this.effect, true);
			pokemon.name = 'ArchasTL';
         pokemon.id = pokemon.side.id+": ArchasTL";
         pokemon.fullname = pokemon.side.id+": ArchasTL";
			pokemon.illusion = pokemon; // name change
         this.add('replace', pokemon, pokemon.getDetails); // name change
			pokemon.illusion = null;
			let newHP = Math.floor(Math.floor(2 * pokemon.template.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100) * pokemon.level / 100 + 10);
			pokemon.hp = newHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newHP;
			pokemon.heal(pokemon.maxhp / 4);
			pokemon.types = ["Ghost", "Grass"]
			this.add('-heal', pokemon, pokemon.getHealth);
			this.add('-message', pokemon.name + '\ finally got it going!');
		},
	},
	arceus: {
		name: 'Arceus',
		id: 'arceus',
		num: 493,
		onTypePriority: 1,
		onType: function (types, pokemon) {
			return ["Ghost", "Grass"];
		},
	},
	
	brucewee: {
		noCopy: true, 
		onStart: function () {
			this.add(`c| BruceWee|I like trains`);
		},
		onSwitchOut: function () {
			this.add(`c| BruceWee|ye`);
		},
		onFaint: function () {
			this.add(`c| BruceWee|weird flex but ok`);
		},
	},
	
	fart: {
		noCopy: true,
		onStart(target, source) {
			this.add('-start', source, 'typechange', `Fairy/Steel`);
			this.add(`c|#fart|it's fukken raw`);
		},
		onSwitchOut() {
			this.add(`c|#fart|this boy is not correct. he is **flawed.**`);
		},
		onFaint() {
			this.add(`c|#fart|the things I do for love...`);
		},
},

	"lumiq": {
		noCopy: true, 
		onStart: function () {
			this.add(`c|%Lumi Q|Fly like a butterfly; sting like me C;<`);
		},
		onSwitchOut: function () {
			this.add(`c|%Lumi Q|Tag out!`);
		},
		onFaint: function () {
			this.add(`c|%Lumi Q|ded`);
		},
	},
	
	mustard: {
		noCopy: true, 
		onStart: function () {
			this.add(`c|@mustard|hi`);
		},
		onSwitchOut: function () {
			this.add(`c|@mustard|Hell yeah, brother! Cheers from Iraq!`);
		},
		onFaint: function () {
			this.add(`c|@mustard|Unluckeee`);
		},
	},


	mdpikachu: {
		noCopy: true, 
		onStart: function () {
			this.add(`c| MdPikachu|Will I be a voice if I report enough people?`);
		},
		onSwitchOut: function () {
			this.add(`c| MdPikachu|Nope, nope, I want none of this!`);
		},
		onFaint: function () {
			this.add(`c| MdPikachu|This is fair and balanced!`);
		},
	},
	
	hyruleenigma: {
		noCopy: true, 
		onStart: function () {
			this.add(`c|%hyruleEnigma|Ahoy, Lobby!`);
		},
		onSwitchOut: function () {
			this.add(`c|%hyruleEnigma|If only I were Dunsparce...`);
		},
		onFaint: function () {
			this.add(`c|%hyruleEnigma|I should've buffed Sword Beam.`);
		},
	},
	
    sacredlatias: {
        noCopy: true,
        onStart: function () {
            this.add(`c|%SacredLatias|Latias for ag, just saying.`);
        },
        onSwitchOut: function () {
            this.add(`c|%SacredLatias|Come onnnn, I coulda taken one more hit!`);
        },
        onFaint: function () {
            this.add(`c|%SacredLatias|Them spoopnoodles finally got the best of me...`);
        },
    },
	
	mobilegreennamed: {
		noCopy: true, 
		onStart: function () {
			this.add(`c| MobileGreenNamed|Time for my daily ran-oh wait! We're battling?`);
		},
		onSwitchOut: function () {
			this.add(`c| MobileGreenNamed|/me jumps out window`);
		},
		onFaint: function () {
			this.add(`c| MobileGreenNamed|X_X`);
		},
	},
	
	tenshinagae: {
		noCopy: true, 
		onStart: function () {
			this.add(`c|@Tenshi Nagae|Praise Be Puppy Jesus`);
		},
		onSwitchOut: function () {
			this.add(`c|@Tenshi Nagae|/me borks at a distance`);
		},
		onFaint: function () {
			this.add(`c|@Tenshi Nagae|Growl Bork Bork :C`);
		},
	},
	
	krookies: {
		noCopy: true, 
		onStart: function () {
			this.add(`c| Krookies|I love all of you!`);
		},
		onSwitchOut: function () {
			this.add(`c| Krookies|Im gonna go eat some potatoes brb`);
		},
		onFaint: function () {
			this.add(`c| Krookies|Dying is bad for your health :c`);
		},
	},
	pinkdragontamer: {
		noCopy: true, 
		onStart: function () {
			this.add(`c|%pinkdragontamer|i got 3 heads bitch`);
		},
		onSwitchOut: function () {
			this.add(`c|%pinkdragontamer|im out this bih`);
		},
		onFaint: function () {
			this.add(`c|%pinkdragontamer|!faq you`);
		},
	},
	hostjoe: {
		noCopy: true, 
		onStart: function () {
			this.add(`c|@Host Joe|Im about to crack open a cold one, Boy!`);
		},
		onSwitchOut: function () {
			this.add(`c|@Host Joe|I'm trying, Jennifer!`);
		},
		onFaint: function () {
			this.add(`c|@Host Joe|Cavs in 7`);
		},
	},
	majesticlucario: {
		noCopy: true, 
		onStart: function () {
			//this.add(`c|@Host Joe|Im about to crack open a cold one, Boy!`);
		},
		onSwitchOut: function () {
			//this.add(`c|@Host Joe|I'm trying, Jennifer!`);
		},
		onFaint: function () {
			//this.add(`c|@Host Joe|Cavs in 7`);
		},
	},
	bigboyteddy: {
		noCopy: true, 
		onStart: function () {
			this.add(`c| Big Boy Teddy|Did someone say muffin?`);
		},
		onSwitchOut: function () {
			this.add(`c| Big Boy Teddy|gtg, luv u all! except u Moxie Latios >:(`);
		},
		onFaint: function () {
			this.add(`c| Big Boy Teddy|where da muffin at? :(`);
		},
	},
	leffect: {
		name: 'L',
		id: 'leffect',
		// this is a volatile status
		onStart: function (target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.id === 'lockedmove') {
				this.add('-start', target, 'l', '[fatigue]');
			} else {
				this.add('-start', target, 'l');
			}
			this.effectData.time = this.random(2, 6);
		},
		onEnd: function (target) {
			this.add('-end', target, 'l');
		},
		onModifyMovePriority: -2,
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'naturalgift') {
				move.type = pokemon.set.shiny && pokemon.types[1] || pokemon.types[0];
			}
		},
	},
};

exports.BattleStatuses = BattleStatuses;
