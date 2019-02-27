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
	 * @param {Object} [args.description] The SEO description.
	 * @param {Object} [args.titleWidth]  The width of the title in pixels.
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
			description: '',
			title: '',
			titleWidth: 0,
			url: '',
			locale: 'en_US',
			permalink: ''
		})
	}

	get( attribute ) {
		return has( this.args, attribute ) ? this.args[attribute] : ''
	}

	hasKeyword() {
		return '' !== this.args.keywords
	}

	getKeywords() {
		return this.args.keywords
	}
}
