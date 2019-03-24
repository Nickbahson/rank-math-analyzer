import { defaults, has } from 'lodash'

class Paper {

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
		this.text = this.setText( text )
	}

	get( attribute ) {
		return has( this.args, attribute ) ? this.args[attribute] : ''
	}

	getLower( attribute ) {
		return this.get( attribute + 'Lower' )
	}

	/**
	  * Check whether a keyword is available.
	  *
	 * @return {Boolean} Returns true if the Paper has a keyword.
	 */
	hasKeyword() {
		return '' !== this.args.keywords
	}

	/**
	 * Return the associated keywords or an empty string if no keyword is available.
	 *
	 * @return {Boolean} Returns Keywords
	 */
	getKeyword() {
		return this.args.keyword
	}

	/**
	 * Set the keyword.
	 *
	 * @param {String} keyword [description]
	 */
	setKeyword( keyword ) {
		this.args.keyword             = keyword
		this.args.keywordLower        = keyword.toLowerCase()
		// this.args.keywordPlurals      = false
		// this.args.keywordPermalink    = false
		// this.args.keywordCombinations = false
		//
		// if ( '' !== keyword ) {
		// 	this.keywordPlurals   = new Map()
		// 	this.keywordPermalink = slugify( removePunctuation( this.keywordLower.split( '.' ).join( '' ).replace( /[-_]/ig, '-' ) ) )
		// 	getWords( this.keywordLower ).forEach( function( word ) {
		// 		this.keywordPlurals.set( word, pluralize.get( word ) )
		// 	}, this )
		// 	this.keywordCombinations = combinations( this.keywordPlurals )
		// 	this.keywordCombinations.push( this.keywordLower )
		// }
	}

	/**
	 * Check whether an title is available
	 *
	 * @return {Boolean} Returns true if the Paper has a title.
	 */
	hasTitle() {
		return '' !== this.args.title
	}

	/**
	 * Return the title, or an empty string of no title is available.
	 *
	 * @return {String} Returns the title
	 */
	getTitle() {
		return this.args.title
	}

	/**
	 * Set the title.
	 *
	 * @param {String} title The title
	 */
	setTitle( title ) {
		this.args.title      = title
		this.args.titleLower = title.toLowerCase()
	}

	/**
	 * Check whether an title width in pixels is available
	 *
	 * @return {Boolean} Returns true if the Paper has a title.
	 */
	hasTitleWidth() {
		return 0 !== this.args.titleWidth
	}

	/**
	 * Return the title width in pixels, or an empty string of no title width in pixels is available.
	 *
	 * @return {String} Returns the title
	 */
	getTitleWidth() {
		return this.args.titleWidth
	}

	/**
	 * Check whether a permalink is available
	 *
	 * @return {Boolean} Returns true if the Paper has a permalink.
	 */
	hasPermalink() {
		return '' !== this.args.permalink
	}

	/**
	 * Return the permalink, or an empty string of no permalink is available.
	 *
	 * @return {String} Returns the permalink.
	 */
	getPermalink() {
		return this.args.permalink
	}

	/**
	 * Set the permalink.
	 *
	 * @param {String} permalink The permalink.
	 */
	setPermalink( permalink ) {
		this.args.permalink      = permalink
		this.args.permalinkLower = permalink.toLowerCase()
	}

	/**
	 * Check whether a description is available.
	 *
	 * @return {Boolean} Returns true if the paper has a description.
	 */
	hasDescription() {
		return '' !== this.args.description
	}

	/**
	 * Return the description or an empty string if no description is available.
	 *
	 * @return {String} Returns the description.
	 */
	getDescription() {
		return this.args.description
	}

	/**
	 * Set the description.
	 *
	 * @param {String} description The description.
	 */
	setDescription( description ) {
		this.args.description      = description
		this.args.descriptionLower = description.toLowerCase()
	}

	/**
	 * Check whether the text is available.
	 *
	 * @return {Boolean} Returns true if the paper has a text.
	 */
	hasText() {
		return '' !== this.text
	}

	/**
	 * Return the associated text or am empty string if no text is available.
	 *
	 * @return {String} Returns text
	 */
	getText() {
		return this.text
	}

	/**
	 * Return the associated text or am empty string if no text is available.
	 *
	 * @return {String} Returns text
	 */
	getTextLower() {
		return this.textLower
	}

	/**
	 * Set the text.
	 *
	 * @param {String} text The text.
	 */
	setText( text ) {
		this.text      = text || ''
		this.textLower = ''

		if ( '' === text ) {
			return
		}

		this.text      = text
			.replace( /<script[^>]*>.*?<\/script>/gi, '' )
			.replace( /<style[^>]*>.*?<\/style>/gi, '' )
			.replace( /&\S+?;/g, '&' )
			.replace( /<!--[\s\S]*?(?:-->)/g, '' )
		this.textLower = this.text.toLowerCase()
	}

	/**
	 * Check whether an url is available
	 *
	 * @return {Boolean} Returns true if the Paper has an Url.
	 */
	hasUrl() {
		return '' !== this.args.url
	}

	/**
	 * Return the url, or an empty string of no url is available.
	 *
	 * @return {String} Returns the url
	 */
	getUrl() {
		return this.args.url
	}

	/**
	 * Check whether a locale is available
	 *
	 * @return {Boolean} Returns true if the paper has a locale
	 */
	hasLocale() {
		return '' !== this.args.locale
	}

	/**
	 * Return the locale or an empty string if no locale is available
	 *
	 * @return {String} Returns the locale
	 */
	getLocale() {
		return this.args.locale
	}
}

export default Paper
