/**
 * External dependencies
 */
import { inRange } from 'lodash'

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'

/**
 * Internal dependencies
 */
import links from '@config/links'
import Analysis from '@root/Analysis'
import AnalysisResult from '@root/AnalysisResult'

class LengthContent extends Analysis {
	/**
	 * Create new analysis result instance.
	 *
	 * @param {Jed} i18n The i18n-object used for parsing translations.
	 *
	 * @return {AnalysisResult} New instance.
	 */
	newResult( i18n ) {
		return new AnalysisResult()
			.setEmpty(
				i18n.sprintf(
					i18n.__( 'Content should be %1$s long.', 'rank-math-analyzer' ),
					'<a href="' + links.contentLength + '" target="_blank">600-2500 words</a>'
				)
			)
			.setTooltip( i18n.__( 'Minimum recommended content length should be 600 words.', 'rank-math-analyzer' ) )
	}

	/**
	 * Executes the assessment and return its result
	 *
	 * @param {Paper}      paper      The paper to run this assessment on.
	 * @param {Researcher} researcher The researcher used for the assessment.
	 * @param {Jed}        i18n       The i18n-object used for parsing translations.
	 *
	 * @return {AnalysisResult} an AnalysisResult with the score and the formatted text.
	 */
	getResult( paper, researcher, i18n ) {
		/* eslint @wordpress/no-unused-vars-before-return: 0*/
		const analysisResult = this.newResult( i18n )
		let wordCount = researcher.getResearch( 'wordCount' )

		wordCount = wordCount( paper.getTextLower() )
		if ( false === wordCount || 0 === wordCount.length ) {
			return null
		}

		analysisResult
			.setScore( this.calculateScore( wordCount.length ) )
			.setText(
				i18n.sprintf(
					this.translateScore( analysisResult, i18n ),
					wordCount.length
				)
			)

		return analysisResult
	}

	/**
	 * Checks whether the paper has a text.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @return {boolean} True when requirements meet.
	 */
	isApplicable( paper ) {
		return paper.hasText()
	}

	/**
	 * Calculates the score based on the word count.
	 *
	 * @param {number} wordCount Word count.
	 *
	 * @return {number} The calculated score.
	 */
	calculateScore( wordCount ) {
		const scores = this.getScores()
		const boundaries = this.getBoundaries()

		if ( boundaries.recommended <= wordCount ) {
			return scores.recommended
		}

		if ( inRange( wordCount, boundaries.belowRecommended, boundaries.recommended ) ) {
			return scores.belowRecommended
		}

		if ( inRange( wordCount, boundaries.medium, boundaries.belowRecommended ) ) {
			return scores.medium
		}

		if ( inRange( wordCount, boundaries.belowMedium, boundaries.medium ) ) {
			return scores.belowMedium
		}

		if ( inRange( wordCount, boundaries.low, boundaries.belowMedium ) ) {
			return scores.low
		}

		return 0
	}

	/**
	 * Translates the score to a message the user can understand.
	 *
	 * @param {AnalysisResult} analysisResult AnalysisResult with the score and the formatted text.
	 * @param {Jed}            i18n           The i18n-object used for parsing translations.
	 *
	 * @return {string} The translated string.
	 */
	translateScore( analysisResult, i18n ) {
		return analysisResult.hasScore() ?
			i18n.__( 'Your content is %1$s words long. Good job!', 'rank-math-analyzer' ) :
			i18n.__( 'Your content is %1$s words long. Consider using at least 600 words.', 'rank-math-analyzer' )
	}

	getBoundaries() {
		return applyFilters(
			'rankMath/analysis/contentLength/boundaries',
			{
				recommended: 2500,
				belowRecommended: 2000,
				medium: 1500,
				belowMedium: 1000,
				low: 600,
			}
		)
	}

	getScores() {
		return applyFilters(
			'rankMath/analysis/contentLength/score',
			{
				recommended: 8,
				belowRecommended: 5,
				medium: 4,
				belowMedium: 3,
				low: 2,
			}
		)
	}
}

export default LengthContent
