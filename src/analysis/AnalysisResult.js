import { isUndefined, isNumber } from 'lodash'

/**
 * Analysis result object.
 */
class AnalysisResult {

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

export default AnalysisResult
