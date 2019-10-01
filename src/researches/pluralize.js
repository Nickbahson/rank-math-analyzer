const uncountablesPlurals = {
	adulthood: true,
	advice: true,
	agenda: true,
	aid: true,
	alcohol: true,
	ammo: true,
	anime: true,
	athletics: true,
	audio: true,
	bison: true,
	blood: true,
	bream: true,
	buffalo: true,
	butter: true,
	carp: true,
	cash: true,
	chassis: true,
	chess: true,
	clothing: true,
	cod: true,
	commerce: true,
	cooperation: true,
	corps: true,
	debris: true,
	diabetes: true,
	digestion: true,
	elk: true,
	energy: true,
	equipment: true,
	excretion: true,
	expertise: true,
	flounder: true,
	fun: true,
	gallows: true,
	garbage: true,
	graffiti: true,
	headquarters: true,
	health: true,
	herpes: true,
	highjinks: true,
	homework: true,
	housework: true,
	information: true,
	jeans: true,
	justice: true,
	kudos: true,
	labour: true,
	literature: true,
	machinery: true,
	mackerel: true,
	mail: true,
	media: true,
	mews: true,
	moose: true,
	music: true,
	mud: true,
	manga: true,
	news: true,
	pike: true,
	plankton: true,
	pliers: true,
	police: true,
	pollution: true,
	premises: true,
	rain: true,
	research: true,
	rice: true,
	salmon: true,
	scissors: true,
	seo: true,
	series: true,
	sewage: true,
	shambles: true,
	shrimp: true,
	species: true,
	staff: true,
	swine: true,
	tennis: true,
	traffic: true,
	transportation: true,
	trout: true,
	tuna: true,
	wealth: true,
	welfare: true,
	whiting: true,
	wildebeest: true,
	wildlife: true,
	wordpress: true,
	you: true,
}

const irregularPluralsRules = [
	// Pronouns.
	[ 'I', 'we' ],
	[ 'me', 'us' ],
	[ 'he', 'they' ],
	[ 'she', 'they' ],
	[ 'them', 'them' ],
	[ 'myself', 'ourselves' ],
	[ 'yourself', 'yourselves' ],
	[ 'itself', 'themselves' ],
	[ 'herself', 'themselves' ],
	[ 'himself', 'themselves' ],
	[ 'themself', 'themselves' ],
	[ 'is', 'are' ],
	[ 'was', 'were' ],
	[ 'has', 'have' ],
	[ 'this', 'these' ],
	[ 'that', 'those' ],

	// Words ending in with a consonant and `o`.
	[ 'echo', 'echoes' ],
	[ 'dingo', 'dingoes' ],
	[ 'volcano', 'volcanoes' ],
	[ 'tornado', 'tornadoes' ],
	[ 'torpedo', 'torpedoes' ],

	// Ends with `us`.
	[ 'genus', 'genera' ],
	[ 'viscus', 'viscera' ],

	// Ends with `ma`.
	[ 'stigma', 'stigmata' ],
	[ 'stoma', 'stomata' ],
	[ 'dogma', 'dogmata' ],
	[ 'lemma', 'lemmata' ],
	[ 'schema', 'schemata' ],
	[ 'anathema', 'anathemata' ],

	// Other irregular rules.
	[ 'ox', 'oxen' ],
	[ 'axe', 'axes' ],
	[ 'die', 'dice' ],
	[ 'yes', 'yeses' ],
	[ 'foot', 'feet' ],
	[ 'eave', 'eaves' ],
	[ 'goose', 'geese' ],
	[ 'tooth', 'teeth' ],
	[ 'quiz', 'quizzes' ],
	[ 'human', 'humans' ],
	[ 'proof', 'proofs' ],
	[ 'carve', 'carves' ],
	[ 'valve', 'valves' ],
	[ 'looey', 'looies' ],
	[ 'thief', 'thieves' ],
	[ 'groove', 'grooves' ],
	[ 'pickaxe', 'pickaxes' ],
	[ 'whiskey', 'whiskies' ],
	[ 'thou', 'you' ],
]

