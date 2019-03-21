import { defaults, has } from 'lodash'

class Paper {

	/**
	 * Text.
	 */
	text = ''

	/**
	 * Arguments.
	 */
	args = {}

	/**
	 * The constructor.
	 *
	 * @param {String} text               The text to use in the analysis.
	 * @param {Object} args               The object containing all arguments.
	 * @param {Object} [args.keyword]     The main keyword.
	 * @param {Object} [args.synonyms]    The main keyword's synonyms.
	 * @param {Object} [args.title]       The SEO title.
	 * @param {Object} [args.titleWidth]  The width of the title in pixels.
	 * @param {Object} [args.description] The SEO description.
	 * @param {Object} [args.url]         The base url + slug.
	 * @param {Object} [args.permalink]   The slug.
	 * @param {Object} [args.locale]      The locale.
	 */
	constructor( text, args ) {
		this.text = text || ''

		args = args || {}
		this.args = defaults( args, {
			keyword: '',
			synonyms: '',
			title: '',
			titleWidth: 0,
			description: '',
			url: '',
			permalink: '',
			locale: 'en_US'
		})
	}

	get( attribute ) {
		return has( this.args, attribute ) ? this.args[attribute] : ''
	}

	getLower( attribute ) {
		return this.get( attribute + 'Lower' )
	}

	setTitle( title ) {
		this.args.title      = title
		this.args.titleLower = title.toLowerCase()
	}

	setPermalink( permalink ) {
		this.args.permalink      = permalink
		this.args.permalinkLower = permalink.toLowerCase()
	}

	setDescription( description ) {
		this.args.description      = description
		this.args.descriptionLower = description.toLowerCase()
	}

	setKeyword( keyword ) {
		this.args.keyword             = keyword
		this.args.keywordLower        = keyword.toLowerCase()
		/*this.args.keywordPlurals      = false
		this.args.keywordPermalink    = false
		this.args.keywordCombinations = false

		if ( '' !== keyword ) {
			this.keywordPlurals   = new Map()
			this.keywordPermalink = slugify( removePunctuation( this.keywordLower.split( '.' ).join( '' ).replace( /[-_]/ig, '-' ) ) )
			getWords( this.keywordLower ).forEach( function( word ) {
				this.keywordPlurals.set( word, pluralize.get( word ) )
			}, this )
			this.keywordCombinations = combinations( this.keywordPlurals )
			this.keywordCombinations.push( this.keywordLower )
		}*/
	}

	hasKeyword() {
		return '' !== this.args.keywords
	}

	getKeywords() {
		return this.args.keywords
	}
}

export default Paper
