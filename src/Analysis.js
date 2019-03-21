import { isUndefined, isNumber } from 'lodash'

/**
 * Abstract layer for single analysis.
 */
class Analysis {

	/**
	 * Has score.
	 */
	hasScore = false

	/**
	 * Total score for analysis.
	 */
	score = 0

	/**
	 * Text.
	 */
	text = ''

	/**
	 * Executes the assessment and return its result
	 *
	 * @param  {Paper}      paper      The paper to run this assessment on.
	 * @param  {Researcher} researcher The researcher used for the assessment.
	 * @param  {Object}     il8n       The i18n-object used for parsing translations.
	 *
	 * @return {AnalysisResult} The result of the assessment.
	 */
	getResult( paper, researcher, il8n ) {
		throw new Error( 'The method getResult is not implemented' )
	}

	/**
	 * Check whether thr assessment is applicable
	 *
	 * @param  {Paper}  paper The paper to use for the assessment.
	 *
	 * @return {Boolean}
	 */
	isApplicable( paper ) {
		return true
	}

	/**
	 * Check if a score is available.
	 *
	 * @return {Boolean}
	 */
	hasScore() {
		return this.hasScore
	}

	/**
	 * Get the available score.
	 *
	 * @returns {Number}
	 */
	getScore() {
		return this.score
	}

	/**
	 * Set the score for the assessment.
	 *
	 * @param {Number} score The score to set for analysis
	 */
	setScore( score ) {
		if ( isNumber( score ) ) {
			this.score = score
			this.hasScore = true
		}
	}

	/**
	 * Check if a text is available.
	 *
	 * @returns {Boolean} Whether or not a text is available.
	 */
	hasText() {
		return '' !== this.text
	}

	/**
	 * Get the available text.
	 *
	 * @returns {String}
	 */
	getText() {
		return this.text
	}

	/**
	 * Set the text for the analysis.
	 *
	 * @param {String} text The text to be used for the text property
	 */
	setText( text ) {
		if ( isUndefined( text ) ) {
			text = ''
		}

		this.text = text
	}
}

export default Analysis
