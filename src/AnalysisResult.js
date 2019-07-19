import { isUndefined, isNumber } from 'lodash'

/**
 * Analysis result.
 */
class AnalysisResult {

	constructor() {
		this.has = false
		this.score = 0
		this.text = ''
		this.empty = ''
		this.tooltip = ''

		return this
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
			this.has = 0 < score
		}

		return this
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
		return this.hasText() ? this.text : this.empty
	}

	/**
	 * Set the text for the analysis.
	 *
	 * @param {String} text The text to be used for the text property
	 */
	setText( text ) {
		this.text = isUndefined( text ) ? '' : text
		return this
	}

	/**
	 * Set the empty for the analysis.
	 *
	 * @param {String} empty The empty to be used for the empty property
	 */
	setEmpty( empty ) {
		this.empty = isUndefined( empty ) ? '' : empty
		return this
	}

	/**
	 * Check if a tooltip is available.
	 *
	 * @return {Boolean} Whether or not a tooltip is available.
	 */
	hasTooltip() {
		return '' !== this.tooltip
	}

	/**
	 * Get the available tooltip.
	 *
	 * @return {String}
	 */
	getTooltip() {
		return this.tooltip
	}

	/**
	 * Set the tooltip for the analysis.
	 *
	 * @param {String} tooltip The tooltip to be used for the tooltip property
	 */
	setTooltip( tooltip ) {
		this.tooltip = isUndefined( tooltip ) ? '' : tooltip
		return this
	}
}

export default AnalysisResult
