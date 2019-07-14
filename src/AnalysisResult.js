import { isUndefined, isNumber } from 'lodash'

/**
 * Analysis result.
 */
class AnalysisResult {

	constructor() {
		this.has = false
		this.score = 0
		this.text = ''
	}

	/**
	 * Check if a score is available.
	 *
	 * @return {Boolean}
	 */
	hasScore() {
		return this.has
	}

	/**
	 * Get the available score.
	 *
	 * @return {Number}
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
			this.has = true
		}
	}

	/**
	 * Check if a text is available.
	 *
	 * @return {Boolean} Whether or not a text is available.
	 */
	hasText() {
		return '' !== this.text
	}

	/**
	 * Get the available text.
	 *
	 * @return {String}
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

export default AnalysisResult
