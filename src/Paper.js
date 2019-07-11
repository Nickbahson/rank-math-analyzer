import { defaults, has } from 'lodash'
import normalizeQuotes from './helpers/normalizeQuotes'

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
			title: '',
			keyword: '',
			synonyms: '',
			titleWidth: 0,
			url: '',
			permalink: '',
			description: '',
			thumbnailAlt: '',
			locale: 'en_US'
		})
		this.text = this.setText( text )
	}

	/**
	 * Get argument value.
	 *
	 * @param {String} id Argument id to get value.
	 *
	 * @return {Mixed} Return value.
	 */
	get( id ) {
		return has( this.args, id ) ? this.args[id] : ''
	}

	/**
	 * Get argument value in lower-case.
	 *
	 * @param {String} id Argument id to get value.
	 *
	 * @return {Mixed} Return value.
	 */
	getLower( id ) {
		return this.get( id + 'Lower' )
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
		this.args.keyword        = keyword
		this.args.keywordLower   = keyword.toLowerCase()
		this.keywordPlurals      = false
		this.keywordPermalink    = false
		this.keywordCombinations = false
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
		this.args.title      = normalizeQuotes( title )
		this.args.titleLower = this.args.title.toLowerCase()
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
		this.args.description      = normalizeQuotes( description )
		this.args.descriptionLower = this.args.description.toLowerCase()
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
		this.text      = normalizeQuotes( this.text )
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

	/**
	 * Check whether a thumbnailAlt is available
	 *
	 * @return {Boolean} Returns true if the Paper has a thumbnailAlt.
	 */
	hasThumbnailAltText() {
		return '' !== this.args.thumbnailAlt
	}

	/**
	 * Return the thumbnailAlt, or an empty string of no thumbnailAlt is available.
	 *
	 * @return {String} Returns the thumbnailAlt.
	 */
	getThumbnailAltText() {
		return this.args.thumbnailAlt
	}

	/**
	 * Set the thumbnailAlt.
	 *
	 * @param {String} thumbnailAlt The thumbnailAlt.
	 */
	setThumbnailAltText( thumbnailAlt ) {
		this.args.thumbnailAlt      = thumbnailAlt
		this.args.thumbnailAltLower = thumbnailAlt.toLowerCase()
	}

	/**
	 * Get keyword combinations.
	 *
	 * @param {Researcher} researcher The researcher used for the assessment.
	 *
	 * @return {Boolean|Array}
	 */
	getKeywordCombination( researcher ) {

		// Early Bail!!
		if ( ! this.hasKeyword() ) {
			return false
		}

		if ( false === this.keywordCombinations ) {
			this.generateCombinations( researcher )
		}

		return this.keywordCombinations
	}

	/**
	 * Generate keyword combinations.
	 *
	 * @param {Researcher} researcher The researcher used for the assessment.
	 */
	generateCombinations( researcher ) {
		const keywordLower = this.getLower( 'keyword' )

		// Researches.
		const slugify           = researcher.getResearch( 'slugify' )
		const getWords          = researcher.getResearch( 'getWords' )
		const pluralize         = researcher.getResearch( 'pluralize' )
		const combinations      = researcher.getResearch( 'combinations' )
		const removePunctuation = researcher.getResearch( 'removePunctuation' )

		// Plurals.
		this.keywordPlurals   = new Map()
		getWords( keywordLower ).forEach( function( word ) {
			this.keywordPlurals.set( word, pluralize.get( word ) )
		}, this )

		// Permalink.
		this.keywordPermalink = slugify( removePunctuation( keywordLower.split( '.' ).join( '' ).replace( /[-_]/ig, '-' ) ) )

		// Combinations.
		this.keywordCombinations = combinations( this.keywordPlurals )
		this.keywordCombinations.push( keywordLower )
	}
}

export default Paper