class Pluralize {
	/**
	 * Class constructor
	 */
	constructor() {
		this.irregularSingles = {}
		this.irregularPlurals = {}
		this.uncountables = uncountablesPlurals
		this.pluralizationRules = [

			// unCountableRules
			[ /[^aeiou]ese$/i, '$0' ], // "chinese", "japanese"
			[ /deer$/i, '$0' ], // "deer", "reindeer"
			[ /fish$/i, '$0' ], // "fish", "blowfish", "angelfish"
			[ /measles$/i, '$0' ],
			[ /o[iu]s$/i, '$0' ], // "carnivorous"
			[ /pox$/i, '$0' ], // "chickpox", "smallpox"
			[ /sheep$/i, '$0' ],

			[ /s?$/i, 's' ],
			[ /[^\u0000-\u007F]$/i, '$0' ],
			[ /([^aeiou]ese)$/i, '$1' ],
			[ /(ax|test)is$/i, '$1es' ],
			[ /(alias|[^aou]us|t[lm]as|gas|ris)$/i, '$1es' ],
			[ /(e[mn]u)s?$/i, '$1s' ],
			[ /([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, '$1' ],
			[ /(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i' ],
			[ /(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae' ],
			[ /(seraph|cherub)(?:im)?$/i, '$1im' ],
			[ /(her|at|gr)o$/i, '$1oes' ],
			[ /(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, '$1a' ],
			[ /(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, '$1a' ],
			[ /sis$/i, 'ses' ],
			[ /(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves' ],
			[ /([^aeiouy]|qu)y$/i, '$1ies' ],
			[ /([^ch][ieo][ln])ey$/i, '$1ies' ],
			[ /(x|ch|ss|sh|zz)$/i, '$1es' ],
			[ /(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices' ],
			[ /\b((?:tit)?m|l)(?:ice|ouse)$/i, '$1ice' ],
			[ /(pe)(?:rson|ople)$/i, '$1ople' ],
			[ /(child)(?:ren)?$/i, '$1ren' ],
			[ /eaux$/i, '$0' ],
			[ /m[ae]n$/i, 'men' ],
		]

		this.generateIrregularrules()
	}

	generateIrregularrules() {
		irregularPluralsRules.forEach( function( rule ) {
			const single = rule[ 0 ],
				plural = rule[ 1 ]

			this.irregularSingles[ single ] = plural
			this.irregularPlurals[ plural ] = single
		}, this )
	}

	get( word ) {
		// Empty string or doesn't need fixing.
		if ( ! word.length ) {
			return word
		}

		// Get the correct token and case restoration functions.
		const token = word.toLowerCase()

		// Check against the keep object map.
		if ( this.irregularPlurals.hasOwnProperty( token ) ) {
			this.restoreCase( word, token )
		}

		// Check against the replacement map for a direct word replacement.
		if ( this.irregularSingles.hasOwnProperty( token ) ) {
			this.restoreCase( word, this.irregularSingles[ token ] )
		}

		// Save some time in the case that singular and plural are the same
		if ( this.uncountables.hasOwnProperty( token ) ) {
			return word
		}

		let len = this.pluralizationRules.length

		// Iterate over the sanitization rules and use the first one to match.
		while ( len-- ) {
			const rule = this.pluralizationRules[ len ]
			if ( rule[ 0 ].test( word ) ) {
				return this.replace( word, rule )
			}
		}

		return word
	}

	/**
	 * Pass in a word token to produce a function that can replicate the case on another word.
	 *
	 * @param {string} word  Word to restore.
	 * @param {string} token Token for it.
	 *
	 * @return {string} Restored word.
	 */
	restoreCase( word, token ) {
		// Tokens are an exact match.
		if ( word === token ) {
			return token
		}

		// Upper cased words. E.g. "HELLO".
		if ( word === word.toUpperCase() ) {
			return token.toUpperCase()
		}

		// Title cased words. E.g. "Title".
		if ( word[ 0 ] === word[ 0 ].toUpperCase() ) {
			return token.charAt( 0 ).toUpperCase() + token.substr( 1 ).toLowerCase()
		}

		// Lower cased words. E.g. "test".
		return token.toLowerCase()
	}

	/**
	 * Replace a word using a rule.
	 *
	 * @param {string} word Word to replace.
	 * @param {Array}  rule Rule to be applied.
	 *
	 * @return {string} Repalced word.
	 */
	replace( word, rule ) {
		return word.replace( rule[ 0 ], ( match, index ) => {
			const result = this.interpolate( rule[ 1 ], arguments )
			if ( '' === match ) {
				return this.restoreCase( word[ index - 1 ], result )
			}

			return this.restoreCase( match, result )
		} )
	}

	/**
	 * Interpolate a regexp string.
	 *
	 * @param {string} str  String to interpolate.
	 * @param {Array}  args Rules to be applied.
	 *
	 * @return {string} Interpolatedd string.
	 */
	interpolate( str, args ) {
		return str.replace( /\$(\d{1,2})/g, ( match, index ) => args[ index ] || '' )
	}
}

export default Pluralize
